import Image from "next/image";
import React, { useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Player } from "@lordicon/react";
import Link from "next/link";

// Files
import couponIcon from "@/public/assets/icons/coupon.json";
import accountIcon from "@/public/assets/icons/profile.json";
import settingsIcon from "@/public/assets/icons/settings.json";
import wishlistIcon from "@/public/assets/icons/wishlist.json";
import ordersIcon from "@/public/assets/icons/orders.json";
import achievementsIcon from "@/public/assets/icons/achievements.json";
import { useDispatch } from "react-redux";
import { resetCart } from "@/lib/store/slices/cart.slice";

export const UserMenu = () => {
  const { isLoaded, isSignedIn, user } = useUser();
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

  function iconAnimation(iconRef: React.RefObject<Player>) {
    let iconAnimation = iconRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  var featuresList = [
    {
      name: "Account",
      ref: accountRef,
      icon: accountIcon,
    },
    {
      name: "Orders",
      ref: ordersRef,
      icon: ordersIcon,
    },
    {
      name: "Wishlist",
      ref: wishlistRef,
      icon: wishlistIcon,
    },
    {
      name: "Achievements",
      ref: achievementsRef,
      icon: achievementsIcon,
    },
    {
      name: "Coupons",
      ref: couponRef,
      icon: couponIcon,
    },
    {
      name: "Settings",
      ref: settingsRef,
      icon: settingsIcon,
    },
  ];

  function handleSingOut() {
    dispatch(resetCart());
    router.push("/");
  }

  return (
    <div className="size-auto bg-white rounded-3xl  flex flex-col pointer-events-auto">
      <div className="w-full h-auto">
        <div className="size-full flex-center gap-3 rounded-xl px-4 py-6 bg-cover bg-center profile-pattern">
          <div className="size-14 flex justify-center relative">
            <Image
              src={user?.imageUrl || ""}
              alt="alt"
              width={96}
              height={96}
              className="size-full rounded-full border-2 border-primary object-cover"
            />
            <span className="absolute -bottom-2 w-fit px-2 py-1 text-xs bg-secondary text-white rounded-full">
              Lvl. 1
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium text-xl drop-shadow-sm">
              {user?.firstName?.concat(" ", user?.lastName || "")}
            </span>
            <span className="text-xs bg-zinc-600 rounded-full px-3 py-1 text-white">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </div>
      <ul className="flex flex-col text-zinc-500 p-4">
        {featuresList.map((feature) => {
          let featureLink = feature.name.toLowerCase();
          return (
            <Link key={feature.name} href={`/profile/${featureLink}`}>
              <li
                className="flex gap-2 items-center px-4 py-2 rounded-full hover:bg-zinc-100 duration-500"
                onMouseOver={() => {
                  iconAnimation(feature.ref);
                }}>
                <Player ref={feature.ref} icon={feature.icon} size={20} />
                <span>{feature.name}</span>
              </li>
            </Link>
          );
        })}
        <li
          className="flex gap-2 items-center px-4 py-2 rounded-full text-black hover:bg-red-50 duration-500 hover:text-red-300 cursor-pointer"
          onClick={() => signOut(() => handleSingOut())}>
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
        </li>
      </ul>
    </div>
  );
};
