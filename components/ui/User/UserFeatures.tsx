"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player } from "@lordicon/react";
import { usePathname, useRouter } from "next/navigation";

// Files
import couponIcon from "@/public/assets/icons/coupon.json";
import accountIcon from "@/public/assets/icons/profile.json";
import settingsIcon from "@/public/assets/icons/settings.json";
import wishlistIcon from "@/public/assets/icons/wishlist.json";
import ordersIcon from "@/public/assets/icons/orders.json";
import achievementsIcon from "@/public/assets/icons/achievements.json";
import clsx from "clsx";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { resetCart } from "@/lib/store/slices/cart.slice";

export const UserFeatures = () => {
  const pathname = usePathname();
  const [featureActive, setFeatureActive] = useState("");
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const router = useRouter();
  // Animated icons
  const couponRef = useRef<Player>(null),
    accountRef = useRef<Player>(null),
    settingsRef = useRef<Player>(null),
    wishlistRef = useRef<Player>(null),
    ordersRef = useRef<Player>(null),
    achievementsRef = useRef<Player>(null);

  function handleFeature(
    iconRef: React.RefObject<Player>,
    featureName: string
  ) {
    setFeatureActive(featureName);
    // Icon Animation
    let iconAnimation = iconRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  useEffect(() => {
    let pathFeatureActive = pathname.replace("/profile/", "");
    setFeatureActive(pathFeatureActive);
  }, [pathname]);

  var featuresList = [
    {
      id: "account",
      name: "Account",
      ref: accountRef,
      icon: accountIcon,
    },
    {
      id: "orders",
      name: "Orders",
      ref: ordersRef,
      icon: ordersIcon,
    },
    {
      id: "wishlist",
      name: "Wishlist",
      ref: wishlistRef,
      icon: wishlistIcon,
    },
    {
      id: "achievements",
      name: "Achievements",
      ref: achievementsRef,
      icon: achievementsIcon,
    },
    {
      id: "coupons",
      name: "Coupons",
      ref: couponRef,
      icon: couponIcon,
    },
    {
      id: "settings",
      name: "Settings",
      ref: settingsRef,
      icon: settingsIcon,
    },
  ];

  function handleSingOut() {
    dispatch(resetCart());
    router.push("/");
    signOut();
  }

  return (
    <div className="w-full h-auto flex-grow bg-zinc-50 rounded-3xl p-3">
      <ul className="size-auto grid grid-cols-2 lg:grid-cols-3 gap-2">
        {featuresList.map((feature) => {
          let featureLink = feature.name.toLowerCase();
          return (
            <Link key={feature.name} href={`/profile/${featureLink}`}>
              <li
                className={clsx(
                  "w-full aspect-square  rounded-2xl flex-center flex-col gap-1",
                  {
                    "bg-blue-100 border border-primary":
                      featureActive == feature.id,
                  },
                  { "bg-zinc-100": featureActive !== feature.id }
                )}
                onClick={() => {
                  handleFeature(feature.ref, feature.id);
                }}>
                <Player ref={feature.ref} icon={feature.icon} size={36} />
                <span className="text-sm">{feature.name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
      <div
        className="flex justify-center gap-2 items-center rounded-2xl mt-2 px-4 py-2 bg-zinc-100 text-black lg:hidden"
        onClick={handleSingOut}>
        <svg fill="currentColor" className="size-5 " viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
          />
          <path
            fillRule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
          />
        </svg>
        <span className="text-zinc-500">Sign Out</span>
      </div>
    </div>
  );
};
