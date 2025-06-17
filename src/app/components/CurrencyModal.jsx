import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import currencies from "@/app/lib/constants/currencies"; // Your currencies data
import axios from "axios";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { FaTimes } from "react-icons/fa"; // Import the close icon

const CurrencyModal = ({
  canDismiss = true,
  currentCurrency = "",
  onClose,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    currentCurrency || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setCurrencyCode = useUserDataStore((state) => state.setCurrencyCode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCurrency) return alert("Please select a currency");

    setIsSubmitting(true);
    try {
      const res = await axios.put("/api/user/currency", {
        currencyCode: selectedCurrency,
      });
      setCurrencyCode(res.data.currencyCode);

      onClose(); // Close modal on success
    } catch (error) {
      console.error(error);
      alert("Some error occured! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-700 relative">
        {/* Close button */}
        {canDismiss && (
          <button
            onClick={canDismiss ? onClose : () => {}}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none"
            aria-label="Close currency selection"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 pt-12">
          {" "}
          {/* Added extra padding-top to accommodate close button */}
          <div className="text-center mb-6">
            <div className="mx-auto bg-indigo-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Set Your Currency</h2>
            <p className="text-gray-400 mt-2">
              Select your primary currency for transactions
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1">
              {currencies.map((currency) => (
                <div
                  key={currency.code}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                    selectedCurrency === currency.code
                      ? "bg-indigo-900 border-indigo-500 scale-[1.03]"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-650"
                  }`}
                  onClick={() => setSelectedCurrency(currency.code)}
                >
                  <div className="flex flex-col items-center">
                    <ReactCountryFlag
                      countryCode={currency.countryCode}
                      svg
                      className="text-xl mb-1.5 rounded-sm"
                      style={{ width: "1.8em", height: "1.4em" }}
                    />
                    <span className="text-xs font-medium text-gray-300 mt-1">
                      {currency.code}
                    </span>
                    <span className="text-xs text-gray-400">
                      {currency.symbol}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={
                  !selectedCurrency ||
                  isSubmitting ||
                  selectedCurrency === currentCurrency
                }
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  selectedCurrency &&
                  !isSubmitting &&
                  selectedCurrency !== currentCurrency
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Setting Up...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CurrencyModal;
