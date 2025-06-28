import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "../contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "مياه صفاء - متجر المياه الأول في الكويت",
  description: "أفضل أنواع المياه النقية والعذبة مع توصيل مجاني",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
