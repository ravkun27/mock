import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { cartItems, cartQuantities } = location.state || {
    cartItems: [],
    cartQuantities: {},
  };

  console.log(cartItems);

  const [step, setStep] = useState(1); // 1: Checkout form, 2: Order Review, 3: Confirmation
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    cardNumber: "4242 4242 4242 4242", // common test card number
    cardName: "John Doe",
    expiryDate: "12/25",
    cvv: "123",
  });

  // Removed console.log(products) as products is not defined

  const [orderNumber, setOrderNumber] = useState("");

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigate to review step
  const handleReview = (e: any) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  // Place order and show confirmation
  const handlePlaceOrder = (e: any) => {
    e.preventDefault();
    // Generate a random order number
    const generateOrderNumber = () => {
      return "ORD-" + Math.floor(100000 + Math.random() * 900000);
    };
    setOrderNumber(generateOrderNumber());
    setStep(3);
    window.scrollTo(0, 0);
  };

  // Go back to previous step
  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const subtotal = cartItems.reduce((acc: any, product: any) => {
    const quantity = cartQuantities[product.id] || 0;
    return acc + product.price * quantity;
  }, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">
            {step === 1
              ? "Checkout"
              : step === 2
              ? "Review Order"
              : "Order Confirmation"}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Step indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div className="text-xs mx-2">Checkout</div>
            </div>
            <div
              className={`w-16 h-1 ${
                step >= 2 ? "bg-blue-500" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <div className="text-xs mx-2">Review</div>
            </div>
            <div
              className={`w-16 h-1 ${
                step >= 3 ? "bg-blue-500" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <div className="text-xs mx-2">Confirmation</div>
            </div>
          </div>

          {/* Step 1: Checkout Form */}
          {step === 1 && (
            <form onSubmit={handleReview}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="XXX"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-4 py-2 text-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Review Order
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Review Order */}
          {step === 2 && (
            <div>
              <div className="border rounded p-4 mb-6">
                {cartItems.map((product: any) => {
                  const quantity = cartQuantities[product.id] || 0;
                  const itemTotal = product.price * quantity;

                  return (
                    <div key={product.id} className="flex mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">{product.title}</h4>
                        <p className="text-gray-500 text-sm">
                          Quantity: {quantity}
                        </p>
                        <p className="font-semibold">${itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  <div className="border rounded p-4 md:col-span-2">
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p>
                      Credit Card (ending in{" "}
                      {formData.cardNumber.slice(-4) || "****"})
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 mr-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Thank You For Your Order!
              </h3>
              <p className="text-lg mb-4">
                Your order has been placed successfully.
              </p>
              <div className="mb-8">
                <p className="text-gray-600">Order Number:</p>
                <p className="font-bold text-xl">{orderNumber}</p>
              </div>
              <p className="mb-6">
                A confirmation email has been sent to {formData.email}. We'll
                notify you when your order ships.
              </p>
              <div className="border-t pt-6 mt-8">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
