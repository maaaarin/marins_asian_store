import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Coupons = () => {
  var coupons = [];
  return (
    <div className="size-full overflow-auto flex flex-col items-center justify-center">
      <Image
        src={`/assets/img/cat_not_available.gif`}
        alt="Cat Asset"
        width={200}
        height={150}
        className="mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Not available yet!</h2>
      <span>Still working on it!</span>
    </div>
  );

  // return (
  //   <div className="size-full max-h-full flex flex-col gap-8 overflow-auto">
  //     <h2 className="text-2xl font-semibold">Coupons</h2>
  //     <ul className="w-full h-auto flex flex-col gap-3">
  //       {coupons?.map((coupon: any) => (
  //         <li
  //           key={coupon.id}
  //           className="w-full h-32 rounded-2xl border border-black p-6 flex items-center">
  //           <div className="size-full flex items-center gap-12">
  //             <div className="size-20 rounded-full bg-black flex-center">
  //               <span className="text-white text-lg">
  //                 {coupon.type == "%"
  //                   ? coupon.value + coupon.type
  //                   : coupon.value + " " + coupon.type}
  //               </span>
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="font-semibold">Code</span>
  //               <span>{coupon.code}</span>
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="font-semibold">Expiry</span>
  //               <span>{coupon.expiryTime}</span>
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="font-semibold">Category</span>
  //               <span>{coupon.category}</span>
  //             </div>
  //           </div>
  //           <Button className="ml-auto rounded-full bg-black text-white">
  //             Apply
  //           </Button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default Coupons;
