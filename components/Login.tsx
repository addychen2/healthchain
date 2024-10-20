"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils"; // Assuming you have a utility for conditional class names
import Cookies from "js-cookie"; // Using js-cookie to manage cookies

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://192.168.37.101:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      // Store the JWT and user_id in cookies
      Cookies.set("access_token", data.access_token, { expires: 7 }); // Expires in 7 days
      Cookies.set("user_id", data.user_id, { expires: 7 });

      // Redirect to the home page after successful login
      window.location.href = "/";  // Redirect to the homepage
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      layoutScroll
      className="grow rounded-md p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {/* Animate error messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={cn(
              "bg-blue-500 text-white rounded p-2",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Register here
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
