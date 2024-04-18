"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player } from "@lordicon/react";
import { usePathname } from "next/navigation";

// Files
import couponIcon from "@/public/assets/icons/coupon.json";
import accountIcon from "@/public/assets/icons/profile.json";
import settingsIcon from "@/public/assets/icons/settings.json";
import wishlistIcon from "@/public/assets/icons/wishlist.json";
import ordersIcon from "@/public/assets/icons/orders.json";
import achievementsIcon from "@/public/assets/icons/achievements.json";
import clsx from "clsx";
import Link from "next/link";

export const UserFeatures = () => {
  const pathname = usePathname();
  const [featureActive, setFeatureActive] = useState("");

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

  return (
    <div className="w-full h-auto flex-grow bg-zinc-50 rounded-3xl p-3">
      <ul className="size-auto grid grid-cols-3 gap-2">
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
    </div>
  );
};
