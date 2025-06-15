import { FaCheckCircle, FaTimes } from "react-icons/fa";

const FeedbackSuccessToast = ({ message, onDismiss }) => {
  return (
    <div style={{ zIndex: 10000000 }} className="fixed bottom-12 right-4 z-50">
      <div className="bg-green-700 text-white px-6 py-4 rounded-lg shadow-lg flex items-start max-w-md">
        <FaCheckCircle className="text-xl mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium">Thank you!</p>
          <p className="text-sm text-green-100">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 text-green-200 hover:text-white"
          aria-label="Dismiss message"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default FeedbackSuccessToast;
