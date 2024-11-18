import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ICTM Prep - Your Ultimate Resource for the ICTM Math Contest",
  description: "ICTM math contest resources & past questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${montserrat.className}`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
