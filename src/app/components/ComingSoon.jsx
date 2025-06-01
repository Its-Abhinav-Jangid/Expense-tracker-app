"use client";

import { FaRocket } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function ComingSoon() {
  const [launchDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Animated Rocket */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500 rounded-full blur opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-full">
                <FaRocket className="text-white text-4xl animate-bounce" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h1 className="mt-6 text-4xl font-extrabold text-white tracking-tight">
              <span className="block">Something Awesome</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Is Coming Soon
              </span>
            </h1>

            <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto">
              We're working hard to bring you an amazing experience. Stay tuned
              for the launch!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full bg-gray-800 rounded-lg py-3 text-center">
                  <span className="text-2xl font-bold text-white">
                    {item.value}
                  </span>
                </div>
                <span className="mt-2 text-sm text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Expense Tracker App. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
