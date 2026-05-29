"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white dark:bg-[#111111] rounded-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Community Guidelines
          </h1>
          <p className="text-slate-500 mb-8">
            Building a creative and respectful community together
          </p>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400">
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 mb-8 not-prose">
              <h3 className="text-lg font-semibold text-violet-900 dark:text-violet-100 mb-2">
                Our Mission
              </h3>
              <p className="text-violet-700 dark:text-violet-300">
                Designly is a community built for creatives, by creatives. We believe
                in fostering an environment where designers can share their work,
                learn from each other, and grow together. These guidelines help us
                maintain a safe, inclusive, and inspiring space for everyone.
              </p>
            </div>

            <h2>1. Respect & Inclusivity</h2>
            <p>
              We are committed to creating a welcoming environment for all members,
              regardless of background, identity, or experience level.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-[#8B5DFF] font-medium mb-3">
                  <Check className="w-5 h-5" />
                  Do
                </div>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li>• Treat others with respect and kindness</li>
                  <li>• Welcome newcomers and help them learn</li>
                  <li>• Celebrate diverse perspectives and styles</li>
                  <li>• Give constructive, helpful feedback</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-medium mb-3">
                  <X className="w-5 h-5" />
                  Don&apos;t
                </div>
                <ul className="space-y-2 text-sm text-red-800 dark:text-red-300">
                  <li>• Harass, bully, or intimidate others</li>
                  <li>• Use discriminatory or hateful language</li>
                  <li>• Dismiss or belittle others&apos; work</li>
                  <li>• Engage in personal attacks</li>
                </ul>
              </div>
            </div>

            <h2>2. Original Work & Copyright</h2>
            <p>
              Designly celebrates original creativity. All work shared on the
              platform should be your own or properly credited.
            </p>

            <h3>2.1 What You Can Share</h3>
            <ul>
              <li>Your original designs and creative work</li>
              <li>Collaborative work where you have permission from all contributors</li>
              <li>Client work where you have permission to share publicly</li>
              <li>Remixes or derivative works with proper credit to original creators</li>
            </ul>

            <h3>2.2 What You Cannot Share</h3>
            <ul>
              <li>Work created by others without permission</li>
              <li>Copyrighted content you don&apos;t have rights to</li>
              <li>Plagiarized or stolen designs</li>
              <li>AI-generated content presented as fully original work (without disclosure)</li>
            </ul>

            <h2>3. Appropriate Content</h2>
            <p>
              Keep Designly professional and safe for all audiences. While we
              celebrate creative expression, certain content is not permitted.
            </p>

            <h3>3.1 Prohibited Content</h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 my-4 not-prose">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium mb-3">
                <AlertTriangle className="w-5 h-5" />
                Not Allowed
              </div>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                <li>• Explicit or pornographic content</li>
                <li>• Graphic violence or gore</li>
                <li>• Hate speech or discriminatory content</li>
                <li>• Spam, scams, or misleading content</li>
                <li>• Content promoting illegal activities</li>
                <li>• Personal information of others without consent</li>
              </ul>
            </div>

            <h3>3.2 Sensitive Content</h3>
            <p>
              Some content may be appropriate in certain contexts but requires
              sensitivity. This includes:
            </p>
            <ul>
              <li>Artistic nudity (mark as mature content)</li>
              <li>Politically or socially charged topics</li>
              <li>Content that may be disturbing to some viewers</li>
            </ul>

            <h2>4. Constructive Feedback</h2>
            <p>
              Feedback is essential for growth. We encourage thoughtful,
              constructive criticism that helps creators improve.
            </p>

            <h3>4.1 Giving Feedback</h3>
            <ul>
              <li>Be specific and actionable</li>
              <li>Focus on the work, not the person</li>
              <li>Balance critiques with positive observations</li>
              <li>Offer suggestions, not just criticism</li>
              <li>Respect the creator&apos;s intent and style</li>
            </ul>

            <h3>4.2 Receiving Feedback</h3>
            <ul>
              <li>Stay open-minded and receptive</li>
              <li>Ask clarifying questions if needed</li>
              <li>Thank people for their time and input</li>
              <li>Remember that all feedback is an opportunity to learn</li>
            </ul>

            <h2>5. Authentic Engagement</h2>
            <p>
              Build genuine connections through authentic engagement. Artificial
              manipulation of metrics undermines the community.
            </p>

            <h3>5.1 Prohibited Activities</h3>
            <ul>
              <li>Buying or selling followers, likes, or engagement</li>
              <li>Using bots or automated tools for engagement</li>
              <li>Creating fake accounts to boost your own work</li>
              <li>Follow-for-follow schemes or engagement pods</li>
              <li>Spamming comments or messages</li>
            </ul>

            <h2>6. Professional Conduct</h2>
            <p>
              For members using Designly for professional opportunities, maintain
              high standards of professionalism.
            </p>
            <ul>
              <li>Be honest in your profile and capabilities</li>
              <li>Communicate clearly and professionally</li>
              <li>Honor commitments and deadlines</li>
              <li>Respect confidentiality agreements</li>
              <li>Handle disputes professionally</li>
            </ul>

            <h2>7. Reporting & Enforcement</h2>
            <h3>7.1 How to Report</h3>
            <p>
              If you see content or behavior that violates these guidelines,
              please report it:
            </p>
            <ul>
              <li>Click the flag/report icon on any content</li>
              <li>Email reports@designly.com with details</li>
              <li>Contact support for urgent matters</li>
            </ul>

            <h3>7.2 Enforcement Actions</h3>
            <p>Violations may result in:</p>
            <ul>
              <li>Content removal</li>
              <li>Warnings</li>
              <li>Temporary suspension</li>
              <li>Permanent account termination</li>
              <li>Legal action in severe cases</li>
            </ul>

            <h2>8. Changes to Guidelines</h2>
            <p>
              We may update these guidelines as our community evolves. Major
              changes will be communicated through email and platform
              announcements.
            </p>

            <h2>Questions?</h2>
            <p>
              If you have questions about these guidelines or need clarification,
              contact us at community@designly.com.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/terms" className="text-violet-600 hover:underline">
            Terms of Service →
          </Link>
          <Link href="/privacy" className="text-violet-600 hover:underline">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
