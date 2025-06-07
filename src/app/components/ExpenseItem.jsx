"use client";
import axios from "axios";

import { MdDelete, MdEdit } from "react-icons/md";
import { formatAmount } from "../lib/formatAmount";
import { useEffect, useRef, useState } from "react";
import useLongPress from "@/hooks/useLongPress";
import { ExpenseForm } from "./ExpenseForm";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import DeleteExpenseForm from "./DeleteExpenseForm";
import { categoryColors, categoryIcons } from "../lib/constants/categoryIcons";
import { HiOutlineCalendar } from "react-icons/hi";

export const ExpenseItem = ({ expenseData }) => {
  const isMobile = useIsMobile();
  const menuRef = useRef();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { handlers: longPressHandlers } = useLongPress({
    duration: isMobile ? 500 : 200,
    onLongPress: !expenseData.isOptimistic ? enableOptionsMenu : "",
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

  return (
    <>
      <div
        {...longPressHandlers}
        className="hover:bg-gray-700 no-select bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-xl  ${
                categoryColors[expenseData.category] ||
                categoryColors.Miscellaneous
              } `}
            >
              {categoryIcons[expenseData.category] ||
                categoryIcons.Miscellaneous}
            </div>
            <div>
              <h3 className="font-medium">{expenseData.category}</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <HiOutlineCalendar className="mr-1" />
                <span>{expenseData.date}</span>
              </div>
            </div>
          </div>

          <span className="text-lg font-medium text-red-300">
            - ₹{formatAmount(expenseData.amount)}
          </span>
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
          created_at={expenseData.created_at}
          user_id={expenseData.user_id}
        />
      )}
      {showDeleteExpenseForm && (
        <DeleteExpenseForm
          expenseId={expenseData.id}
          onClose={closeDeleteExpenseForm}
        />
      )}
    </>
  );
};
