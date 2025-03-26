"use client";
import { AddExpenseForm } from "./AddExpenseForm";
import { useState } from "react";

export function AddExpenseButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <>
      <button
        onClick={() => openModal()}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xl font-bold shadow-lg transition-colors"
      >
        + Add Expense
      </button>
      {isModalOpen && <AddExpenseForm onClose={closeModal} />}
    </>
  );
}
