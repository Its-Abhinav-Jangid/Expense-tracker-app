"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import filterIncome from "../lib/filterIncome";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUserDataStore } from "@/stores/useUserDataStore";
import useLoadingStore from "@/stores/useIsLoadingStore";
import SmartAITipSkeleton from "./SmartAITipSkeleton";

const SmartAITip = ({ incomeData, expenseData }) => {
  const [aiTip, setAiTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Changed to null
  const types = ["budgeting", "investment", "debt", "savings"];
  const currencyCode = useUserDataStore((state) => state.user.currencyCode);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const fetchAITip = async () => {
    const filteredIncome = filterIncome({
      incomeData: incomeData,
      startDate: new Date().setFullYear(new Date().getFullYear() - 1),
    });
    setLoading(true);
    const tipType = types[Math.floor(Math.random() * types.length)];

    try {
      if (!isLoading) {
        const { data } = await axios.post("/api/ai/tip", {
          incomeData: filteredIncome,
          expenseData,
          type: tipType,
          userCurrency: currencyCode,
        });

        if (data.role === "assistant") {
          setAiTip({
            title: `Smart ${
              tipType[0].toUpperCase() + tipType.substring(1)
            } tip`,
            content: data.content,
          });
          setError(null); // Reset error state
        } else {
          console.error("AI error:", data.content);
          setError({
            message: "AI sent an invalid response",
            code: 422,
            details: data.content,
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch AI tip:", err);
      setError({
        message: err.message,
        code: err.response?.status || "NETWORK_ERROR",
        details: err.response?.data?.message || "No additional details",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAITip();
  }, [isLoading]);

  if (error) {
    return <AITipCardError error={error} onRetry={fetchAITip} />;
  }

  if (loading || isLoading || !aiTip) {
    return <SmartAITipSkeleton />;
  }

  return (
    <div className="relative max-w-100">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-2xl p-0.5 shadow-lg transform transition-all duration-300 hover:scale-[1.015] hover:shadow-xl">
        <div className="bg-gray-900 rounded-2xl p-5 relative overflow-hidden">
          {/* Glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-[80px] opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500 rounded-full filter blur-[80px] opacity-20"></div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Smart AI Insight
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-0.5 rounded-full">
                    PRO FEATURE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Content */}
          <div className="mb-4">
            <h4 className="font-bold text-cyan-400 flex items-center">
              {aiTip.title}
            </h4>
            <div className="mt-2 text-gray-200">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aiTip.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAITip;

function AITipCardError({ onRetry, error }) {
  const [retrying, setRetrying] = useState(false);

  const getErrorDetails = () => {
    if (!error) return "Unknown error";

    switch (error.code) {
      case "NETWORK_ERROR":
        return "Network connection failed. Check your internet connection.";
      case 429:
        return "Too many requests. Please try again later.";
      case 422:
        return "AI returned an unexpected response format.";
      case 401:
        return "Authentication required. Please sign in again.";
      case 500:
        return "Internal server error. Our team has been notified.";
      default:
        if (typeof error.code === "number") {
          return `Server error (${error.code})`;
        }
        return "An unexpected error occurred";
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div className="relative max-w-100">
      <div className="bg-gradient-to-br from-red-900 via-amber-900 to-rose-800 rounded-2xl p-0.5 shadow-lg">
        <div className="bg-gray-900 rounded-2xl p-5 relative overflow-hidden">
          {/* Error Glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500 rounded-full filter blur-[80px] opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500 rounded-full filter blur-[80px] opacity-20"></div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-amber-500 p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Error Loading Insight
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-semibold bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 rounded-full">
                    {error?.code ? `ERROR ${error.code}` : "SYSTEM ERROR"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="mb-4">
            <div className="mt-2 text-gray-200 space-y-3">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-rose-400 mt-0.5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Failed to load AI insights. Please try again later.</p>
              </div>

              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-medium">Technical details:</p>
                  <p className="text-sm opacity-90 mt-1">{getErrorDetails()}</p>

                  {error.details && (
                    <div className="mt-2 text-xs bg-gray-800 p-2 rounded">
                      <span className="opacity-75">Additional info:</span>{" "}
                      {error.details}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Retry Button */}
            <button
              className={`mt-4 w-full py-2 bg-gradient-to-r from-rose-700 to-amber-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center ${
                retrying
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-rose-800 hover:to-amber-800 transform hover:scale-[1.02]"
              }`}
              onClick={handleRetry}
              disabled={retrying}
            >
              {retrying ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Retrying...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Retry Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
