import React from "react";
import styles from "./Home.module.scss";
import Image from "next/image";

export const Home = () => {
  return (
    <main className={`${styles.main} container mt-5`}>
      <div className={`${styles.bannersHeader} w-full flex justify-between`}>
        <div
          className={`${styles.bannerHeaderCornerLightYellow} bg-light-yellow rounded-t-2xl relative`}></div>
        <div
          className={`${styles.bannerHeaderCornerDarkBlue} bg-primary rounded-t-2xl relative`}></div>
      </div>
      <div className={`${styles.bannersMain} flex gap-5`}>
        <div className={`${styles.bannersFirstPanel} h-full flex flex-col`}>
          <div className="w-full h-4/6 bg-light-yellow text-2xl rounded-bl-3xl rounded-tr-3xl flex flex-col gap-5 justify-end p-8 relative">
            <Image
              src="/assets/img/snack_friday.svg"
              alt="Banner Image"
              width={0}
              height={0}
              className="w-64 h-auto"
            />
            <div className="flex gap-2 items-center">
              <span>Deals</span>
              <div className="bg-dark-blue rounded-full text-white px-3 py-2 text-xl">
                Up to 50%
              </div>
              <span>on All Store</span>
            </div>
            <button className="flex items-center bg-black rounded-full text-white w-fit px-6 py-1 gap-1">
              <span>Discover</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="size-12"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </button>
            <Image
              src="/assets/img/banner_main.png"
              alt="Banner Main"
              width={550}
              height={550}
              className="h-full aspect-square object-contain absolute right-0 -bottom-20 z-20"
            />
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
                  className={`${styles.bannerCornerLightYellow} size-full bg-dark-blue rounded-bl-3xl relative`}></div>
              </div>
              <div className="w-full h-2/4 flex gap-5">
                <div
                  className={`${styles.bannerSquareOrange} aspect-square mt-5`}>
                  <div
                    className={`${styles.bannerCornerOrange} size-full relative bg-orange rounded-r-3xl flex items-center justify-center`}>
                    <button className="w-2/3 aspect-square rounded-full bg-black flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="text-white w-3/4 h-3/4"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  className={`${styles.bannerCornerLightYellow} size-full relative bg-light-yellow rounded-b-3xl`}>
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
            src="/assets/img/banner_right.png"
            alt="Banner Product"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};
