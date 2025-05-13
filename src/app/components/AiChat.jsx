"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export function AiChat({ onClose }) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const disableInputs = useCallback(function () {
    inputRef.current.disabled = true;
    inputRef.current.classList.add("bg-slate-600");
    submitButtonRef.current.disabled = true;
    submitButtonRef.current.classList.add("bg-slate-600");
  });
  const enableInputs = useCallback(function () {
    inputRef.current.disabled = false;
    inputRef.current.classList.remove("bg-slate-600");
    submitButtonRef.current.disabled = false;
    submitButtonRef.current.classList.remove("bg-slate-600");
  });
  const scrollToBottom = useCallback(function () {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth", // Optional: Adds smooth scrolling
      });
    }
  });
  async function handleSubmit() {
    if (inputText.trim().length < 1) {
      return;
    }
    const userMessage = {
      role: "user",
      content: inputText,
    };
    const newMessages = [...messages, userMessage];

    // Update state with the new messages
    setMessages(newMessages);

    setInputText("");
    disableInputs();

    try {
      const response = await axios.post("/api/ai/chat", {
        messages: newMessages,
      });
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      const errorMessage = error?.response?.data || {
        role: "error",
        content: "Some error occured. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    enableInputs();

    inputRef.current.focus();
  }
  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-40">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h2 className="text-white text-lg font-semibold">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={messagesContainerRef}
        >
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } `}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : message.role === "assistant"
                      ? "bg-slate-800 text-slate-200"
                      : "bg-red-600 text-slate-200"
                  }`}
                >
                  <div className="flex">
                    {message.role === "error" ? (
                      <svg
                        className="w-6 h-6 mr-2 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    ) : (
                      ""
                    )}

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              ref={submitButtonRef}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
