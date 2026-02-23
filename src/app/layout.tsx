import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onlinein | Go Online & Automate Your Business",
  description: "We help businesses Scale Up by building high-converting websites and automating manual workflows with AI. The modern way to grow.",
  keywords: "Web Design, User Interface, AI Automation, Workflow Automation, Chatbots, Digital Agency, Branding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#0a0a0f] text-white selection:bg-orange-500/30">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
