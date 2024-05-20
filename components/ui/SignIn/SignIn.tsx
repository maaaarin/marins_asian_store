"use client";
import { Player } from "@lordicon/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

// NextUI
import { Button, Input } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
// Components
import { PasswordInput } from "@/components/widgets/PasswordInput";

// Clerk
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

// Files
import facebook from "/public/assets/icons/facebook.svg";
import google from "/public/assets/icons/google.svg";
import arrowIcon from "@/public/assets/icons/arrow.json";

export const SignIn = ({ setForgotPassword }: any) => {
  // Sign In
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  useEffect(() => {
    if (error === "form_param_nil") {
      setError("");
    } else if (error === "form_identifier_not_found") {
      setError("Couldn't find your account.");
    } else if (error === "form_param_format_invalid") {
      setInvalidEmail("Email is invalid.");
      setError("");
    } else if (error === "form_password_incorrect") {
      setInvalidPassword(
        "Password is incorrect. Try again, or use another method."
      );
      setError("");
    }
  }, [error]);

  // Sign In process.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    if (!emailAddress.length) {
      setInvalidEmail("Enter your email address");
    } else {
      setInvalidEmail("");
    }

    if (!password.length) {
      setInvalidPassword("Enter your password");
    } else {
      setInvalidPassword("");
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
      setError(err.errors[0].code);
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
    <>
      <div className="w-full h-auto flex flex-col gap-3 mb-auto">
        <div className="w-full flex flex-col items-center gap-2 mb-8">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <span>Login to your account to enjoy!</span>
        </div>
        <div className="w-full flex items-center gap-3">
          <Button
            isIconOnly
            className="w-2/4 h-14 bg-white rounded-full border flex-center"
            onClick={() => signInWith("oauth_google")}>
            <Image src={google} alt="alt" width={32} height={32} />
          </Button>
          <Button
            isIconOnly
            className="w-2/4 h-14 bg-white rounded-full border flex-center"
            onClick={() => signInWith("oauth_facebook")}>
            <Image src={facebook} alt="alt" width={32} height={32} />
          </Button>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <div className="flex-grow h-[1px] border"></div>
          Or
          <div className="flex-grow h-[1px] border"></div>
        </div>
        {error && (
          <div className="w-full h-auto rounded-full bg-zinc-100 p-3 flex items-center gap-2">
            <div className="size-6 bg-red-500 rounded-full text-white">
              <svg
                fill="currentColor"
                className="size-full "
                viewBox="0 0 16 16">
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
              </svg>
            </div>
            <span className="text-zinc-600">{error}</span>
          </div>
        )}

        <form
          className="w-full flex flex-col gap-3 "
          action="#"
          onSubmit={handleSubmit}>
          <Input
            type="email"
            variant="bordered"
            label="Email"
            className="w-full"
            isInvalid={invalidEmail.length > 0}
            errorMessage={invalidEmail}
            onChange={(e) => setEmailAddress(e.target.value)}
            classNames={{
              inputWrapper: ["group-data-[focus=true]:border-primary border"],
            }}
          />
          <PasswordInput
            setPassword={setPassword}
            invalidPassword={invalidPassword}
          />
          <div className="flex justify-between items-start">
            <button
              onClick={() => {
                setForgotPassword(true);
              }}>
              <span className="text-sm text-gray-400">Forgot password?</span>
            </button>
            <Button
              isIconOnly
              color="primary"
              type="submit"
              className="w-40 h-14  rounded-full border flex-center"
              onMouseOver={() => {
                arrowIconAnimation();
              }}>
              <Player ref={arrowRef} icon={arrowIcon} size={32} />
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full h-auto flex gap-2 items-center mt-8 lg:mt-auto">
        <span>New here?</span>
        <Link href="/sign-up">
          <Button className="bg-black text-white" radius="full">
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};
