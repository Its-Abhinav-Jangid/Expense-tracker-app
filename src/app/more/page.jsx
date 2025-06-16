"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { FaSignOutAlt, FaBug, FaInfoCircle, FaComments } from "react-icons/fa";

import dynamic from "next/dynamic";

const FeedbackModal = dynamic(() => import("@/app/components/FeedbackModal"), {
  ssr: false,
});
const LogoutModal = dynamic(() => import("../components/LogoutModal"), {
  ssr: false,
});
import { useSession } from "next-auth/react";

const MoreTab = () => {
  const { data: session, status } = useSession();

  const [isFeedbackMOdalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [modalType, setModalType] = useState("bug");

  const appVersion = useMemo(
    () => process.env.NEXT_PUBLIC_APP_VERSION || "N/A",
    []
  );
  const openFeedbackModal = (type) => {
    setModalType(type);
    setIsFeedbackModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      {/* User Profile Section */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="relative h-24 w-24 rounded-full border-4 border-indigo-500 overflow-hidden">
          <Image
            src={
              status === "loading"
                ? "/images/user-avatar.png"
                : session.user.image || "/images/user-avatar.png"
            }
            alt="User profile"
            height={96}
            width={96}
            sizes="96px"
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/user-avatar.png"
            priority={false}
          />
        </div>
        <h1 className="text-xl font-semibold">
          {status == "loading" ? (
            <div className="animate-pulse h-4 mt-2 bg-gray-700 rounded-full w-16" />
          ) : (
            session.user.name
          )}
        </h1>
      </div>
      {/* Account Section */}
      <div className="bg-gray-800 mx-4 rounded-xl mb-6 overflow-hidden">
        <h2 className="text-lg font-medium px-6 py-4 border-b border-gray-700">
          Account
        </h2>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Logged in as:</span>
            <span className="text-indigo-400">
              {status === "loading" ? (
                <div className="h-4 bg-gray-700 rounded-full w-32" />
              ) : (
                session.user.email
              )}
            </span>
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
