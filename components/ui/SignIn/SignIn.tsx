"use client";
import { Player } from "@lordicon/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

// NextUI
import { Button, Input } from "@nextui-org/react";

// Components
import { PasswordInput } from "@/components/utils/PasswordInput";

// Clerk
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

// Files
import logo from "/public/assets/logo.svg";
import facebook from "/public/assets/icons/facebook.svg";
import google from "/public/assets/icons/google.svg";
import bush from "/public/assets/img/bush.svg";
import flower from "/public/assets/img/flower.svg";
import flower2 from "/public/assets/img/flower_2.svg";
import Toji from "/public/assets/img/Toji.png";
import arrowIcon from "@/public/assets/icons/arrow.json";

export const SignIn = () => {
  // Sign In
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // Sign In process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  // OAuth providers
  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  // Animated Icon
  const arrowRef = useRef<Player>(null);

  function arrowIconAnimation() {
    let iconAnimation = arrowRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  return (
    <div className="w-full h-screen flex items-end justify-center ">
      <div className="w-3/12 min-w-96 h-5/6 bg-white border border-black rounded-t-[4rem] flex flex-col justify-between p-10 relative z-10">
        <div className="size-full flex flex-col items-center gap-10">
          <Link href="/">
            <Image src={logo} alt="alt" width={128} height={128} />
          </Link>
          <div className="flex-center size-48 relative">
            <div className="size-full bg-slate-600 rounded-full"></div>
            <Image
              src={Toji}
              alt="Toji image"
              width={256}
              height={256}
              className="size-full absolute rounded-full bottom-0"
            />
          </div>
          <div className="w-full h-auto flex flex-col gap-3">
            <div className="w-full flex items-center gap-3">
              <Button
                isIconOnly
                className="w-2/4 h-14 bg-white rounded-2xl border flex-center"
                onClick={() => signInWith("oauth_google")}>
                <Image src={google} alt="alt" width={32} height={32} />
              </Button>
              <Button
                isIconOnly
                className="w-2/4 h-14 bg-white rounded-2xl border flex-center"
                onClick={() => signInWith("oauth_facebook")}>
                <Image src={facebook} alt="alt" width={32} height={32} />
              </Button>
            </div>
            <form className="w-full flex flex-col gap-3 " action="#">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                className="w-full"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <PasswordInput setPassword={setPassword} />
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Forgot password?</span>
                <Button
                  isIconOnly
                  color="primary"
                  className="w-40 h-14  rounded-full border flex-center"
                  onMouseOver={() => {
                    arrowIconAnimation();
                  }}
                  onClick={handleSubmit}>
                  <Player ref={arrowRef} icon={arrowIcon} size={32} />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex gap-2 items-center ">
          <span>New here?</span>
          <Button className="bg-black text-white" radius="full">
            Sign Up
          </Button>
        </div>
      </div>
      <div className="w-3/12 min-w-96 absolute">
        <Image
          src={flower}
          alt="asset"
          width={0}
          height={0}
          className="size-48 absolute bottom-0 right-[80%]"
        />
        <Image
          src={flower2}
          alt="asset"
          width={0}
          height={0}
          className="size-64 absolute  bottom-0 left-[80%]"
        />
        <Image
          src={bush}
          alt="asset"
          width={0}
          height={0}
          className="size-48 absolute z bottom-0 left-[85%]"
        />
      </div>
    </div>
  );
};
