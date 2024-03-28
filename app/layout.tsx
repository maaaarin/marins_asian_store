import type { Metadata } from "next";
import { Provider } from "react-redux";

// Font and Styling
import { Open_Sans } from "next/font/google";
import "./globals.css";

// Components
import { Footer } from "@/components/ui/Footer/Footer";
import { Header } from "@/components/ui/Header/Header";
import { Providers } from "./Providers";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      <body className={`${openSans.className} text-base`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
