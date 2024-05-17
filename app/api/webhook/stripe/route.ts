import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  addUserOrder,
  createOrder,
  getOrder,
} from "@/lib/actions/order.actions";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Get the ID and type
    const eventType = event.type;

    // CREATE
    if (eventType === "checkout.session.completed") {
      const session = event.data.object;

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };

      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      };

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );

      const lineItems = await retrieveSession?.line_items?.data;

      const orderItems = lineItems?.map((item: any) => {
        return {
          productId: item.price.product.metadata.productId,
          name: item.price.product.name,
          picture: item.price.product.images[0],
          // price: (item.price.unit_amount / 100).toString(),
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
        };
      });

      const order = {
        stripeId: session.id,
        customer: customerInfo,
        items: orderItems,
        shippingAddress: shippingAddress,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        status: "Processing",
        createdAt: new Date(),
      };

      const newOrder = await createOrder(order);

      if (newOrder) {
        console.log(newOrder);
        const findOrder = await getOrder(session?.client_reference_id);
        const newUserOrder = await addUserOrder(
          findOrder._id,
          session?.client_reference_id
        );
      }

      // const newOrder = await createOrder(order)
      // return NextResponse.json({ message: 'OK', order: newOrder })
    }

    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
}
