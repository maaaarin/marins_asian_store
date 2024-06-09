import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Coupons = () => {
  var coupons = [
    {
      id: 1,
      code: "AX15812N",
      value: 2,
      type: "€",
      expiryTime: "1d",
      category: "Candy",
    },
  ];

  return (
    <div className="size-full max-h-full flex flex-col gap-8 overflow-auto">
      <h2 className="text-2xl font-semibold">Coupons</h2>
      <ul className="w-full h-auto flex flex-col gap-3">
        {coupons?.map((coupon: any) => (
          <li
            key={coupon.id}
            className="w-full h-32 rounded-2xl border border-black p-6 flex items-center">
            <div className="size-full flex items-center gap-12">
              <div className="size-20 rounded-full bg-black flex-center">
                <span className="text-white text-lg">
                  {coupon.type == "%"
                    ? coupon.value + coupon.type
                    : coupon.value + " " + coupon.type}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Code</span>
                <span>{coupon.code}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Expiry</span>
                <span>{coupon.expiryTime}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Category</span>
                <span>{coupon.category}</span>
              </div>
            </div>
            <Button className="ml-auto rounded-full bg-black text-white">
              Apply
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coupons;
