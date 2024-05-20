import { Player } from "@lordicon/react";
import React from "react";

const ItemAddedToast = () => {
  return (
    <div className="container fixed bottom-8 flex justify-center z-50 animate-slide-in-blurred-bottom">
      <div className="w-fit h-16 bg-white border flex items-center gap-2 rounded-full p-2 animate-fade-out">
        <div className="size-12 bg-red-500 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 64 80"
            fill="currentColor"
            className="size-10 text-white">
            <path d="m54.07001,14.28998c-.26001,0-.52002.10004-.70001.28998L19.51001,48.44c-.19.19-.29999.45001-.29999.71997.00995.27002.12.52002.31.71002,3.54999,3.39996,7.54999,6.73999,11.88995,9.92999.17004.13.38.20001.59003.20001s.41998-.06.59003-.19c17.78998-13.10004,23.87994-24.07001,24.15997-24.59003,1.45001-3.14996,2.28003-6.22998,2.46002-9.14001.25-4.23999-1.36005-8.42999-4.42999-11.5-.19-.18994-.44-.28998-.71002-.28998Z" />
            <path d="m49.17999,12.57001l6.85999-6.86005c.39001-.38995.39001-1.02997,0-1.41998-.39996-.39001-1.02997-.39001-1.41998,0l-6.46002,6.46002c-.92999-.26001-1.88995-.41003-2.84998-.47003-7.27002-.45996-11.56,5.10004-13.31,8.04999-1.75-2.94995-6.06-8.46997-13.31-8.04999-8.01001.48999-14.38,7.73004-13.90002,15.81.17999,2.90002,1.01001,5.98004,2.49005,9.19.08997.15002,2.06995,3.76001,7.06995,9.29004l-8.06,8.06c-.38995.38995-.38995,1.01996,0,1.40997.19.20001.45001.28998.70001.28998.26001,0,.52002-.08997.71002-.28998l8.70001-8.70001L49.15997,12.58997l.02002-.01996Z" />
          </svg>
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
