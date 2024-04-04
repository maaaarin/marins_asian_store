// Components
import { Footer } from "@/components/ui/Footer/Footer";
import { Header } from "@/components/ui/Header/Header";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
}
