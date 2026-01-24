"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-500 mb-8">Last updated: December 15, 2024</p>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Designly (&quot;the Platform&quot;), you agree to be
              bound by these Terms of Service. If you do not agree to these terms,
              please do not use the Platform.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Designly is a creative portfolio platform that allows designers to
              showcase their work, connect with other creatives, and find
              opportunities. The Platform includes:
            </p>
            <ul>
              <li>Portfolio hosting and showcase features</li>
              <li>Community features including likes, comments, and follows</li>
              <li>Job board and hiring marketplace</li>
              <li>Messaging and collaboration tools</li>
              <li>AI-powered design assistance tools</li>
            </ul>

            <h2>3. User Accounts</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              To use certain features of the Platform, you must create an account.
              You agree to provide accurate, current, and complete information
              during registration and to update such information as necessary.
            </p>

            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. Notify us immediately of any unauthorized use.
            </p>

            <h2>4. User Content</h2>
            <h3>4.1 Ownership</h3>
            <p>
              You retain ownership of all content you upload to the Platform
              (&quot;User Content&quot;). By uploading content, you grant Designly a
              non-exclusive, worldwide, royalty-free license to display, reproduce,
              and distribute your content on the Platform.
            </p>

            <h3>4.2 Responsibility</h3>
            <p>
              You are solely responsible for your User Content. You represent and
              warrant that you have all necessary rights to upload and share your
              content, and that your content does not infringe on any third-party
              rights.
            </p>

            <h3>4.3 Prohibited Content</h3>
            <p>You may not upload content that:</p>
            <ul>
              <li>Infringes on intellectual property rights</li>
              <li>Is defamatory, obscene, or offensive</li>
              <li>Contains malware or harmful code</li>
              <li>Violates any applicable laws or regulations</li>
              <li>Impersonates another person or entity</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              The Platform, including its design, features, and content (excluding
              User Content), is owned by Designly and protected by copyright,
              trademark, and other intellectual property laws.
            </p>

            <h2>6. Marketplace Terms</h2>
            <h3>6.1 Hiring and Jobs</h3>
            <p>
              Designly facilitates connections between designers and clients but is
              not a party to any agreement between users. We do not guarantee the
              quality, safety, or legality of any work or payment.
            </p>

            <h3>6.2 Fees</h3>
            <p>
              Certain features may require payment. You agree to pay all fees
              associated with your use of paid features. Fees are non-refundable
              unless otherwise specified.
            </p>

            <h2>7. Privacy</h2>
            <p>
              Your use of the Platform is also governed by our{" "}
              <Link href="/privacy" className="text-violet-600 hover:underline">
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect your information.
            </p>

            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account at any time for violations
              of these Terms or for any other reason at our discretion. You may
              also delete your account at any time through your account settings.
            </p>

            <h2>9. Disclaimers</h2>
            <p>
              THE PLATFORM IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND.
              WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL DESIGNLY BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
              THE PLATFORM.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify you of
              significant changes via email or through the Platform. Continued use
              after changes constitutes acceptance of the new Terms.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: legal@designly.com</li>
              <li>Address: 123 Design Street, San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/privacy"
            className="text-violet-600 hover:underline"
          >
            Privacy Policy →
          </Link>
          <Link
            href="/guidelines"
            className="text-violet-600 hover:underline"
          >
            Community Guidelines →
          </Link>
        </div>
      </div>
    </div>
  );
}
