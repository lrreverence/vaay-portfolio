import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif']
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.caesarisidrovaay.online';
const siteName = "Va-ay | Freelance Full-Stack Developer";
const defaultDescription = "Caesar Va-ay - Freelance full-stack developer from the Philippines specializing in web development, automation, AI, and machine learning. Building modern applications with Next.js, React, TypeScript, Python, and more.";
const defaultKeywords = [
  "Caesar Va-ay",
  "freelance developer",
  "full stack developer",
  "software developer Philippines",
  "web developer Cebu",
  "Next.js developer",
  "React developer",
  "TypeScript developer",
  "Python developer",
  "automation developer",
  "AI developer",
  "machine learning engineer",
  "data engineer",
  "Django developer",
  "Flask developer",
  "frontend developer",
  "backend developer",
  "portfolio",
  "freelance software engineer",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Va-ay Portfolio",
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [
    { 
      name: "Caesar Va-ay",
      url: siteUrl,
    },
  ],
  creator: "Caesar Va-ay",
  publisher: "Caesar Va-ay",
  category: "Technology",
  classification: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_PH"],
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/vaaypp.png`,
        width: 1200,
        height: 630,
        alt: "Caesar Va-ay - Freelance Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: [`${siteUrl}/vaaypp.png`],
    creator: "@kandilasacake",
    site: "@kandilasacake",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/vaaypp.png", sizes: "32x32", type: "image/png" },
      { url: "/vaaypp.png", sizes: "16x16", type: "image/png" },
      { url: "/vaaypp.png", sizes: "192x192", type: "image/png" },
      { url: "/vaaypp.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/vaaypp.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon.ico" },
    ],
  },
  manifest: `${siteUrl}/manifest.json`,
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": [{ url: `${siteUrl}/feed.xml`, title: "Va-ay Blog RSS Feed" }],
    },
  },
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Va-ay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Additional favicon links for better Google indexing */}
        <link rel="icon" type="image/png" sizes="32x32" href={`${siteUrl}/vaaypp.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${siteUrl}/vaaypp.png`} />
        <link rel="icon" type="image/x-icon" href={`${siteUrl}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${siteUrl}/vaaypp.png`} />
        <link rel="manifest" href={`${siteUrl}/manifest.json`} />
      </head>
      <body
        className={cn(
          "mx-auto flex min-h-screen max-w-3xl flex-col px-8 font-sans antialiased",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <ChatInterface />
        </Providers>
      </body>
    </html>
  );
}
