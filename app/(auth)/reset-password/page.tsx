import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export const metadata: Metadata = {
  title: "Reset Password - CreateDOT",
  description: "Reset your account password",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" />}>
      <ResetPasswordClient />
    </Suspense>
  );
}
