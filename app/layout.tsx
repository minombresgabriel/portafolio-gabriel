import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ Importa Script
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Ramírez | Full Stack Developer",
  description:
    "Professional portfolio of Gabriel Ramírez, full stack developer with experience in MERN, .NET, and more.",
  keywords: [
    "Gabriel Ramírez",
    "desarrollador",
    "MERN",
    "Node.js",
    "React",
    "portafolio",
    "backend",
    "freelance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Script reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LenyIArAAAAAPgXu-qESFv2bMmMRBDKMyhsOit2"
          strategy="afterInteractive"
        />
        {children}
          <SpeedInsights /> 
      </body>
    </html>
  );
}
