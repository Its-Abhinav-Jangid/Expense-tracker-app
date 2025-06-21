// pages/index.js
"use client";
import { useState } from "react";
import Head from "next/head";
import {
  FiDollarSign,
  FiPieChart,
  FiMessageSquare,
  FiGlobe,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiCreditCard,
  FiTrendingUp,
  FiBarChart2,
  FiArrowUp,
  FiArrowDown,
  FiZap,
  FiLogIn,
  FiLock,
  FiCheckCircle,
  FiShoppingBag,
  FiMousePointer,
} from "react-icons/fi";
import Image from "next/image";
import ContactUsModal from "../components/ContactUsModal";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function Home() {
  const [activeInsight, setActiveInsight] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const router = useRouter();

  function redirectToLogin() {
    router.push("/signin");
  }
  const insights = [
    {
      title: "Dining Out Analysis",
      content:
        "Restaurant spending accounts for 22% of your monthly expenses. Consider meal planning to reduce this category.",
    },
    {
      title: "Subscription Review",
      content:
        "You have 5 active subscriptions totaling $59/month. Review which ones you actually use.",
    },
    {
      title: "Energy Efficiency",
      content:
        "Your energy usage is 15% higher than similar households. Simple adjustments could save $120/year.",
    },
  ];

  const features = [
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Expense Tracking",
      description: "Categorize transactions and visualize spending",
    },
    {
      icon: <FiPieChart className="text-2xl" />,
      title: "Financial Insights",
      description:
        "Understand your spending patterns and identify savings opportunities",
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Income Tracking",
      description: "Track your salary, freelance, and passive income sources.",
    },

    {
      icon: <FiZap className="text-2xl" />,
      title: "Smart Financial Tips",
      description: "Get daily personalized suggestions to optimize your money.",
    },
  ];

  const stats = [
    {
      value: "72%",
      label: "users increase savings within 30 days",
      icon: <FiTrendingUp className="h-8 w-8 text-indigo-400" />,
    },
    {
      value: "3.5x",
      label: "more likely to stick to budgets",
      icon: <FiCheckCircle className="h-8 w-8 text-indigo-400" />,
    },
    {
      value: "89%",
      label: "reduce unnecessary spending with tracking",
      icon: <FiShoppingBag className="h-8 w-8 text-indigo-400" />,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        {/* Navigation */}
        <nav className="px-4 py-5 flex justify-between items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image src="/icons/icon-no-bg.png" alt="spenlys logo" fill />
            </div>
            <span className="font-bold text-xl text-white">Spenlys</span>
          </div>
          <button
            onClick={redirectToLogin}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-12 text-center">
          <div className="inline-block bg-gradient-to-r from-indigo-900/50 to-purple-900/50 px-4 py-1 rounded-full mb-4 border border-indigo-800/30">
            <p className="text-indigo-300 font-medium">Financial Control</p>
          </div>
          <div>
            <div
              onClick={() => setIsContactModalOpen(true)}
              className="hover:scale-105 cursor-pointer transition-all inline-block bg-yellow-900/30 text-yellow-300 text-md px-3 py-1 rounded-full mb-4 border border-yellow-500/20"
            >
              <div className="flex items-center">
                <FiMessageSquare className="text-indigo-400 mr-2 text-xl" />
                Early Access — Help Shape Spenlys
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
            Master Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r pr-1 from-indigo-400 to-purple-400">
              Money
            </span>
            , Simplify Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Life
            </span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Comprehensive tools to track, manage, and optimize your personal
            finances
          </p>

          {/* Financial Insight Card */}
          <div className="relative max-w-lg mx-auto mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-5 border border-gray-700">
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPieChart className="text-white text-lg" />
                </div>
                <div className="ml-3 text-left">
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded-full">
                    SPENDING INSIGHT
                  </span>
                  <h3 className="font-bold text-white mt-1">
                    {insights[activeInsight].title}
                  </h3>
                  <p className="text-gray-400 mt-2">
                    {insights[activeInsight].content}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mt-4">
                {insights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInsight(index)}
                    className={`w-2 h-2 rounded-full ${
                      activeInsight === index ? "bg-indigo-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={redirectToLogin}
              className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold flex items-center mx-auto hover:opacity-90 transition-opacity shadow-lg"
            >
              <FiTrendingUp className="mr-2" />
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="scroll-mt-32 px-6 py-10 bg-gray-800/30"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Complete Financial Control
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
              All the tools you need to manage your money effectively
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all border-gray-700 bg-gray-800/30`}
                >
                  <div className="p-4 flex items-start cursor-pointer hover:bg-gray-700/20 transition-colors">
                    <div className="bg-indigo-900/30 p-3 rounded-lg text-indigo-400 mt-1">
                      {feature.icon}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-white">{feature.title}</h3>
                      <p className="text-gray-400 mt-1 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12 bg-gradient-to-r from-gray-800 to-gray-900 border-y border-gray-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Real Impact, Real Possibilities
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-lg mx-auto">
              Based on the results people typically see when they start tracking
              their money smartly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 relative overflow-hidden"
                >
                  {/* Icon container with subtle background */}
                  <div className="absolute -top-4 -right-4 opacity-10">
                    <div className="scale-150">{stat.icon}</div>
                  </div>

                  {/* Visible icon */}
                  <div className="mb-4">{stat.icon}</div>

                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-gray-800/50 rounded-xl border border-gray-700 max-w-2xl mx-auto">
              <p className="text-center text-gray-300 italic">
                "I didn’t realize how much small purchases added up — Spenlys
                helped me save ₹12,000 in 3 months."
              </p>
              <p className="text-xs text-center text-gray-500 mt-2">
                *Example scenario shown for illustrative purposes
              </p>
            </div>
          </div>
          <p className="text-xs text-right  text-gray-500 mt-4">
            *Based on behavioral finance research and projected user outcomes
          </p>
        </section>

        {/* How It Works */}

        <section className="px-6 py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Simple & Effective
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
              Start in minutes. Track smarter. Save effortlessly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiLock className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sign In Securely
                </h3>
                <p className="text-gray-400">
                  Connect using your Google or GitHub account in one click.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCreditCard className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Track Your Spending
                </h3>
                <p className="text-gray-400">
                  Add your expenses and categorize them.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Discover & Improve
                </h3>
                <p className="text-gray-400">
                  Get smart insights to cut spending and boost your savings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 text-center bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Take Control of Your Finances Today
            </h2>
            <p className="text-gray-400 mb-8">
              Spenlys is in early access — your feedback helps shape the future
              of personal finance.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={redirectToLogin}
                className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                <FiLogIn className="mr-2" />
                Start Tracking — It’s Free
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 max-w-xxl mx-auto">
              <div className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span className="text-gray-400">No credit card required</span>
              </div>
              <div className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span className="text-gray-400">
                  Your data stays private and safe
                </span>
              </div>
              <div className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span className="text-gray-400">Sync across devices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 bg-gray-900 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/icons/icon-no-bg.png"
                      alt="Spenlys logo"
                      fill
                    />
                  </div>
                  <span className="font-bold text-xl text-white">Spenlys</span>
                </div>
                <p className="text-gray-400">
                  Currently in early access. Things may change fast!
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* ADD Later- privacy policy and terms and conditions */}
            {/* <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Spenlys. All rights reserved.</p>
              <div className="mt-4 flex justify-center space-x-6">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Terms
                </a>
              </div>
            </div> */}
          </div>
        </footer>
      </div>
      {isContactModalOpen && (
        <ContactUsModal onClose={() => setIsContactModalOpen(false)} />
      )}
    </>
  );
}
