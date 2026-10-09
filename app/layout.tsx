import type React from "react"
import "./globals.css"
import "./designly-styles.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ProjectProvider } from "@/contexts/ProjectContext"
import { Providers } from "@/components/layout/Providers"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "CreateDOT — Where Creativity Meets Opportunity",
    template: "%s | CreateDOT",
  },
  description: "CreateDOT is the premier creative platform to showcase work, discover inspiration, get feedback, and find meaningful opportunities.",
  keywords: ["CreateDOT", "design", "creative platform", "portfolio", "creative jobs", "AI design tools", "Abhinav"],
  authors: [{ name: "abhinav28birajdar", url: "https://github.com/abhinav28birajdar" }],
  icons: {
    icon: [
      { url: "/images/appicon.png", sizes: "any" },
      { url: "/images/appicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/appicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/appicon.png",
    apple: "/images/appicon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <ProjectProvider>
            <Providers>
              {children}
            </Providers>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
