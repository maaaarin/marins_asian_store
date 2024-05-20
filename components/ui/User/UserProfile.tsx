"use client";

import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export const UserProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const profileImage = useRef(null);

  // Update Profile Picture
  function handleProfileImage(e: HTMLInputElement) {
    if (e.files) {
      user?.setProfileImage({ file: e.files[0] });
    }
  }

  return (
    <div className="w-full h-64 bg-slate-200 rounded-3xl flex-center bg-no-repeat bg-cover bg-[url('/assets/img/user_profile_banner.svg')]">
      <div className="size-full flex-center flex-col gap-7 rounded-3xl">
        <div className="size-24 relative group rounded-full flex justify-center">
          <Image
            src={user?.imageUrl || ""}
            alt="alt"
            width={128}
            height={128}
            className="size-full object-cover rounded-full border-2 border-secondary cursor-pointer"
          />
          <input
            type="file"
            id="profile-image"
            className="size-full absolute top-0 left-0 opacity-0 rounded-full cursor-pointer"
            ref={profileImage}
            onChange={(e) => handleProfileImage(e.target)}
          />
          <div className="size-full absolute top-0 left-0 invisible bg-black/25 group-hover:visible rounded-full flex-center pointer-events-none">
            <svg
              fill="currentColor"
              viewBox="-5.0 -10.0 110.0 135.0"
              className="size-10 text-white">
              <path d="m51.477 21.387-25.219 43.676c-0.24219 0.42188-0.38672 0.89062-0.41406 1.375l-0.83594 13.953c0.011719 0.13672 0.035157 0.27344 0.066407 0.40625-0.035157 0.14844-0.0625 0.30078-0.074219 0.45312 0 0.82812 0.32812 1.625 0.91406 2.2109 0.58594 0.58594 1.3828 0.91406 2.2109 0.91406h26.832l-4.0391 4.0391h-0.003907c-0.89062 0.89453-1.1602 2.2383-0.67578 3.4062 0.48438 1.168 1.625 1.9297 2.8867 1.9297h18.75c0.82812 0 1.625-0.32812 2.2109-0.91406 0.58594-0.58594 0.91406-1.3828 0.91406-2.2109s-0.32812-1.625-0.91406-2.2109c-0.58594-0.58594-1.3828-0.91406-2.2109-0.91406h-11.207l4.0391-4.0391h0.003907c0.89062-0.89453 1.1602-2.2383 0.67578-3.4062-0.48438-1.168-1.625-1.9297-2.8867-1.9297h-24.992l4.0039-2.6445c0.40234-0.26562 0.73828-0.62109 0.98047-1.043l24.781-42.918z" />
              <path d="m65.887 6.2617c-0.90625-0.023438-1.8125 0.089843-2.6836 0.32422-2.3242 0.62109-4.4102 2.125-5.6953 4.3516l-2.9062 5.0312 15.797 10.133 3.3438-5.7891c2.5703-4.4531 1.0234-10.234-3.4297-12.805-1.3906-0.80469-2.9102-1.207-4.4258-1.2461z" />
            </svg>
          </div>
          <span className="absolute -bottom-4 w-fit px-2 py-1 bg-secondary text-white rounded-full">
            Lvl. 1
          </span>
        </div>
        <span className=" text-white text-2xl">
          {user?.firstName?.concat(" ", user?.lastName || "")}
        </span>
      </div>
    </div>
  );
};
