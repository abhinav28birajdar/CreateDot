import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container-fluid max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                <Image
                  src="/images/appicon.png"
                  alt="CreateDOT"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <span className="text-2xl font-bold designly-text-gradient">CreateDOT</span>
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
                <Link href="/templates" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium text-white">Email</div>
                  <div className="text-sm">hello@createdot.io</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium text-white">Phone</div>
                  <div className="text-sm">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium text-white">Address</div>
                  <div className="text-sm">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CreateDOT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
