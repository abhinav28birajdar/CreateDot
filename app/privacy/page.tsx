"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-500 mb-8">Last updated: December 15, 2024</p>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400">
            <p className="lead">
              At Designly, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>1.1 Information You Provide</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> Name, email address,
                username, password, profile picture, and bio
              </li>
              <li>
                <strong>Profile Data:</strong> Skills, experience, portfolio
                work, social links, and location
              </li>
              <li>
                <strong>Content:</strong> Projects, comments, messages, and other
                content you upload
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details processed
                securely through our payment providers
              </li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <ul>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and interaction data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and content recommendations</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze usage trends and preferences</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <h3>3.1 Public Information</h3>
            <p>
              Your public profile, including your name, username, avatar, bio,
              and portfolio work, is visible to other users and may be indexed
              by search engines.
            </p>

            <h3>3.2 With Your Consent</h3>
            <p>
              We may share your information with third parties when you give us
              explicit consent to do so.
            </p>

            <h3>3.3 Service Providers</h3>
            <p>
              We work with trusted third-party service providers who assist us in
              operating the platform, including:
            </p>
            <ul>
              <li>Cloud hosting providers (e.g., AWS, Vercel)</li>
              <li>Payment processors (e.g., Stripe)</li>
              <li>Analytics providers (e.g., Google Analytics)</li>
              <li>Email service providers</li>
            </ul>

            <h3>3.4 Legal Requirements</h3>
            <p>
              We may disclose your information if required by law or in response
              to valid legal processes.
            </p>

            <h2>4. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or
              as needed to provide services. You can request deletion of your
              data at any time through your account settings.
            </p>

            <h2>5. Your Rights and Choices</h2>
            <h3>5.1 Access and Update</h3>
            <p>
              You can access and update your personal information through your
              account settings at any time.
            </p>

            <h3>5.2 Delete Your Account</h3>
            <p>
              You can delete your account and associated data through Settings
              → Account → Delete Account.
            </p>

            <h3>5.3 Marketing Communications</h3>
            <p>
              You can opt out of marketing emails by clicking the unsubscribe
              link in any email or through your notification settings.
            </p>

            <h3>5.4 Cookies</h3>
            <p>
              You can manage cookie preferences through your browser settings.
              Note that disabling cookies may affect platform functionality.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              information, including:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Secure authentication and access controls</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>7. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              for such transfers.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Designly is not intended for children under 13. We do not knowingly
              collect personal information from children under 13. If you believe
              a child has provided us with personal information, please contact
              us.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any material changes via email or through the Platform. Your
              continued use after changes constitutes acceptance.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul>
              <li>Email: privacy@designly.com</li>
              <li>Data Protection Officer: dpo@designly.com</li>
              <li>Address: 123 Design Street, San Francisco, CA 94105</li>
            </ul>

            <h2>11. Additional Rights for EU/EEA Users</h2>
            <p>If you are in the EU/EEA, you have additional rights under GDPR:</p>
            <ul>
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>12. California Privacy Rights</h2>
            <p>
              California residents have additional rights under CCPA, including
              the right to know what personal information is collected and the
              right to request deletion.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/terms" className="text-violet-600 hover:underline">
            Terms of Service →
          </Link>
          <Link href="/guidelines" className="text-violet-600 hover:underline">
            Community Guidelines →
          </Link>
        </div>
      </div>
    </div>
  );
}
