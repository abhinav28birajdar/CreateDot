"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Palette,
  Type,
  Image as ImageIcon,
  FileText,
  ExternalLink,
  ArrowRight,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Brand colors
const brandColors = [
  {
    name: "Primary Violet",
    hex: "#7C3AED",
    rgb: "124, 58, 237",
    usage: "Primary brand color, buttons, links",
  },
  {
    name: "Fuchsia",
    hex: "#D946EF",
    rgb: "217, 70, 239",
    usage: "Gradients, accents, highlights",
  },
  {
    name: "Slate 900",
    hex: "#0F172A",
    rgb: "15, 23, 42",
    usage: "Dark backgrounds, text",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    usage: "Light backgrounds, text on dark",
  },
];

// Secondary colors
const secondaryColors = [
  { name: "Green", hex: "#22C55E", usage: "Success states" },
  { name: "Amber", hex: "#F59E0B", usage: "Warning states" },
  { name: "Red", hex: "#EF4444", usage: "Error states" },
  { name: "Blue", hex: "#3B82F6", usage: "Info states" },
];

// Typography
const typography = [
  {
    name: "Plus Jakarta Sans",
    usage: "Headlines, titles, buttons",
    weights: ["500 Medium", "600 SemiBold", "700 Bold"],
    sample: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Inter",
    usage: "Body text, UI elements",
    weights: ["400 Regular", "500 Medium", "600 SemiBold"],
    sample: "The quick brown fox jumps over the lazy dog",
  },
];

// Logo assets
const logoAssets = [
  { name: "Full Logo - Dark", format: "SVG, PNG", size: "Primary use", preview: "dark" },
  { name: "Full Logo - Light", format: "SVG, PNG", size: "On dark backgrounds", preview: "light" },
  { name: "Icon Only - Color", format: "SVG, PNG, ICO", size: "Favicon, app icons", preview: "icon" },
  { name: "Icon Only - White", format: "SVG, PNG", size: "On dark backgrounds", preview: "icon-white" },
];

// Guidelines
const guidelines = {
  dos: [
    "Use the full color logo on white/light backgrounds",
    "Maintain clear space around the logo",
    "Use the icon-only version for small sizes",
    "Keep logo proportions intact",
  ],
  donts: [
    "Don't stretch or distort the logo",
    "Don't change the logo colors",
    "Don't add effects like shadows or gradients",
    "Don't place logo on busy backgrounds",
  ],
};

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">DesignDot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">About</Link>
            <Link href="/careers" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Careers</Link>
            <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Contact</Link>
          </nav>
          <Link
            href="/get-started"
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium mb-6">
              <Palette className="w-4 h-4" />
              Brand Assets
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              DesignDot Brand Guidelines
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Everything you need to represent DesignDot in your content, 
              integrations, and partnerships.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Brand Kit
              </Button>
              <Link
                href="#guidelines"
                className="px-6 py-3 text-violet-600 hover:text-violet-700 font-medium"
              >
                View Guidelines
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Logo Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Logo</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {logoAssets.map((asset) => (
              <div
                key={asset.name}
                className={`rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${
                  asset.preview.includes("light") || asset.preview.includes("white")
                    ? "bg-slate-900"
                    : "bg-white dark:bg-slate-800"
                }`}
              >
                <div className="p-8 flex items-center justify-center min-h-[160px]">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      asset.preview.includes("light") || asset.preview.includes("white")
                        ? "bg-gradient-to-br from-violet-400 to-fuchsia-400"
                        : "bg-gradient-to-br from-violet-600 to-fuchsia-600"
                    }`}>
                      <Sparkles className={`w-6 h-6 ${
                        asset.preview.includes("light") || asset.preview.includes("white")
                          ? "text-white"
                          : "text-white"
                      }`} />
                    </div>
                    {!asset.preview.includes("icon") && (
                      <span className={`font-bold text-xl ${
                        asset.preview.includes("light") || asset.preview.includes("white")
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}>
                        DesignDot
                      </span>
                    )}
                  </div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">{asset.name}</h3>
                      <p className="text-sm text-slate-500">{asset.format}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logo Guidelines */}
          <div id="guidelines" className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Do's
              </h3>
              <ul className="space-y-3">
                {guidelines.dos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Don'ts
              </h3>
              <ul className="space-y-3">
                {guidelines.donts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Colors</h2>
          </div>

          {/* Primary Colors */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Primary Palette</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {brandColors.map((color) => (
              <div
                key={color.name}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div
                  className="h-24"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">{color.name}</h4>
                  <div className="space-y-1 text-sm">
                    <button
                      onClick={() => copyToClipboard(color.hex, `hex-${color.hex}`)}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white w-full"
                    >
                      {copiedColor === `hex-${color.hex}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {color.hex}
                    </button>
                    <button
                      onClick={() => copyToClipboard(`rgb(${color.rgb})`, `rgb-${color.hex}`)}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white w-full"
                    >
                      {copiedColor === `rgb-${color.hex}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      RGB: {color.rgb}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Colors */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Secondary Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {secondaryColors.map((color) => (
              <button
                key={color.name}
                onClick={() => copyToClipboard(color.hex, color.name)}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-left">
                  <div className="font-medium text-slate-900 dark:text-white text-sm">{color.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    {copiedColor === color.name ? (
                      <>
                        <Check className="w-3 h-3 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      color.hex
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Gradient */}
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Brand Gradient</h3>
            <div className="h-24 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-4" />
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => copyToClipboard("linear-gradient(to right, #7C3AED, #D946EF)", "gradient-css")}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center gap-2"
              >
                {copiedColor === "gradient-css" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                Copy CSS
              </button>
              <button
                onClick={() => copyToClipboard("from-violet-600 to-fuchsia-600", "gradient-tailwind")}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center gap-2"
              >
                {copiedColor === "gradient-tailwind" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                Copy Tailwind
              </button>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
              <Type className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Typography</h2>
          </div>

          <div className="space-y-6">
            {typography.map((font) => (
              <div
                key={font.name}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{font.name}</h3>
                    <p className="text-sm text-slate-500">{font.usage}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {font.weights.map((weight) => (
                      <span
                        key={weight}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-400"
                      >
                        {weight}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="text-2xl text-slate-900 dark:text-white"
                  style={{ fontFamily: font.name === "Plus Jakarta Sans" ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif" }}
                >
                  {font.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Download Complete Brand Kit</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get all logos, colors, typography, and guidelines in one convenient package.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-white text-violet-600 hover:bg-slate-100 px-6 py-3 font-medium flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Brand Kit (ZIP)
            </Button>
            <Link
              href="/contact?type=press"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium flex items-center gap-2"
            >
              Press Inquiries
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
