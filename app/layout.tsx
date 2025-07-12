import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ Importa el componente Script de Next.js
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Ramírez | Desarrollador Full Stack",
  description:
    "Portafolio profesional de Gabriel Ramírez, desarrollador full stack con experiencia en MERN, .NET y más.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Script reCAPTCHA de forma segura */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LenyIArAAAAAPgXu-qESFv2bMmMRBDKMyhsOit2"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
