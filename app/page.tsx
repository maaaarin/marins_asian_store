// Components
import { Home } from "../components/Home/Home";
import { Product } from "../components/Product/Product";

export default async function App({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const searchQuery = (searchParams?.query as string) || "cheetos";

  return (
    <>
      <Home />
      <div className="container flex flex-col mt-10 gap-6">
        <h2 className="text-3xl font-bold">New at Marín’s!</h2>
        <div className="flex gap-4">{/* Products */}</div>
      </div>
    </>
  );
}
