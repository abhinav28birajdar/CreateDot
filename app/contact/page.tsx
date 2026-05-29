"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Building2,
  Users,
  Briefcase,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Contact reasons
const contactReasons = [
  { id: "general", label: "General Inquiry", icon: HelpCircle },
  { id: "support", label: "Technical Support", icon: MessageCircle },
  { id: "sales", label: "Sales & Enterprise", icon: Building2 },
  { id: "partnership", label: "Partnerships", icon: Users },
  { id: "press", label: "Press & Media", icon: Briefcase },
];

// Office locations
const offices = [
  {
    city: "San Francisco",
    country: "USA",
    address: "123 Design Street, Suite 400",
    timezone: "PST (UTC-8)",
    isHQ: true,
  },
  {
    city: "London",
    country: "UK",
    address: "45 Creative Lane, Floor 3",
    timezone: "GMT (UTC+0)",
    isHQ: false,
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "78 Innovation Way, Level 12",
    timezone: "SGT (UTC+8)",
    isHQ: false,
  },
];

// Contact methods
const contactMethods = [
  {
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "hello@designdot.io",
    icon: Mail,
    action: "mailto:hello@designdot.io",
  },
  {
    title: "Live Chat",
    description: "Available Monday - Friday, 9am-6pm PST",
    value: "Start a conversation",
    icon: MessageCircle,
    action: "#chat",
  },
  {
    title: "Phone",
    description: "For enterprise customers",
    value: "+1 (415) 555-0123",
    icon: Phone,
    action: "tel:+14155550123",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#111111] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Message Sent!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium"
            >
              Back to Home
            </Link>
            <Link
              href="/help"
              className="px-6 py-3 text-violet-600 hover:text-violet-700 font-medium"
            >
              Visit Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1F1F1F] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">DesignDot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/help" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Help Center
            </Link>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get in touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="block bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] p-6 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all group"
              >
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors">
                  <method.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500 mb-2">{method.description}</p>
                <span className="text-violet-600 font-medium flex items-center gap-1">
                  {method.value}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Reason */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      What's this about?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, reason: reason.id })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.reason === reason.id
                              ? "bg-violet-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          <reason.icon className="w-4 h-4" />
                          {reason.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="w-full"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you're looking for..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Response Time */}
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-violet-600" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Fast Response
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We typically respond within 24 hours during business days. 
                  For urgent matters, please use our live chat.
                </p>
              </div>

              {/* Office Locations */}
              <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-violet-600" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div
                      key={office.city}
                      className="pb-4 border-b border-slate-100 dark:border-[#2A2A2A] last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {office.city}, {office.country}
                        </span>
                        {office.isHQ && (
                          <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 text-xs rounded-full">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{office.address}</p>
                      <p className="text-xs text-slate-400">{office.timezone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/designdot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </a>
                  <a
                    href="https://linkedin.com/company/designdot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </a>
                  <a
                    href="https://github.com/designdot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Github className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Enterprise CTA */}
              <div className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl p-6 text-white">
                <Building2 className="w-8 h-8 mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Enterprise Solutions</h3>
                <p className="text-sm text-white/80 mb-4">
                  Looking for a custom solution for your team? Let's discuss your needs.
                </p>
                <Link
                  href="/contact?type=enterprise"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-violet-600 rounded-lg font-medium text-sm hover:bg-slate-100 transition-colors"
                >
                  Talk to Sales
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
