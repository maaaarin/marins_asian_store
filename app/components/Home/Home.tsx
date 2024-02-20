import React from "react";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <main className={`${styles.main} container`}>
      {/* <div className={`${styles.bannersHeader} flex justify-between mt-5`}>
        <div className=" bg-light-yellow rounded-t-2xl"></div>
        <div className=" bg-primary rounded-t-2xl"></div>
      </div> */}
      <div className={`${styles.bannersMain} mt-24`}>
        <div className={`${styles.bannersFirstPanel} flex flex-col`}>
          <div className="w-full h-96 bg-light-yellow rounded-2xl"></div>
          <div className="w-full h-1/3 flex">
            <div className="w-2/4 h-full pt-5">
              <div className="w-full h-full bg-orange rounded-t-2xl rounded-bl-2xl"></div>
            </div>
            <div className="w-2/4 flex flex-col">
              <div className="w-full h-2/4 pl-5">
                <div className="size-full bg-light-yellow rounded-bl-2xl"></div>
              </div>
              <div className="w-full h-2/4 flex gap-5">
                <div className="h-full aspect-square pt-5">
                  <div className="size-full bg-orange rounded-r-2xl"></div>
                </div>
                <div className="size-full bg-light-yellow rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.bannersSecondPanel} bg-primary rounded-2xl`}></div>
      </div>
    </main>
  );
};
