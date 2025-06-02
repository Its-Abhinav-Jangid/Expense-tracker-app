"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const ExpenseForm = ({
  onClose,
  type = "add",
  amount = "",
  category = "Any",
  expenseId,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: amount,
    category: category,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (type === "edit" && expenseId) {
      try {
        await axios.put(`/api/expenses/${expenseId}`, formData);
        onClose(); // close the modal
        router.refresh(); // Display the updated data on page
      } catch (error) {
        console.error("Error saving expense:", error);
        alert("Failed to save expense. Please try again."); // Better UX
      }
    } else {
      try {
        await axios.post("/api/expenses", formData);
        onClose(); // close the modal
        router.refresh(); // Display the updated data on page
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again."); // Better UX
      }
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      style={{ margin: 0 }}
      className="text-white fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {type === "edit" ? "Edit" : "Add New"} Expense
          </h2>
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
              <option value="Debt">Debt</option>
              <option value="Investments">Investments</option>
              <option value="EMI">EMI</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Education">Education</option>
              <option value="Groceries">Groceries</option>
              <option value="Rent">Rent</option>
              <option value="Insurance">Insurance</option>
              <option value="PersonalCare">Personal Care</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Gifts">Gifts</option>
              <option value="Taxes">Taxes</option>
              <option value="Miscellaneous">Miscellaneous</option>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
