"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";

const mockProducts = [
  {
    id: "1",
    name: "Glassmorphism UI Kit",
    price: 29,
    category: "ui-kit",
    preview: "https://via.placeholder.com/300x200?text=UI+Kit",
    sales: 234,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Design System Template",
    price: 49,
    category: "template",
    preview: "https://via.placeholder.com/300x200?text=Template",
    sales: 156,
    rating: 4.9,
  },
];

export default function MonetizationPage() {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-gray-50 via-white to-[#FFF8DE]/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Monetize Your Work
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sell design templates, UI kits, assets, and courses
          </p>
        </div>

        {/* Revenue Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Earnings", value: "$12,450", icon: "💰" },
            { label: "Products Sold", value: "842", icon: "🛍️" },
            { label: "Avg Rating", value: "4.8/5", icon: "⭐" },
            { label: "This Month", value: "$2,340", icon: "📈" },
          ].map((stat, idx) => (
            <Card key={idx}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Products</h2>
            <Button variant="primary">+ Add Product</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition">
                <div
                  className="w-full h-40 rounded-lg mb-4 bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20 flex items-center justify-center text-4xl object-cover"
                >
                  {product.category === "ui-kit" ? "🎨" : "📋"}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge size="sm" variant="secondary">
                    {product.category}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ⭐ {product.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {product.sales} sales
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-[#576A8F]">${product.price}</p>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add New Product Card */}
            <Card
              className="flex items-center justify-center text-center p-12 cursor-pointer hover:bg-white/10"
            >
              <div>
                <p className="text-4xl mb-4">➕</p>
                <p className="font-medium text-gray-900 dark:text-white">Add New Product</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start selling your creations
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                features: ["Share projects", "1 product", "Basic analytics"],
                button: "Current Plan",
              },
              {
                name: "Pro",
                price: "$9/mo",
                features: ["Unlimited products", "Advanced analytics", "Priority support"],
                button: "Upgrade",
                highlighted: true,
              },
              {
                name: "Premium",
                price: "$29/mo",
                features: [
                  "Everything in Pro",
                  "Custom domain",
                  "API access",
                  "Dedicated support",
                ],
                button: "Learn More",
              },
            ].map((plan, idx) => (
              <Card key={idx} className={plan.highlighted ? "border-[#1F1F1F] border-[#576A8F]" : ""}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-[#576A8F] mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span>✓</span>
                      <span className="text-gray-900 dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  {plan.button}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

