import { Player } from "@lordicon/react";
import React, { useEffect, useRef } from "react";
import cartIcon from "@/public/assets/icons/cartToast.json";

const ItemAddedToast = () => {
  // Animated Icon
  const cartRef = useRef<Player>(null);

  useEffect(() => {
    cartRef.current?.playFromBeginning();
  }, []);

  return (
    <div className="container fixed bottom-8 flex justify-center z-50 animate-slide-in-blurred-bottom">
      <div className="w-fit h-16 bg-white border flex items-center gap-2 rounded-full p-2 animate-fade-out">
        <div className="size-12 bg-primary rounded-full flex items-center justify-center">
          <Player ref={cartRef} icon={cartIcon} size={32} />
        </div>
        <div className="pr-4 flex flex-col">
          <span className="text-xs">Good job!</span>
          <span className="text-sm">Product added to the cart!</span>
        </div>
      </div>
    </div>
  );
};

export default ItemAddedToast;
