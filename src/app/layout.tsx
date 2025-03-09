import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Car Dealer",
  description: "CMS para concessionárias de veículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>{children}</body>
    </html>
  );
}
