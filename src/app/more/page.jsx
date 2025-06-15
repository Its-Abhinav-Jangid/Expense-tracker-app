"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBug,
  FaInfoCircle,
  FaComments,
} from "react-icons/fa";
import FeedbackModal from "@/app/components/FeedbackModal";
import { useSession } from "next-auth/react";
import Skeleton from "../loading";
import LogoutModal from "../components/LogoutModal";

const MoreTab = () => {
  const { data: session, status } = useSession();

  const [isFeedbackMOdalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [modalType, setModalType] = useState("bug");

  if (status === "loading") {
    return <Skeleton />;
  }

  if (!session) {
    return <p>You are not signed in.</p>;
  }
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  const openFeedbackModal = (type) => {
    setModalType(type);
    setIsFeedbackModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      {/* User Profile Section */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={session.user.image || "/images/user-avatar.png"} // Replace with your image path
            alt="User profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-indigo-500"
          />
        </div>
        <h1 className="text-xl font-semibold">{session.user.name}</h1>
      </div>

      {/* Account Section */}
      <div className="bg-gray-800 mx-4 rounded-xl mb-6 overflow-hidden">
        <h2 className="text-lg font-medium px-6 py-4 border-b border-gray-700">
          Account
        </h2>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Logged in as:</span>
            <span className="text-indigo-400">{session.user.email}</span>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full py-3 hover:bg-gray-600 transition-colors rounded-lg font-medium flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-800 mx-4 rounded-xl mb-6 overflow-hidden">
        <h2 className="text-lg font-medium px-6 py-4 border-b border-gray-700">
          Help
        </h2>
        <div className="p-6">
          <button
            onClick={() => openFeedbackModal("bug")}
            className="flex items-center w-full py-3 hover:bg-gray-700 px-3 rounded-lg transition-colors"
          >
            <FaBug className="mr-3 text-xl text-red-400" />
            <span>Report a Bug</span>
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-800 mx-4 rounded-xl overflow-hidden">
        <h2 className="text-lg font-medium px-6 py-4 border-b border-gray-700">
          About
        </h2>
        <div className="p-6 space-y-4">
          <div className="flex items-center py-2">
            <FaInfoCircle className="mr-3 text-xl text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">App Version</p>
              <p>{appVersion || "Not Available"}</p>
            </div>
          </div>

          <button
            onClick={() => openFeedbackModal("feedback")}
            className="flex items-center w-full py-3 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaComments className="mr-3 text-xl text-green-400" />
            <span>Feedback / Feature Request</span>
          </button>
        </div>
      </div>

      {isFeedbackMOdalOpen && (
        <FeedbackModal
          onClose={() => setIsFeedbackModalOpen(false)}
          type={modalType}
          email={session.user.email}
        />
      )}
      {isLogoutModalOpen && (
        <LogoutModal onClose={() => setIsLogoutModalOpen(false)} />
      )}
    </div>
  );
};

export default MoreTab;
