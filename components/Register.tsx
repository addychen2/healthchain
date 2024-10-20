"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils"; // Assuming you have a utility for conditional class names


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
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
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // After successful registration, redirect to login

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
        <h2 className="text-xl font-semibold mb-4">Register</h2>

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

        {/* Registration Form */}
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
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;