"use client";

import React from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GlobalErrorBoundary } from "@/components/ErrorBoundary";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default Providers;

