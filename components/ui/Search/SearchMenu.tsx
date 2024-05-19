import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./Search.module.scss";

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

  const popularSearchs = [
    {
      query: "Fujiya+Fruitsicle+Gummy",
      title: "Fujiya Fruitsicle Gummy",
    },
    {
      query: "Takoyaki+DIY+Candy",
      title: "Takoyaki DIY Candy",
    },
    {
      query: "Lotte+Fit%27s+Funyan+Gum",
      title: "Lotte Fit&apos;s Funyan Gum",
    },
    {
      query: "Butamen+Instant+Ramen",
      title: "Butamen Instant Ramen",
    },
    {
      query: "Cheetos+-+Barbecue",
      title: "Cheetos - Barbecue",
    },
  ];

  return (
    <div className="w-full h-auto bg-white rounded-3xl px-8 py-10 pointer-events-auto">
      <div className="flex-col lg:flex-row w-full h-auto flex gap-3">
        <div className="w-full lg:w-1/4 flex flex-col gap-3 ">
          <span className="text-xl font-bold lg:pl-4">Popular Search</span>
          <ul className="flex flex-col gap-1 w-full ">
            {popularSearchs.map((search) => (
              <li>
                <button className="flex items-center w-full rounded-xl gap-3 p-2 hover:bg-slate-100 duration-500 lg:py-2 lg:px-4">
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
                  <Link href={`${pathname}?query=${search.query}`}>
                    <span>{search.title}</span>
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full overflow-hidden lg:w-9/12 h-auto flex flex-col gap-3">
          <span className="text-xl font-bold">Recommended</span>
          <div
            className={`${styles.searchRecommendations} size-full overflow-x-scroll flex gap-3 rounded-2xl lg:overflow-auto`}>
            {recommendedProducts.map((product: any, key: number) => (
              <Link href={`/products/${product._id}`} key={key}>
                <div
                  className="flex-1 min-w-52 aspect-square rounded-2xl flex p-3 items-center justify-center relative lg:min-w-32 lg:max-width-52"
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
