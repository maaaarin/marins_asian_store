import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clearCart } from "@/lib/actions/cart.actions";

const OrderSuccessPage = async () => {
  // Clear cart
  const { userId } = auth();
  const clearUserCart = await clearCart(userId);

  return (
    <main className="container mt-24 flex align-items-center justify-center">
      <div className="w-auto h-[60vh] border rounded-3xl flex flex-col items-center py-12 px-24 gap-5">
        <h1 className="text-2xl font-semibold">Thank you!</h1>
        <div className="w-48 aspect-square rounded-full bg-zinc-100 relative flex justify-center my-6">
          <Image
            src="/assets/img/cat_order_success.gif"
            alt="Cat Happy!"
            width={250}
            height={200}
          />
          <div className="size-12 rounded-full absolute bg-secondary -bottom-6 mx-auto flex items-center justify-center p-2">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              className="size-full text-white">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
            </svg>
          </div>
        </div>
        <h2>Your order has been placed!</h2>
        <Link href={"/profile/orders"}>
          <Button size="lg" className="bg-primary text-white rounded-full">
            View Orders
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
