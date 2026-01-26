import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { initBlog } from '@/lib/init-blog'
import { FloatingIcons } from '@/components/floating-icons'
import { FinanceHeader } from '@/components/finance-header'
import { FinanceFooter } from '@/components/finance-footer'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Initialize the blog system
initBlog({
  owner: 'your-github-username',
  repo: 'your-repo-name',
  branch: 'main',
  blogsPath: 'public',
  useLocalFS: true,
});

export const metadata: Metadata = {
  title: 'FinanceInsight | Financial Markets & Analysis',
  description: 'Your trusted source for financial market analysis, investment strategies, and economic insights.',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased min-h-screen flex flex-col finance-grid`}>
        <FloatingIcons />
        <FinanceHeader />
        <div className="pt-20 flex-1 relative z-10">
          {children}
        </div>
        <FinanceFooter />
        <Analytics />
      </body>
    </html>
  )
}
