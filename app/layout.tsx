import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
title: 'Gabriel Ramírez | Desarrollador Full Stack',
  description: 'Portafolio profesional de Gabriel Ramírez, desarrollador full stack con experiencia en MERN, .NET y más.',
  keywords: ['Gabriel Ramírez', 'desarrollador', 'MERN', 'Node.js', 'React', 'portafolio', 'backend', 'freelance'],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
