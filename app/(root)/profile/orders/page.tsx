import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Orders = () => {
  var orderShipping = {
    id: "AZB19529ZNCIW",
    userId: 1,
    products: [
      {
        id: 1,
        name: "Cheetos 1",
        price: 15.4,
        quantity: 1,
        picture: "https://i.imgur.com/QwNuFC9.png",
      },
      {
        id: 1,
        name: "Cheetos 2",
        price: 15.4,
        quantity: 1,
        picture: "https://i.imgur.com/fcFnQrz.png",
      },
      {
        id: 1,
        name: "Cheetos 3",
        price: 15.4,
        quantity: 1,
        picture: "https://i.imgur.com/Nt6nTJ1.png",
      },
      {
        id: 1,
        name: "Cheetos 4",
        price: 15.4,
        quantity: 2,
        picture: "https://i.imgur.com/09cjL3o.png",
      },
    ],
    status: "Shipping",
    total: 15.4,
    placedAt: "02/02/24",
    deliveredAt: "02/02/24",
    address: {
      name: "Home",
      address_1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
    },
  };

  var orderDelivered = {
    id: "AZB19529ZNCIW",
    userId: 1,
    products: [
      {
        id: 1,
        name: "Cheetos 1",
        price: 15.4,
        quantity: 4,
        picture: "https://i.imgur.com/wAFNYcJ.png",
      },
      {
        id: 1,
        name: "Cheetos 2",
        price: 15.4,
        quantity: 1,
        picture: "https://i.imgur.com/2chtIZL.png",
      },
    ],
    status: "shipping",
    total: 15.4,
    placedAt: "02/02/24",
    deliveredAt: "02/02/24",
    address: {
      name: "Home",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
    },
  };

  return (
    <div className="size-full flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <ul className="w-full h-auto flex flex-col gap-4">
        {/* Orders */}
        <li className="w-full h-auto bg-zinc-100  rounded-b-xl">
          <div className="w-full h-auto bg-white border border-black rounded-xl flex justify-between items-center pl-4 pr-3 py-3">
            <ul className="h-full flex gap-8 items-center">
              <li className="flex h-full gap-3 items-center">
                <div className="size-16 aspect-square rounded-full bg-blue-200 flex-center p-4">
                  <svg
                    viewBox="0 0 32 32"
                    className="size-full"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2">
                    <path d="M10,13c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-7.998,0c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1l7.998,0c0.552,-0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-5,0l0,-0c0,-1.105 0.895,-2 2,-2c3.414,0 10.586,0 14,0c1.105,-0 2,0.895 2,2l0,12.125c0.32,-0.082 0.655,-0.126 1,-0.126c0.345,-0 0.68,0.044 1,0.126l0,-9.125l2,0c0.315,-0 0.611,0.148 0.8,0.4l3,4c0.13,0.173 0.2,0.384 0.2,0.6l0,6c-0,1.105 -0.895,2 -2,2l-1,-0c0,2.207 -1.792,4 -4,4c-2.207,0 -4,-1.792 -4,-4l-5,-0c-0,2.208 -1.793,4 -4,4c-2.207,0 -4,-1.792 -4,-4c-1.105,0 -2,-0.895 -2,-2l0,-2l-0.998,0c-0.552,-0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1l5.998,0c0.552,-0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-6.998,0c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1l6.998,0Zm14,7.999c1.104,-0 2,0.896 2,2c0,1.105 -0.896,2.001 -2,2.001c-1.104,-0 -2,-0.896 -2,-2.001c0,-1.104 0.896,-2 2,-2Zm-13,-0c1.104,-0 2,0.896 2,2c0,1.105 -0.896,2.001 -2,2.001c-1.104,-0 -2,-0.896 -2,-2.001c0,-1.104 0.896,-2 2,-2Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Status</span>
                  <span>{orderShipping.status}</span>
                </div>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Total</span>
                <span>{orderShipping.total} €</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Placed At</span>
                <span>{orderShipping.placedAt}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Shipped to</span>
                <span>{orderShipping.address.name}</span>
              </li>
            </ul>
            <div className="h-full flex flex-col justify-between items-end gap-2">
              <span className="text-zinc-400 text-sm">
                Order Nº {orderShipping.id}
              </span>
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  aria-label="Report Incident"
                  className="rounded-lg bg-red-400">
                  <svg
                    className="size-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </Button>
                <Button
                  isIconOnly
                  aria-label="Inform"
                  className="rounded-lg bg-black">
                  <svg
                    className="size-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-40 flex gap-8 p-8 items-center">
            {orderShipping.products.map((product: any) => (
              <div key={product.id} className="relative">
                <Image
                  src={product.picture}
                  alt="Product Image"
                  width={96}
                  height={96}
                  className="size-16 h-auto"
                />
                {product.quantity > 1 && (
                  <span className="absolute size-6 rounded-full bg-black text-white text-sm flex-center outline outline-4 outline-zinc-100 bottom-0 right-0">
                    {product.quantity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </li>
        <li className="w-full h-auto bg-zinc-100  rounded-b-xl">
          <div className="w-full h-auto bg-white border border-black rounded-xl flex justify-between items-center pl-4 pr-3 py-3">
            <ul className="h-full flex gap-8 items-center">
              <li className="h-full flex gap-3 items-center">
                <div className="size-16 aspect-square rounded-full bg-black flex-center p-4">
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="size-full text-white">
                    <path d="M13.29,6.29l-.29.3V2h6V6.59l-.29-.3a1,1,0,0,0-1.42,0L16,7.59l-1.29-1.3a1,1,0,0,0-1.42,0ZM26,2H21V9a1,1,0,0,1-.62.92A.84.84,0,0,1,20,10a1,1,0,0,1-.71-.29L18,8.41l-1.29,1.3a1,1,0,0,1-1.42,0L14,8.41l-1.29,1.3a1,1,0,0,1-1.09.21A1,1,0,0,1,11,9V2H6A4,4,0,0,0,2,6V26a4,4,0,0,0,4,4H16A10,10,0,1,1,30,16V6A4,4,0,0,0,26,2Zm4,20a8,8,0,1,1-8-8A8,8,0,0,1,30,22Zm-4.29-2.71a1,1,0,0,0-1.42,0L21,22.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,25.71,19.29Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Status</span>
                  <span>{orderDelivered.status}</span>
                </div>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Total</span>
                <span>{orderDelivered.total} €</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Placed At</span>
                <span>{orderDelivered.placedAt}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm font-semibold">Shipped to</span>
                <span>{orderDelivered.address.name}</span>
              </li>
            </ul>
            <div className="h-full flex flex-col justify-between items-end gap-2">
              <span className="text-zinc-400 text-sm">
                Order Nº {orderDelivered.id}
              </span>
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  aria-label="Report Incident"
                  className="rounded-lg bg-red-400">
                  <svg
                    className="size-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </Button>
                <Button
                  isIconOnly
                  aria-label="Inform"
                  className="rounded-lg bg-black">
                  <svg
                    className="size-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-40 flex gap-8 p-8 items-center">
            {orderDelivered.products.map((product: any) => (
              <div key={product.id} className="relative">
                <Image
                  src={product.picture}
                  alt="Product Image"
                  width={96}
                  height={96}
                  className="size-16 h-auto"
                />
                {product.quantity > 1 && (
                  <span className="absolute size-6 rounded-full bg-black text-white text-sm flex-center outline outline-4 outline-zinc-100 bottom-0 right-0">
                    {product.quantity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Orders;
