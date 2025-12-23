/**
 * Root Layout Component
 */
import type { Metadata } from "next";
import { Archivo_Black, Work_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

/**
 * Archivo Black - Headers and Logo
 */
const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

/**
 * Work Sans - Body text, grids, forms
 */
const workSans = Work_Sans({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jobify-tracker.vercel.app"
  ),

  title: {
    default: "JobHead | Modern Job Application Tracker - Organize Your Job Search",
    template: "%s | JobHead - Job Application Tracker",
  },
  description:
    "JobHead is a full-featured, modern job application tracking app for job seekers. Built with Next.js 14+, TypeScript, Clerk authentication, Prisma ORM, React Query, and PostgreSQL. Track your job applications, analyze your progress with charts and statistics, export your data, and manage your job search journey efficiently with a beautiful, responsive dashboard. Free, open-source, and production-ready.",

  keywords: [
    "job tracker",
    "job application tracker",
    "job search tracker",
    "job application management",
    "career tracker",
    "job hunt organizer",
    "Next.js",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Prisma ORM",
    "Clerk authentication",
    "React Query",
    "neobrutalism",
    "modern UI",
  ],

  authors: [
    {
      name: "Mike Anderson",
      url: "https://github.com/yourusername",
    },
  ],
  creator: "Mike Anderson",

  applicationName: "JobHead",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${workSans.variable} ${archivoBlack.variable} font-sans`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}