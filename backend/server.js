const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "ecommerce";

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

let db;

// MongoDB connection
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

// Initialize database with sample data
async function initializeDatabase() {
  try {
    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("products").createIndex({ name: 1 });

    // Check if admin user exists
    const adminExists = await db.collection("users").findOne({
      email: "admin@example.com",
      role: "admin",
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.collection("users").insertOne({
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("Default admin user created: admin@example.com / admin123");
    }

    // Check if sample products exist
    const productCount = await db.collection("products").countDocuments();
    if (productCount === 0) {
      const sampleProducts = [
        {
          name: "iPhone 14 Pro",
          description: "Latest iPhone with advanced camera system",
          price: 999.99,
          imageUrl:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
          category: "Smartphones",
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S23",
          description: "Premium Android smartphone with excellent display",
          price: 799.99,
          imageUrl:
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
          category: "Smartphones",
          stock: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MacBook Air M2",
          description: "Lightweight laptop with Apple M2 chip",
          price: 1199.99,
          imageUrl:
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
          category: "Laptops",
          stock: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await db.collection("products").insertMany(sampleProducts);
      console.log("Sample products inserted");
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};

// Auth Routes
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      role: "user",
      isVerified: true, // Simplified - auto verify for mock
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find user
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Product Routes (Public)
app.get("/api/products", async (req, res) => {
  try {
    const products = await db
      .collection("products")
      .find({ stock: { $gt: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Admin Routes - Product Management
app.get(
  "/api/admin/products",

  async (req, res) => {
    try {
      const products = await db
        .collection("products")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      res.json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Admin fetch products error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

app.post(
  "/api/admin/products",
  async (req, res) => {
    const { name, description, price, imageUrl, category, stock } = req.body;

    if (!name || !price || !category || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    try {
      const result = await db.collection("products").insertOne({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        stock: parseInt(stock),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.json({
        success: true,
        message: "Product created successfully",
        productId: result.insertedId,
      });
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

app.put(
  "/api/admin/products/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl, category, stock } = req.body;

    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const result = await db.collection("products").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category,
            stock: parseInt(stock),
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product updated successfully",
      });
    } catch (error) {
      console.error("Update product error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

app.delete(
  "/api/admin/products/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const result = await db.collection("products").deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Admin Routes - User Management
app.get(
  "/api/admin/users",
  async (req, res) => {
    try {
      const users = await db
        .collection("users")
        .find(
          {},
          {
            projection: {
              password: 0, // Exclude password from response
            },
          }
        )
        .sort({ createdAt: -1 })
        .toArray();

      res.json({
        success: true,
        users,
      });
    } catch (error) {
      console.error("Fetch users error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: db ? "Connected" : "Disconnected",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Default admin: admin@example.com / admin123`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
