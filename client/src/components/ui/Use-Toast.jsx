import React, { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "./Toast";

// Create toast context
const ToastContext = createContext();

// Custom hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Generate a truly unique ID using Date.now and a random suffix
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, description, variant = "success", action }) => {
    const id = generateId();
    const newToast = { id, title, description, variant, action };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const toast = {
    success: (options) => showToast({ ...options, variant: "success" }),
    error: (options) => showToast({ ...options, variant: "destructive" }),
    info: (options) => showToast({ ...options, variant: "info" }),
    custom: (options) => showToast(options),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-4">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <Toast
              key={t.id} // ✅ Now always unique
              title={t.title}
              description={t.description}
              variant={t.variant}
              action={t.action}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
