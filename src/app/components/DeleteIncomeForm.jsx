"use client";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useUserDataStore } from "@/stores/useUserDataStore";

function DeleteIncomeForm({ incomeId, onClose }) {
  const snapshot = JSON.parse(JSON.stringify(useUserDataStore.getState()));
  const deleteIncome = useUserDataStore((state) => state.deleteIncome);
  const rollback = useUserDataStore((state) => state.rollback);

  async function onDelete() {
    try {
      onClose();
      deleteIncome(incomeId);
      await axios.delete(`/api/income/${incomeId}`);
    } catch (error) {
      rollback(snapshot);
      console.error("Error delete income:", error);
      alert("Failed to delete income. Please try again."); // Better UX
    }
  }
  return (
    <div
      style={{
        margin: 0,
      }}
      className="fixed inset-0 top-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-gray-200">Delete Income</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <p className="text-gray-300 text-center mb-2">
            Are you sure you want to delete this income? All data related to it
            will be removed forever.
          </p>
          <p className="text-red-400 text-center font-medium mb-5">
            This action cannot be undone!
          </p>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-800 p-5 flex justify-end space-x-3 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex items-center"
          >
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteIncomeForm;
