import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const dynamic = 'force-dynamic'
export const revalidate = 0

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Genera tus Reportes ESG con Inteligencia Artificial | Inteligenze: Datos Precisos, Sostenibilidad Inteligente",
  description:
    "Inteligenze automatiza la recolección y análisis de datos ESG. Nuestra plataforma de IA genera reportes instantáneos y confiables para impulsar la transparencia y el rendimiento sostenible de tu empresa.",
  keywords: "enterprise AI, secure AI, government AI solutions, LLM, knowledge base, AI agents, MCP server",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.inteligenze.com/",
    title: "Genera tus Reportes ESG con Inteligencia Artificial | Inteligenze: Datos Precisos, Sostenibilidad Inteligente",
    description:
      "Inteligenze automatiza la recolección y análisis de datos ESG. Nuestra plataforma de IA genera reportes instantáneos y confiables para impulsar la transparencia y el rendimiento sostenible de tu empresa.",
    siteName: "Enterprise AI Platform",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Enterprise AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Platform | Secure AI Solutions",
    description: "Enterprise-grade AI platform with advanced security, customization, and control.",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
