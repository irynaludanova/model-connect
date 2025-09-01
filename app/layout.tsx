import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://model-connect-ten.vercel.app"),
  title: {
    default: "ModelConnect – Каталог моделей, фотографов и стилистов в Майами",
    template: "%s | ModelConnect Miami",
  },
  description:
    "Каталог моделей, фотографов и стилистов в Майами. Удобный поиск специалистов по регионам и направлениям. Портфолио, контакты и рейтинги.",
  keywords: [
    "ModelConnect",
    "Модели Майами",
    "Фотограф Майами",
    "Стилист Майами",
    "Каталог моделей",
    "Портфолио",
  ],
  authors: [{ name: "ModelConnect" }],
  creator: "ModelConnect",
  publisher: "ModelConnect",
  openGraph: {
    title: "ModelConnect – Каталог моделей, фотографов и стилистов в Майами",
    description:
      "Найдите моделей, фотографов и стилистов в Майами. Портфолио и контакты в одном месте.",
    url: "https://model-connect-ten.vercel.app",
    siteName: "ModelConnect",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ModelConnect – каталог моделей и фотографов в Майами",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelConnect – Каталог моделей и фотографов",
    description:
      "Каталог моделей, фотографов и стилистов в Майами. Поиск по регионам и категориям.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://model-connect-ten.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${interSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
