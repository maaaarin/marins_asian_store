import Image from "next/image";
import React from "react";

export const SearchMenu = () => {
    return (
        <div className="w-full h-auto bg-white rounded-3xl px-8 py-10">
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
                                <span>Pocky Vanilla</span>
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
                                <span>Kit Kat Cheesecake</span>
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
                                <span>Gummy</span>
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
                                <span>Cheetos Flaming Hot</span>
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
                                <span>Spicy Ramen</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="w-9/12 h-auto flex flex-col gap-3">
                    <span className="text-xl font-bold">Recommended</span>
                    <div className="size-full flex gap-3">
                        <div
                            className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                            style={{ backgroundColor: "#CAE7FF" }}>
                            <Image
                                src={`/assets/products/1.webp`}
                                alt="alt"
                                width={150}
                                height={0}
                                className="w-4/5 aspect-square object-contain"
                            />
                            <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                5.25 €
                            </span>
                        </div>
                        <div
                            className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                            style={{ backgroundColor: "#FFCEE1" }}>
                            <Image
                                src={`/assets/products/2.webp`}
                                alt="alt"
                                width={150}
                                height={0}
                                className="w-4/5 aspect-square object-contain"
                            />
                            <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                5.25 €
                            </span>
                        </div>
                        <div
                            className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                            style={{ backgroundColor: "#FFAD5C" }}>
                            <Image
                                src={`/assets/products/3.webp`}
                                alt="alt"
                                width={150}
                                height={0}
                                className="w-4/5 aspect-square object-contain"
                            />
                            <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                5.25 €
                            </span>
                        </div>
                        <div
                            className="w-52 h-auto rounded-2xl flex p-3 items-center justify-center relative"
                            style={{ backgroundColor: "#8AC7FF" }}>
                            <Image
                                src={`/assets/products/4.webp`}
                                alt="alt"
                                width={150}
                                height={0}
                                className="w-4/5 aspect-square object-contain"
                            />
                            <span className="size-fit text-nowrap text-lg bg-black text-white rounded-full py-1 px-3 absolute bottom-3 right-3">
                                5.25 €
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
