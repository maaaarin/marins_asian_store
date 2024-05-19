"use client";
import React, { useRef } from "react";
import { ProductCard } from "../Product/ProductCard";
import { Product } from "@/types";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@nextui-org/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);
type Props = {
  products: Product[];
};
const CategoryContent = ({ products }: Props) => {
  const productsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".product-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: { each: 0.1, from: "start", ease: "sine.out", yoyo: true },
        }
      );
    },
    { scope: productsRef }
  );

  return (
    <>
      <div className="w-full h-auto flex justify-between">
        <Button className="py-2 px-5 bg-white flex items-center gap-3 border border-slate-300 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
            />
          </svg>
          <span>Filters</span>
        </Button>
        <Button className="py-2 px-5 bg-white flex items-center gap-3 border border-slate-300 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16">
            <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5" />
          </svg>
          <span>Sort</span>
        </Button>
      </div>
      <div
        className="w-full grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4"
        ref={productsRef}>
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryContent;
