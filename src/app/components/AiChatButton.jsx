"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiChat } from "./AiChat";
import { FaTimes } from "react-icons/fa";

import { RiGeminiFill } from "react-icons/ri";

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="fixed bottom-24 right-3 z-14">
        <div className="relative">
          {/* Animated pulse ring */}
          {!isOpen && (
            <motion.span
              className="absolute inset-0 rounded-full bg-blue-500/40"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}

          <motion.button
            aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
            onClick={() => setIsOpen(!isOpen)}
            className={`
            w-16 h-16 rounded-full flex items-center justify-center
            bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800
            shadow-lg hover:shadow-xl
            border border-blue-400/30
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            relative overflow-hidden
          `}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

            {/* Icon container with smooth transition */}
            <motion.div
              className="relative z-10 text-white"
              key={isOpen ? "close" : "open"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <div className="relative">
                  <RiGeminiFill size={24} />
                </div>
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {isOpen && <AiChat onClose={closeModal} />}
    </>
  );
}
