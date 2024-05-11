import { AddItemCardButton } from "@/components/widgets/AddItemCardButton";
import { AddWishlistCardButton } from "@/components/widgets/AddWishlistCardButton";
import { getWishlist } from "@/lib/actions/wishlist.actions";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

const Wishlist = async () => {
  const { userId } = auth();
  const wishlist = await getWishlist(userId);

  return (
    <div className="size-full overflow-auto flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Wishlist</h2>
      <ul className="w-full h-auto flex flex-col gap-3">
        {/* Wishlist */}
        {wishlist?.map((product: Product, key: any) => (
          <li
            key={key}
            className="w-full h-32 rounded-2xl flex items-center gap-8 border  relative py-4 px-8">
            <div className="w-auto h-full flex-center relative">
              <div
                className="size-24  rounded-full"
                style={{ background: product.color }}></div>
              <Image
                src={product.picture}
                alt="Wishlist Item Picture"
                width={96}
                height={96}
                className="w-auto max-w-[6/12] h-full z-10 absolute"
              />
            </div>
            <div className="w-auto h-full flex flex-col justify-center items-start gap-2">
              <span className="line-clamp-2">{product.name}</span>
              <div className="flex gap-2">
                <span className="size-fit text-nowrap  bg-black text-white rounded-full py-1 px-3">
                  {product.price.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="absolute right-8 flex items-center gap-5">
              <AddWishlistCardButton
                productId={product._id}
                alreadyAdded={true}
              />
              <AddItemCardButton product={null} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
