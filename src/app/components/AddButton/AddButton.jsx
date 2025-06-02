"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AddButton.module.css";
import { ExpenseForm } from "../ExpenseForm";
import { AddIncomeForm } from "../AddIncomeForm";
export function AddButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function openExpenseForm() {
    setIsExpenseFormOpen(true);
    setIsDropdownOpen(false);
  }
  function closeExpenseForm() {
    setIsExpenseFormOpen(false);
  }
  function openIncomeForm() {
    setIsIncomeFormOpen(true);
    setIsDropdownOpen(false);
  }
  function closeIncomeForm() {
    setIsIncomeFormOpen(false);
  }

  return (
    <>
      <div ref={dropdownRef}>
        <button
          className={styles.addButton}
          onClick={toggleDropdown}
          aria-label="Add new transaction"
          aria-expanded={isDropdownOpen}
        >
          <motion.div
            animate={{ rotate: isDropdownOpen ? 135 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaPlus className={styles.plusIcon} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-80!"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 min-w-[180px]">
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-3 text-base text-left text-white hover:bg-gray-700 transition-colors duration-150"
                    onClick={openExpenseForm}
                  >
                    <div className="mr-3 bg-red-900/30 p-2 rounded-lg">
                      <FaArrowDown className="text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium">Add Expense</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Record an outflow
                      </div>
                    </div>
                  </button>

                  <div className="h-px bg-gray-700 mx-3"></div>

                  <button
                    className="flex items-center w-full px-4 py-3 text-base text-left text-white hover:bg-gray-700 transition-colors duration-150"
                    onClick={openIncomeForm}
                  >
                    <div className="mr-3 bg-green-900/30 p-2 rounded-lg">
                      <FaArrowUp className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">Add Income</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Record an inflow
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isExpenseFormOpen && (
        <ExpenseForm type="add" onClose={closeExpenseForm} />
      )}
      {isIncomeFormOpen && <AddIncomeForm onClose={closeIncomeForm} />}
    </>
  );
}
