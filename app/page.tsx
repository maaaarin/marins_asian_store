import Image from "next/image";

// Components
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Footer } from "../components/Footer/Footer";
import { Product } from "../components/Product/Product";

export default async function Home() {

  const users = await handler();

  return (
    <>
      <Header />
      <Main />
      <div className="container flex mt-5 gap-4">
        <Product productId="1" productBg="C8E6FF" />
        <Product productId="2" productBg="FFCEE1" />
      </div>
      <Footer />
    </>
  );
}
