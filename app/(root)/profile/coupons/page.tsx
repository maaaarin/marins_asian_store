import { Button } from "@nextui-org/react";
import React from "react";

const Coupons = () => {
  var coupons = [
    {
      id: 1,
      code: "AX15812N",
      value: 25,
      type: "%",
      expiryTime: "12h",
      category: "All",
    },
    {
      id: 2,
      code: "BX24873M",
      value: 15,
      type: "€",
      expiryTime: "24h",
      category: "Snacks",
    },
    {
      id: 3,
      code: "CX36985P",
      value: 30,
      type: "%",
      expiryTime: "48h",
      category: "Candy",
    },
    {
      id: 4,
      code: "DX47896Q",
      value: 10,
      type: "€",
      expiryTime: "24h",
      category: "Drink",
    },
  ];

  return (
    <div className="size-full max-h-full flex flex-col gap-8 overflow-auto">
      <h2 className="text-2xl font-semibold">Coupons</h2>
      <ul className="w-full h-auto flex flex-col gap-3">
        {coupons.map((coupon: any) => (
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
