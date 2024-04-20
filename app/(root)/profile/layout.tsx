import { UserFeatures } from "@/components/ui/User/UserFeatures";
import { UserProfile } from "@/components/ui/User/UserProfile";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-screen max-h-[56rem] mt-24 flex gap-5 ">
      <section className="w-[30%] h-full flex flex-col gap-5 ">
        <UserProfile />
        <UserFeatures />
      </section>
      <section className="w-[70%] h-full border  rounded-3xl p-8">
        {children}
      </section>
    </div>
  );
}
