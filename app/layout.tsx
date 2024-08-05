import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = "GIF Grid Splitter";
const description = "Engineering Assignment: Animated GIF Grid Splitter";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main className="flex justify-center items-center min-h-screen flex-col space-y-1">
          <Providers>
            <Header />
            <div className="flex flex-col" data-id="3">
              <main className="flex-1 py-2 px-6" data-id="11">
                <div className="max-w-4xl mx-auto" data-id="12">
                  <div>{children}</div>
                </div>
              </main>
            </div>
            <Toaster />
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
