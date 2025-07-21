import * as React from "react";
import { ToastProvider } from "./Use-Toast";

export const Toaster = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
