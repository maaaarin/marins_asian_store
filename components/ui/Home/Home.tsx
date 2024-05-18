import React from "react";
import styles from "./Home.module.scss";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const Home = () => {
  return (
    <main className="container mt-4">
      <div className={`${styles.bannersHeader} w-full flex justify-between`}>
        <div
          className={`${styles.bannerTopCornerSecondary} bg-pink-light rounded-t-2xl relative`}></div>
        <div
          className={`${styles.bannerTopCornerPrimary} bg-primary rounded-t-2xl relative`}></div>
      </div>
      <div className={`${styles.bannersMain} flex gap-5`}>
        <div className={`${styles.bannersFirstPanel} h-full flex flex-col`}>
          <div className="w-full h-4/6 bg-pink-light text-2xl rounded-bl-3xl rounded-tr-3xl flex  justify-end  relative">
            <div className="w-2/4 h-full flex flex-col justify-end gap-5 pb-8 pl-8">
              <Image
                src="/assets/img/snack_friday.svg"
                alt="Banner Image"
                width={0}
                height={0}
                className="w-64 h-auto"
              />
              <div className="flex gap-2 items-center">
                <span>Deals</span>
                <div className="bg-primary rounded-full text-white px-3 py-2 text-xl">
                  Up to 50%
                </div>
                <span>on All Store</span>
              </div>
              <Button
                size="lg"
                className="size-16 flex items-center bg-black rounded-full text-white w-fit px-6 py-1 gap-1">
                <span>Discover</span>
                <svg
                  fill="currentColor"
                  className="size-12"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                  />
                </svg>
              </Button>
            </div>
            {/* Banner Assets */}
            <div className="w-2/4 h-full relative z-10">
              <Image
                src="/assets/img/banner_character.png"
                alt="Banner Character"
                width={550}
                height={550}
                className="size-full object-contain absolute -bottom-16 animate-floating-4"
              />
              <Image
                src="/assets/img/banner_asset_1.png"
                alt="Banner Asset"
                width={256}
                height={256}
                className="size-52 object-contain absolute right-8 -bottom-40 animate-floating-6"
              />
              <Image
                src="/assets/img/banner_asset_2.png"
                alt="Banner Asset"
                width={256}
                height={256}
                className="size-44 object-contain absolute -left-14 -bottom-16 animate-floating-6"
              />
              <Image
                src="/assets/img/banner_asset_3.png"
                alt="Banner Asset"
                width={256}
                height={256}
                className="size-32 object-contain absolute -right-8 top-40 animate-floating-6"
              />
            </div>
            {/* Background Element */}
            <Image
              src="/assets/img/banner_bg_1.svg"
              alt="Banner Background"
              width={0}
              height={0}
              className="h-full w-auto absolute right-0 bottom-0"
            />
          </div>
          <div className="w-full h-2/6 flex">
            <div className="w-2/4 h-full pt-5">
              <div className="size-full bg-orange rounded-t-3xl rounded-bl-3xl flex overflow-hidden">
                <div className="w-2/4 flex flex-col gap-3 text-beige pl-8 py-8">
                  <span className="font-bold text-2xl text-nowrap">
                    Pocky is Back!
                  </span>
                  <p className="text-xl">Discover a new Pocky flavor.</p>
                </div>
                <div className="w-2/4 relative flex justify-center">
                  <Image
                    src="/assets/img/banner_item.png"
                    alt="Banner Main"
                    width={250}
                    height={0}
                    className="absolute w-2/4 h-auto -bottom-8 z-10 object-contain"
                  />
                  <Image
                    src="/assets/img/banner_mesh.svg"
                    alt="alt"
                    width={0}
                    height={0}
                    className="w-full absolute bottom-0 right-0"
                  />
                </div>
              </div>
            </div>
            <div className="w-2/4 flex flex-col">
              <div className="w-full h-2/4 pl-5">
                <div
                  className={`${styles.bannerCornerPrimary} size-full bg-primary rounded-bl-3xl relative`}></div>
              </div>
              <div className="w-full h-2/4 flex gap-5">
                <div
                  className={`${styles.bannerSquareOrange} aspect-square mt-5`}>
                  <div
                    className={`${styles.bannerCornerOrange} size-full relative bg-orange rounded-r-3xl flex items-center justify-center`}>
                    <Link href="/products/6648d166db8778d425d194bc">
                      <Button
                        isIconOnly
                        size="lg"
                        className="rounded-full bg-black flex-center text-white">
                        <svg
                          fill="currentColor"
                          className="size-full"
                          viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
                <div
                  className={`${styles.bannerCornerPrimary} size-full relative bg-pink-light rounded-b-3xl`}>
                  <Image
                    src="/assets/img/banner_bg_2.svg"
                    alt="Banner Background"
                    width={0}
                    height={0}
                    className="w-full h-auto absolute top-0 bottom-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.bannersSecondPanel} h-full rounded-b-3xl rounded-tl-3xl relative overflow-hidden`}>
          <Image
            src="/assets/img/second_banner.png"
            alt="Banner Product"
            fill
            className="object-cover"
          />
          <div className=" w-full h-auto absolute bottom-0 p-3">
            <div className="size-full bg-black rounded-xl flex flex-col justify-between p-4">
              <div className="w-full flex items-center justify-between ">
                <div className="flex flex-col text-white">
                  <span className="font-semibold text-xl">Kit Kat</span>
                  <span className="text-sm">Limited Edition</span>
                </div>
                <Link href="/products/6648d166db8778d425d194bd">
                  <Button
                    isIconOnly
                    className="bg-white rounded-full text-black flex-center">
                    <svg
                      fill="currentColor"
                      className="size-full"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
