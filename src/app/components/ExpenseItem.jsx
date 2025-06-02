"use client";
import axios from "axios";

import { MdDelete, MdEdit } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formatAmount } from "../lib/formatAmount";
import { useEffect, useRef, useState } from "react";
import useLongPress from "@/hooks/useLongPress";
import { ExpenseForm } from "./ExpenseForm";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";

export const ExpenseItem = ({ expenseData }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const menuRef = useRef();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { handlers: longPressHandlers } = useLongPress({
    duration: isMobile ? 500 : 200,
    onLongPress: enableOptionsMenu,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptionsMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showOptionsMenu]);

  const [showEditExpenseForm, setShowEditExpenseForm] = useState(false);

  function openEditExpenseForm() {
    setShowOptionsMenu(false);
    setShowEditExpenseForm(true);
  }
  function closeEditExpenseForm() {
    setShowEditExpenseForm(false);
  }
  const [showDeleteExpenseForm, setShowDeleteExpenseForm] = useState(false);

  function openDeleteExpenseForm() {
    setShowOptionsMenu(false);
    setShowDeleteExpenseForm(true);
  }
  function closeDeleteExpenseForm() {
    setShowDeleteExpenseForm(false);
  }

  function enableOptionsMenu(event) {
    if (
      event.target !== menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      setMenuPosition({ x: clientX, y: clientY });
      setShowOptionsMenu(true);
    }
  }

  if (expenseData.created_at) {
    const date = new Date(expenseData.created_at);
    expenseData.date = date.toLocaleDateString();
  }

  async function deleteExpense() {
    try {
      await axios.delete(`/api/expenses/${expenseData.id}`);
      closeDeleteExpenseForm();
      router.refresh(); // Display the updated data on page
    } catch (error) {
      console.error("Error delete expense:", error);
      alert("Failed to delete expense. Please try again."); // Better UX
    }
  }

  return (
    <>
      <div
        {...longPressHandlers}
        className="flex justify-between items-center transition duration-500 bg-gray-800 hover:bg-gray-700 rounded-lg p-3"
      >
        <div>
          <h3 className="font-medium">
            {expenseData.title || expenseData.category || "Expense"}
          </h3>
          <p className="text-xs text-gray-300">{expenseData.date || ""}</p>
        </div>
        <div className="text-red-300 font-bold">
          - ₹{formatAmount(expenseData.amount)}
        </div>
        <div
          ref={menuRef}
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
          }}
          className={`fixed bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-1 flex flex-col z-50 ${
            showOptionsMenu ? "animate-slideDown" : "hidden"
          }`}
        >
          <button
            onClick={openEditExpenseForm}
            className="flex items-center w-full px-4 py-2.5 text-left text-sm text-gray-200 hover:bg-gray-700 rounded-md transition-all duration-150"
          >
            <MdEdit className="mr-2 text-gray-400" size={20} />
            <span>Edit</span>
          </button>

          <button
            onClick={openDeleteExpenseForm}
            className="flex items-center w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-gray-700 rounded-md transition-all duration-150"
          >
            <MdDelete className="mr-2" size={20} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      {showEditExpenseForm && (
        <ExpenseForm
          onClose={closeEditExpenseForm}
          type="edit"
          expenseId={expenseData.id}
          amount={expenseData.amount}
          category={expenseData.category}
        />
      )}
      {showDeleteExpenseForm && (
        <div
          style={{ margin: 0 }}
          className="fixed inset-0 top-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200">
                Delete Expense
              </h3>
              <button
                onClick={closeDeleteExpenseForm}
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
                Are you sure you want to delete this expense?
              </p>
              <p className="text-red-400 text-center font-medium mb-5">
                This action cannot be undone!
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-800 p-5 flex justify-end space-x-3 border-t border-gray-700">
              <button
                onClick={closeDeleteExpenseForm}
                className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteExpense}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex items-center"
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
