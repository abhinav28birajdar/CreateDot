import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#8B5DFF]" />}>
      <VerifyEmailClient />
    </Suspense>
  );
}
