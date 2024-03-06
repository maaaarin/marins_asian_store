import type { Metadata } from "next";

// Font and Styling
import { Roboto } from "next/font/google";
import "./globals.css";

// Components
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Marín's",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-base`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
