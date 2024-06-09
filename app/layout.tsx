import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

// Font and Styling
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Marín's | Your Asian Store",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${openSans.className} text-base`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
