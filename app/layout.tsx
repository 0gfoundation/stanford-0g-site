import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AttributionTracker from "@/components/AttributionTracker";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apollo.0g.ai"),
  title: "0G Apollo Program - AI Accelerator",
  description: "Three-month accelerator from xBuilders (led by Stanford veterans) and 0G for AI founders building the future of AI infrastructure",
  keywords: ["0G", "blockchain", "accelerator", "Web3", "AI", "startup", "Stanford", "Stanford blockchain", "Stanford accelerator"],
  openGraph: {
    title: "0G Apollo Program - AI Accelerator",
    description: "Three-month accelerator from xBuilders (led by Stanford veterans) and 0G for AI founders building the future of AI infrastructure",
    url: "https://apollo.0g.ai",
    siteName: "0G Apollo Program",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "0G Apollo Program - AI Accelerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0G Apollo Program - AI Accelerator",
    description: "Three-month accelerator from xBuilders (led by Stanford veterans) and 0G for AI founders building the future of AI infrastructure",
    images: ["/og-image.png?v=3"],
  },
  alternates: {
    canonical: "https://apollo.0g.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google tag (GTM-5FGP4MT5 → GA4), placed first in <head> as Google asks.
            Production builds only, so local development doesn't count as traffic. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-5FGP4MT5" />
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());",
              }}
            />
          </>
        )}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "0G Apollo Program",
                  url: "https://apollo.0g.ai",
                  logo: "https://apollo.0g.ai/apollo.png",
                  description: "AI Accelerator by xBuilders and 0G Labs",
                },
                {
                  "@type": "Event",
                  name: "0G Apollo Program - AI Accelerator (Cohort 2)",
                  // Cohort 2 kicks off December 2026; exact date TBC
                  startDate: "2026-12",
                  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
                  description: "Three-month accelerator from xBuilders (led by Stanford veterans) and 0G for AI founders building the future of AI infrastructure. Cohort 2 applications are open until November 15, 2026, with teams accepted on a rolling basis.",
                  organizer: {
                    "@type": "Organization",
                    name: "xBuilders & 0G Labs",
                  },
                  location: {
                    "@type": "Place",
                    name: "Stanford University",
                    address: "Stanford, CA",
                  },
                },
              ],
            }),
          }}
        />
        <AttributionTracker />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
