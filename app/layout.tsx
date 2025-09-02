import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description: "Build stunning, ATS-friendly resumes with our intuitive drag-and-drop editor. Choose from professional templates and land more interviews.",
    generator: 'v0.app'
};

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-[rgb(255,242,219)]/30">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[rgb(0,48,146)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[rgb(0,48,146)] text-lg font-semibold">Loading Resume Builder...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
