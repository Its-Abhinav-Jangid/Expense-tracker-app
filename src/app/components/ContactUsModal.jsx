"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaComments, FaEnvelope, FaTimes, FaSpinner } from "react-icons/fa";
import FeedbackSuccessToast from "./FeedbackSuccessToast";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const ContactUsModal = ({ onClose, email = "" }) => {
  const [formData, setFormData] = useState({
    email: email || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/feedback", {
        type: "Message",
        email: formData.email,
        message: formData.message,
      });

      setIsToastVisible(true);
      if (modalRef.current) enableBodyScroll(modalRef.current);
      setTimeout(() => {
        closeModal();

        setIsToastVisible(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message: ", error);
      setError(
        error.response?.data?.message ||
          "There was an error sending message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {!isToastVisible ? (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FaComments className="mr-2 text-green-400" /> Send Message
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-xl"
                aria-label="Close modal"
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Send your message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="w-full bg-gray-700 rounded-lg p-3 text-white"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="“Got ideas or found a bug? We’re in early access and would love your feedback!"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Your email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg p-3 text-white"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium flex items-center justify-center disabled:bg-indigo-800 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="mr-2" />
                    Submit
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <FeedbackSuccessToast
          message={`Your message has been sent successfully!`}
          onDismiss={() => {
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default ContactUsModal;
