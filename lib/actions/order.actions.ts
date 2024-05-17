"use server";
import { Cart, Order as OrderType } from "@/types";
import { stripe } from "@/lib/stripe";
import { mongoConnect } from "@/lib/database/connection";
import Order from "@/lib/database/models/order.model";
import User from "../database/models/user.model";

export const CheckoutOrder = async (cart: Cart) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["ES", "FR", "US"],
      },
      shipping_options: [{ shipping_rate: "shr_1PHSA6RoshnP0e8xJm1S2Ki5" }],
      line_items: cart.items.map((cartItem: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: cartItem.product.name,
            images: [cartItem.product.picture],
            metadata: {
              productId: cartItem.product._id,
              ...(cartItem.product._id && { productId: cartItem.product._id }),
              ...(cartItem.product.picture && {
                picture: cartItem.product.picture,
              }),
            },
          },
          unit_amount: cartItem.product.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: cart.userClerkId,
      success_url: `${process.env.MARINS_URL}/checkout/success`,
      cancel_url: `${process.env.MARINS_URL}/`,
    });

    return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order: OrderType) => {
  try {
    await mongoConnect();

    console.log("antes de la orden");
    console.log(order);
    const newOrder = await Order.create({
      ...order,
      status: order.status,
      stripeId: order.stripeId,
      totalAmount: order.totalAmount,
      customer: { clerkId: order.customer.clerkId },
    });

    console.log("newOrder");
    console.log(newOrder);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (userId: string | null | undefined) => {
  try {
    await mongoConnect();
    const findOrder = await Order.findOne({ "customer.clerkId": userId });
    return JSON.parse(JSON.stringify(findOrder));
  } catch (error) {
    console.log(error);
  }
};

export const addUserOrder = async (
  orderId: string | null | undefined,
  userId: string | null | undefined
) => {
  try {
    await mongoConnect();

    const newUserOrder = await User.updateOne(
      { clerkId: userId },
      {
        $push: {
          orders: orderId,
        },
      }
    );
    return JSON.parse(JSON.stringify(newUserOrder));
  } catch (error) {
    console.log(error);
  }
};
