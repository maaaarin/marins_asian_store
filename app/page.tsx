import Image from "next/image";

// Components
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Footer } from "../components/Footer/Footer";
import { Product } from "../components/Product/Product";

export default async function Home() {

  return (
    <>
      <Header />
      <Main />
      <div className="container flex flex-col mt-10 gap-6">
        <h2 className="text-3xl font-bold">New at Marín’s!</h2>
        <div className="flex gap-4">
          <Product productId="1" productBg="C8E6FF" />
          <Product productId="2" productBg="FFCEE1" />
          <Product productId="3" productBg="FFAD5C" />
          <Product productId="4" productBg="8AC7FF" />
        </div>
      </div>
      <Footer />
    </>
  );
}
