import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const SearchMenu = () => {
  const pathname = usePathname();

  const recommendedProducts = [
    {
      _id: "6648ebfadb8778d425dd49fc",
      name: "Frito-Lay Cheetos - Cheddar Cheese & Jalapeño",
      description:
        "Indulge in the delicious combination of cheddar cheese and jalapeño flavor with these crunchy corn puff snacks from Frito-Lay!",
      price: 3.99,
      color: "#468664",
      picture: "https://i.imgur.com/ARKjRzw.png",
    },
    {
      _id: "6648ebfadb8778d425dd49fd",
      name: "Nobel Studio UG x Chibi Soda Candy",
      description:
        "Enjoy these delicious soda-flavored candies, created in collaboration between Nobel Studio UG and Chibi. Each candy is packed with a bubbly flavor that you'll love.",
      price: 2.99,
      color: "#87CEEB",
      picture: "https://i.imgur.com/qsqJ3qj.png",
    },
    {
      _id: "6648ebfadb8778d425dd49ff",
      name: "Sanrio Characters Summer Fruit Jelly",
      description:
        "Enjoy the refreshing taste of summer with Sanrio Characters Summer Fruit Jelly. Each jelly cup features your favorite Sanrio characters and is packed with a fruity flavor that's perfect for hot days.",
      price: 4.99,
      color: "#F8C7E5",
      picture: "https://i.imgur.com/6iUZNJv.png",
    },
    {
      _id: "6648ebfadb8778d425dd4a00",
      name: "Lotte Fit's Funyan Gum - Mixed Berry",
      description:
        "Enjoy the burst of mixed berry flavor with Lotte Fit's Funyan Gum. These sugar-free gums are perfect for freshening your breath and satisfying your sweet cravings.",
      price: 2.49,
      color: "#FF1493",
      picture: "https://i.imgur.com/xwyGwYt.png",
    },
  ];

  return (
    <div className="w-full h-auto bg-white rounded-3xl px-8 py-10 pointer-events-auto">
      <div className="w-full h-auto flex gap-3">
        <div className="w-1/4 flex flex-col gap-3 ">
          <span className="text-xl font-bold pl-4">Popular Search</span>
          <ul className="flex flex-col gap-1 w-full ">
            <li>
              <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
                <Link href={`${pathname}?query=Fujiya+Fruitsicle+Gummy`}>
                  <span>Fujiya Fruitsicle Gummy</span>
                </Link>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
                <Link href={`${pathname}?query=Lotte+Fit%27s+Funyan+Gum`}>
                  <span>Lotte Fit&apos;s Funyan Gum</span>
                </Link>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
                <Link href={`${pathname}?query=Takoyaki+DIY+Candy`}>
                  <span>Takoyaki DIY Candy</span>
                </Link>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
                <Link href={`${pathname}?query=Butamen+Instant+Ramen`}>
                  <span>Butamen Instant Ramen</span>
                </Link>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full rounded-xl gap-3 py-2 px-4 hover:bg-slate-100 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
                <Link href={`${pathname}?query=Cheetos+-+Barbecue`}>
                  <span>Cheetos - Barbecue</span>
                </Link>
              </button>
            </li>
          </ul>
        </div>
        <div className="w-9/12 h-auto flex flex-col gap-3">
          <span className="text-xl font-bold">Recommended</span>
          <div className="size-full flex gap-3">
            {recommendedProducts.map((product: any, key: number) => (
              <Link href={`/products/${product._id}`} key={key}>
                <div
                  className="flex-1 min-w-32 max-w-52 aspect-square rounded-2xl flex p-3 items-center justify-center relative"
                  style={{ backgroundColor: product.color }}>
                  <Image
                    src={product.picture}
                    alt="alt"
                    width={150}
                    height={0}
                    className="w-4/5 aspect-square object-contain"
                  />
                  <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                    {product.price} €
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
