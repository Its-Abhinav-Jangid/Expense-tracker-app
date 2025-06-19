import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout } from "@/app/lib/actions/auth";
import { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
const LogoutModal = ({ onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      disableBodyScroll(modalRef.current);
    }
  }, []);
  function closeModal() {
    if (modalRef.current) {
      enableBodyScroll(modalRef.current);
    }
    onClose();
  }
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <FiLogOut className="mr-2 text-2xl text-indigo-400" />
            Confirm Logout
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white text-xl"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300">Are you sure you want to log out?</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={closeModal}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center justify-center transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
