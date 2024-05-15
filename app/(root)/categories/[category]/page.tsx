import CategoryContent from "@/components/ui/Category/CategoryContent";
import { ProductCard } from "@/components/ui/Product/ProductCard";
import { getAllProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types";
import localFont from "next/font/local";
import React, { useRef } from "react";

// Font files
const newakeFont = localFont({
  src: "../../../../public/assets/fonts/NewakeFont.otf",
});

type Props = {
  params: { category: string };
};

const Category = async ({ params: { category } }: Props) => {
  // Product
  const products: Product[] = await getAllProducts();

  return (
    <>
      <main className="container mt-24">
        <div className="size-full flex flex-col gap-5">
          <div className="w-full h-52 bg-secondary rounded-3xl bg-[url('/assets/img/category.png')] bg-cover flex items-center justify-center flex-col">
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
