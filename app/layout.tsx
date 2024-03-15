import type { Metadata } from "next";
import { Provider } from "react-redux";

// Font and Styling
import { Roboto } from "next/font/google";
import "./globals.css";

// Components
import { Footer } from "@/components/ui/Footer/Footer";
import { Header } from "@/components/ui/Header/Header";
import { Providers } from "./Providers";

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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
