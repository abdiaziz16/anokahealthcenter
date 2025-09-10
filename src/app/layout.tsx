import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anoka Health Center - ARMHS Services",
  description: "Adult Rehabilitative Mental Health Services (ARMHS) providing recovery-oriented interventions in Minneapolis, MN.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-black min-h-screen text-white`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} Anoka Health Center, LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
