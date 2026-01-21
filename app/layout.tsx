import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ToasterProvider } from "./toaster-provider"
import { I18nProvider } from "@/i18n/i18n-provider"
import { defaultLocale } from "@/i18n/i18n"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Blackwell Global | Adaptive access",
  description:
    "Adaptive authentication with risk-aware flows and zero-downtime upgrades.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={defaultLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          {children}
          <ToasterProvider />
        </I18nProvider>
      </body>
    </html>
  )
}
