"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useTransition } from "react";

export const AddExpenseForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    category: "Any",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("/api/expenses", formData);
      onClose();
      onAdd();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again."); // Better UX
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Expense</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Amount (₹)
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Enter amount"
              min="1"
              step="1"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Category
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
              value={formData.category}
              name="category"
              onChange={handleChange}
            >
              <option value="Any">Any</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Hidden Date Input */}
          <input type="hidden" value={new Date().toISOString()} />

          {/* Form Actions */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors font-semibold text-gray-900"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
