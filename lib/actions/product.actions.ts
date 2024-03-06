'use server'

import { mongoConnect } from "@/lib/database/connection";
import Product from "@/lib/database/models/product.model";

export async function getAllProducts({ query }: { query?: string }) {
    try {
        // Conectar a la base de datos
        await mongoConnect();

        const productName = query ? { name: { $regex: query, $options: 'i' }} : {};

        const filters = {
            $and: [productName]
        }

        // Buscar los productos
        const products = await Product.find(filters);

        return JSON.parse(JSON.stringify(products));

    } catch (error) {
        console.log(error);
    }
}
