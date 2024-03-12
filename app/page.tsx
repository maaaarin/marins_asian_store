
// Actions
import { getLatestProducts } from "@/lib/actions/product.actions";

// Components
import { Home } from "../components/Home/Home";
import { Product } from "../components/Product/Product";

export default async function App() {

  // Latest Products
  const latestProducts = await getLatestProducts({
    limit: 4
  })

  return (
    <>
      <Home />
      <div className="container flex flex-col mt-10 gap-6">
        <h2 className="text-3xl font-bold">New at Marín’s!</h2>
        <div className="flex gap-4">
        {latestProducts.map((product: any) => (
              <Product key={product._id} name={product.name} price={product.price} color={product.color} picture={product.picture} />
            ))}
        </div>
      </div>
    </>
  );
}
