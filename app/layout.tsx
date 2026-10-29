import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, VT323 } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { content, DEFAULT_LANG } from "@/content/game";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const meta = content[DEFAULT_LANG].meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: [
    "Gabriel Ramírez",
    "Full-Stack Developer",
    "Desarrollador Full-Stack",
    "NestJS",
    "Node.js",
    "React",
    "Next.js",
    "TypeScript",
    "payment integrations",
    "Stripe",
    "SaaS",
    "Caracas",
    "Venezuela",
  ],
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={DEFAULT_LANG}>
      <head>
        <meta name="google-site-verification" content="58Vp1nta6XRlZqQhThCX7mBzMvS29vy2hZZzAv0WZoc" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VC58Y8L7G3"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VC58Y8L7G3');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} ${vt323.variable} antialiased`}
      >
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LenyIArAAAAAPgXu-qESFv2bMmMRBDKMyhsOit2"
          strategy="afterInteractive"
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
