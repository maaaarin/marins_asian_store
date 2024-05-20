import { AddItemButton } from "@/components/widgets/AddItemButton";
import { AddWishlistButton } from "@/components/widgets/AddWishlistButton";
import { getWishlist } from "@/lib/actions/wishlist.actions";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Wishlist = async () => {
  const { userId } = auth();
  const wishlist = await getWishlist(userId);
  console.log(wishlist);

  if (!wishlist.length) {
    return (
      <div className="size-full overflow-auto flex flex-col items-center justify-center">
        <Image
          src={`/assets/img/cat_not_found.gif`}
          alt="Cat Asset"
          width={200}
          height={150}
        />
        <h2 className="text-xl font-semibold mb-2">
          No wishlist products yet!
        </h2>
        <span>Explore and add some!</span>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-center lg:text-left">
        Wishlist
      </h2>
      <ul className="w-full h-auto grid grid-cols-2 lg:grid-cols-1 gap-3">
        {/* Wishlist */}
        {wishlist?.map((product: Product, key: number) => (
          <li
            key={key}
            className="w-full h-auto rounded-xl flex flex-col items-center gap-4 border relative p-4 lg:rounded-2xl lg:h-32 lg:py-4 lg:px-8 lg:flex-row lg:gap-8">
            <Link href={`/products/${product._id}`}>
              <div className="w-auto h-full flex-center relative">
                <div
                  className="size-24  rounded-full"
                  style={{ background: product.color }}></div>
                <Image
                  src={product.picture}
                  alt="Wishlist Item Picture"
                  width={150}
                  height={150}
                  className="w-auto max-w-[6/12] h-full z-10 absolute"
                />
              </div>
            </Link>
            <div className="flex-grow h-full flex flex-col justify-center items-center gap-2 lg:items-start">
              <span className="line-clamp-2">{product.name}</span>
              <div className="flex gap-2">
                <span className="size-fit text-nowrap  bg-black text-white rounded-full py-1 px-3">
                  {product.price.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="w-auto h-full flex items-center gap-5">
              <AddWishlistButton productId={product._id} type="wishlist" />
              <AddItemButton product={product} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
