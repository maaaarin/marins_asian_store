import CategoryContent from "@/components/ui/Category/CategoryContent";
import { ProductCard } from "@/components/ui/Product/ProductCard";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import localFont from "next/font/local";
import React, { useRef } from "react";
import Image from "next/image";

// Font files
const newakeFont = localFont({
  src: "../../../../public/assets/fonts/NewakeFont.otf",
});

type Props = {
  params: { category: string };
};

const Category = async ({ params: { category } }: Props) => {
  // Products
  const products: Product[] = await getProductsByCategory(category);

  return (
    <>
      <main className="container mt-24">
        <div className="size-full flex flex-col gap-5">
          <div className="w-full h-52 bg-secondary rounded-3xl bg-center bg-[url('/assets/img/category-mobile.svg')] lg:bg-[url('/assets/img/category.png')] bg-cover flex items-center justify-center flex-col relative">
            <Image
              className="hidden absolute -top-8 left-28 w-32 lg:block"
              src={`/assets/img/category_${category}_1.png`}
              alt="Category Asset"
              width={350}
              height={350}
            />
            <Image
              className="hidden absolute -bottom-8 right-48 w-48 lg:block"
              src={`/assets/img/category_${category}_2.png`}
              alt="Category Asset"
              width={350}
              height={350}
            />
            <h2
              className={`${newakeFont.className} text-3xl text-secondary font-bold`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <p className="text-primary">
              Immerse yourself in this journey of flavor
            </p>
          </div>
          <CategoryContent products={products} />
        </div>
      </main>
    </>
  );
};

export default Category;
