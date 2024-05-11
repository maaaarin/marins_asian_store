import React from "react";
import styles from "./Cart.module.scss";
import Image from "next/image";

const CartEmpty = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-20">
      <Image
        src="https://i.imgur.com/ZPt1o1j.gif"
        alt="Cat GIF"
        width={150}
        height={150}
      />
      <span>Nothing yet here!</span>
      <span className="text-gray-400">(Zzzz)</span>
    </div>
  );
};

export default CartEmpty;
