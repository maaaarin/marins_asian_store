import { UserFeatures } from "@/components/ui/User/UserFeatures";
import { UserProfile } from "@/components/ui/User/UserProfile";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-auto lg:h-screen lg:max-h-[56rem] mt-24 flex flex-col gap-5 lg:flex-row">
      <section className="w-full h-full flex flex-col gap-5 lg:w-[30%]">
        <UserProfile />
        <div className="hidden lg:block">
          <UserFeatures />
        </div>
      </section>
      <section className="w-full h-full border rounded-3xl p-4 pt-6 lg:pt-0 lg:p-8 lg:w-[70%] ">
        {children}
      </section>
    </div>
  );
}
