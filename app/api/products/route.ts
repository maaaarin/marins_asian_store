import { mongoConnect } from "@/lib/database/connection";
import Product from "@/lib/database/models/product.model";
import { NextResponse } from "next/server";

export async function GET(){
  await mongoConnect()
  // return new NextResponse('connected');

  return NextResponse.json(await Product.find());;
 
  // const small = new Product({ name: 'dasd', description: 'dd', price: 123, color: 'dad', picture: 'dasd' });
  // await small.save();

}
