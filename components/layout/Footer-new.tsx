import Link from "next/link"
import { Palette, Heart, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container-fluid max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#8B5DFF] rounded-xl flex items-center justify-center shadow-lg">
                <Palette className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold designly-text-gradient">Design.ly</span>
                <div className="text-sm text-gray-400">AI-Powered Creative Engine</div>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Revolutionizing creativity with AI-powered design tools. Create stunning visuals, 
              logos, and marketing materials in seconds, not hours.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for creators worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/create" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center">
                  Create Design
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  Explore Gallery
                </Link>
              </li>
              <li>
                <Link href="/explore/ai-insights" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  AI Insights
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3 text-purple-400" />
                hello@design.ly
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3 text-purple-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-4 w-4 mr-3 text-purple-400 mt-1" />
                <span>San Francisco, CA<br />United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1F1F1F] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Design.ly. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
