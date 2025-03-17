"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/config/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
