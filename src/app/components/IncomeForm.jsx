"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { currencyMap } from "../lib/constants/currencies";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
export const IncomeForm = ({
  onClose,
  type,
  id,
  amount,
  category = "Salary",
  isRecurring = false,
  notes,
  date,
}) => {
  const snapshot = JSON.parse(JSON.stringify(useUserDataStore.getState()));
  const addIncome = useUserDataStore((state) => state.addIncome);
  const editIncome = useUserDataStore((state) => state.editIncome);
  const rollback = useUserDataStore((state) => state.rollback);
  const currencyCode = useUserDataStore((state) => state.user.currencyCode);
  const currencySymbol = currencyMap[currencyCode]?.symbol;
  const [formData, setFormData] = useState({
    amount: amount || "",
    category: category || "Salary",
    isRecurring: isRecurring || false,
    notes: notes || "",
    date: date
      ? new Date(date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      disableBodyScroll(modalRef.current);
    }
  }, []);
  function closeModal() {
    if (modalRef.current) {
      enableBodyScroll(modalRef.current);
    }
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (type === "edit") {
      if (!id) {
        console.error("Cannot edit data as id is not provided. id:", id);
        alert("Failed to edit income. Please try again later.");
        return;
      }
      try {
        closeModal(); // close the modal
        editIncome({
          id: id,
          ...formData,
        });
        const {
          data: { newIncome },
        } = await axios.put(`/api/income/${id}`, formData);
      } catch (error) {
        rollback(snapshot);
        console.error("Error editing income:", error);
        alert("Failed to edit income. Please try again.");
      }
    } else {
      const dummyId = new Date().toISOString();
      try {
        closeModal(); // close the modal
        addIncome({
          id: dummyId,
          isOptimistic: true,
          ...formData,
        });
        const {
          data: { newIncome },
        } = await axios.post("/api/income", formData);

        editIncome({ prevId: dummyId, ...newIncome });
      } catch (error) {
        rollback(snapshot);
        console.error("Error adding income:", error);
        alert("Failed to add income. Please try again.");
      }
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      ref={modalRef}
      style={{ zIndex: 100000 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {type === "edit" ? "Edit Income" : "Add Income"}
          </h2>
          <button
            onClick={closeModal}
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
              Amount {currencySymbol ? `(${currencySymbol})` : ""}
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

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Enter date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="recurring"
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isRecurring: e.target.checked,
                }))
              }
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="recurring" className="text-sm text-gray-300">
              Mark as recurring monthly income
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Notes
            </label>
            <textarea
              type="text"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Any Notes...(Optional)"
              name="notes"
              value={formData.notes}
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
              <option value="Salary">Salary</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Investments">Investments</option>
              <option value="Interest">Interest</option>
              <option value="Gift">Gift</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={closeModal}
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
