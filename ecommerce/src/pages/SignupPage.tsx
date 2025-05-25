// pages/SignupPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || "Signup successful. Please verify OTP.");
        if (data.orderId) {
          setOrderId(data.orderId);
          setShowOTPInput(true);
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          orderId: orderId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Email verified successfully! You can now login.");
        setShowOTPInput(false);
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {!showOTPInput ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="text-sm text-blue-500 mt-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} password
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="text-sm text-blue-500 mt-1"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"} password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleOTPSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
