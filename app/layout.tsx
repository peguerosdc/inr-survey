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
  title: "Evaluación del Comportamiento Sedentario",
  description: "Evaluación del Comportamiento Sedentario - INR 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <h1 className="text-3xl sm:text-5xl font-bold text-center my-2">
            EVALUACIÓN DEL COMPORTAMIENTO SEDENTARIO
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
