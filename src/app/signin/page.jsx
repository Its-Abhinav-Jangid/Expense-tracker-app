"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";
import { login } from "@/app/lib/actions/auth";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(null); // 'google', 'github', or null
  const [error, setError] = useState(null);

  const handleLogin = async (provider) => {
    setIsLoading(provider);
    setError(null);

    try {
      await login(provider);
      // If login is successful, the user will be redirected
      // so we don't need to reset loading state here
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      {/* Header */}
      <header className="px-4 py-5">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <a
            href="/"
            className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </a>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg w-6 h-6 flex items-center justify-center">
                <div className="relative w-8 h-8">
                  <Image
                    src="/icons/icon-no-bg.png"
                    alt="Spenlys logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <span className="font-bold text-xl text-white">Spenlys</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              {/* Logo and Heading */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                    <div className="bg-gray-900 rounded-lg w-12 h-12 flex items-center justify-center">
                      <div className="relative w-10 h-10">
                        <Image
                          src="/icons/icon-no-bg.png"
                          alt="Spenlys logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Secure Access to Your Finances
                </h1>
                <p className="text-gray-400">
                  Sign in with your preferred account to continue
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* OAuth Buttons */}
              <div className="space-y-4 mb-8">
                <motion.button
                  onClick={() => handleLogin("google")}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center p-4 rounded-xl transition-colors border ${
                    isLoading === "google"
                      ? "bg-gray-700 border-gray-600 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                  }`}
                >
                  {isLoading === "google" ? (
                    <FiLoader className="text-xl mr-3 animate-spin text-gray-300" />
                  ) : (
                    <FcGoogle className="text-xl mr-3" />
                  )}
                  <span className="font-medium text-gray-200">
                    {isLoading === "google"
                      ? "Signing in..."
                      : "Continue with Google"}
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => handleLogin("github")}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center p-4 rounded-xl transition-colors border ${
                    isLoading === "github"
                      ? "bg-gray-700 border-gray-600 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                  }`}
                >
                  {isLoading === "github" ? (
                    <FiLoader className="text-xl mr-3 animate-spin text-gray-300" />
                  ) : (
                    <FaGithub className="text-xl text-white mr-3" />
                  )}
                  <span className="font-medium text-gray-200">
                    {isLoading === "github"
                      ? "Signing in..."
                      : "Continue with GitHub"}
                  </span>
                </motion.button>
              </div>

              {/* Security Assurance */}
              <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-indigo-900/30">
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 text-indigo-400 p-2 rounded-lg mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Your financial data is encrypted. We never share your
                    information with third parties.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-indigo-400 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-400">No passwords to remember</p>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-indigo-400 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-400">Enhanced security</p>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-indigo-400 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-400">One-click access</p>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-indigo-400 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-400">No personal info required</p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Spenlys. All rights reserved.</p>
      </footer>
    </div>
  );
}
