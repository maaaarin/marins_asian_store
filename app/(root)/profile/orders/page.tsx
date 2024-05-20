import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getAllOrders } from "@/lib/actions/order.actions";
import { Order, OrderItem } from "@/types";
import { compareAsc, format } from "date-fns";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getAllOrders(userId);

  if (!orders.length) {
    return (
      <div className="size-full overflow-auto flex flex-col items-center justify-center">
        <Image
          src={`/assets/img/cat_not_found.gif`}
          alt="Cat Asset"
          width={200}
          height={150}
        />
        <h2 className="text-xl font-semibold mb-2">No orders yet!</h2>
        <span>Go and get something delicious!</span>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-center lg:text-left">
        Orders
      </h2>
      <ul className="w-full h-auto flex flex-col gap-3">
        {/* Orders */}
        {orders?.map((order: Order, key: number) => (
          <li key={key} className="w-full h-auto bg-zinc-100  rounded-b-xl">
            <div className="w-full h-auto bg-white border border-black rounded-xl flex justify-between items-center p-3 lg:p-0 lg:pl-4 lg:pr-3 lg:py-3 flex-col lg:flex-row">
              <div className="w-full flex h-full lg:gap-3 items-center justify-center mb-4 bg-primary lg:justify-normal rounded-full lg:rounded-none lg:bg-transparent lg:w-auto lg:mb-0">
                <div className="size-16 aspect-square rounded-full bg-primary flex-center p-3">
                  <svg
                    className="size-full text-white"
                    viewBox="0 0 64 64"
                    fill="currentColor">
                    <g>
                      <path d="M33.65,32.5c-0.3,0.18-0.49,0.52-0.49,0.87l-0.15,27.62l24.48-13.83C57.8,46.98,58,46.64,58,46.28V18.2L33.65,32.5z" />
                      <path d="M23.74,36.59c0,0.42-0.26,0.8-0.65,0.95c-0.12,0.04-0.23,0.06-0.35,0.06c-0.29,0-0.57-0.12-0.76-0.35l-4.07-4.81   l-3.21,0.75c-0.3,0.07-0.61,0-0.85-0.19s-0.38-0.49-0.38-0.79v-9.29L6,19.06v27.22c0,0.36,0.2,0.7,0.51,0.88L31.01,61l0.15-27.64   c0-0.18,0.02-0.35,0.05-0.53l-7.47-4.16V36.59z M9.75,40.05c0.27-0.49,0.88-0.66,1.36-0.38l3.24,1.83   c0.49,0.27,0.66,0.89,0.39,1.38c-0.18,0.33-0.52,0.53-0.88,0.53c-0.16,0-0.33-0.05-0.48-0.13l-3.25-1.83   C9.65,41.16,9.48,40.54,9.75,40.05z M17.57,49.2c-0.18,0.33-0.52,0.52-0.87,0.52c-0.17,0-0.34-0.04-0.49-0.12l-6.73-3.8   C9,45.52,8.83,44.9,9.1,44.42c0.27-0.49,0.87-0.66,1.36-0.38l6.72,3.79C17.67,48.1,17.84,48.72,17.57,49.2z" />
                      <path d="M48.64,12.26l-23.9,14.67l7.47,4.15c0.14-0.12,0.28-0.23,0.44-0.32l23.9-14.03L48.64,12.26z" />
                      <path d="M15.47,30.93l2.58-0.6c0.36-0.08,0.74,0.04,0.98,0.32l2.71,3.2v-6.88c0-0.35,0.18-0.69,0.48-0.87l24.42-14.98L41.11,8   L15.47,22.89V30.93z" />
                      <path d="M39.08,6.85l-6.59-3.72C32.33,3.04,32.17,3,32,3c-0.17,0-0.33,0.04-0.49,0.13L6.71,17.14l7.73,4.01L39.08,6.85z" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col text-white lg:text-black">
                  <span className="text-sm font-semibold">Status</span>
                  <span>{order.status}</span>
                </div>
              </div>
              <ul className="h-full grid  gap-x-8 gap-y-4 grid-flow-col-dense">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold">Total</span>
                  <span>{order.totalAmount} €</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold">Placed At</span>
                  <span>{format(order.createdAt, "dd/MM/yyyy")}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold">Shipped to</span>
                  <span>
                    {order.shippingAddress.street +
                      ", " +
                      order.shippingAddress.city}
                  </span>
                </li>
              </ul>
              <div className="hidden h-full  flex-col justify-between items-end gap-2 lg:flex">
                <span className="text-zinc-400 text-sm">
                  Nº {order.stripeId.slice(8, 16).toUpperCase()}
                </span>
                <div className="flex gap-1">
                  <Button
                    isIconOnly
                    aria-label="Report Incident"
                    className="rounded-lg bg-red-500">
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
            <div className="w-full h-40 flex gap-8 overflow-y-hidden overflow-x-scroll p-8 items-center">
              {order.items!.map((item: any, key: number) => (
                <div key={key} className="relative">
                  <Image
                    src={item.picture}
                    alt="Product Image"
                    width={250}
                    height={250}
                    className="w-auto h-28 aspect-square object-contain"
                  />
                  {item.quantity > 1 && (
                    <span className="absolute size-8 rounded-full bg-black text-white text-sm flex-center outline outline-4 outline-zinc-100 bottom-0 right-3">
                      {item.quantity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
