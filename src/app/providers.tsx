"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/config/query-client";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
}
