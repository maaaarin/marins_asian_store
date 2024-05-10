"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Player } from "@lordicon/react";

// UI
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/widgets/input-otp";
import { Button, Input } from "@nextui-org/react";

// Components
import { PasswordInput } from "@/components/widgets/PasswordInput";

// Clerk
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { ClerkAPIError } from "@clerk/types";

// Files
import facebook from "/public/assets/icons/facebook.svg";
import google from "/public/assets/icons/google.svg";
import arrowIcon from "@/public/assets/icons/arrow.json";

export const SignUp = () => {
  // Animated Icon
  const arrowRef = useRef<Player>(null);

  function arrowIconAnimation() {
    let iconAnimation = arrowRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  // Sign Up
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [invalidFirstName, setInvalidfirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  useEffect(() => {
    errors?.map((er) => {
      if (er.meta?.paramName == "first_name") {
        setInvalidfirstName(er.message);
      } else if (er.meta?.paramName == "last_name") {
        setInvalidLastName(er.message);
      } else if (er.meta?.paramName == "email_address") {
        setInvalidEmail(er.message);
        if (er.code == "form_param_format_invalid") {
          setInvalidEmail("Email is invalid.");
        }
      } else if (er.meta?.paramName == "password") {
        setInvalidPassword(er.message);
        if (er.code == "form_password_pwned") {
          setInvalidPassword("For safety, please use a different password.");
        }
      }
    });
  }, [errors]);
  // Sign Up process
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Clear previous errors
    setInvalidfirstName("");
    setInvalidLastName("");
    setInvalidEmail("");
    setInvalidPassword("");
    setErrors(undefined);

    // Start the sign-up process using the credentials provided
    try {
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifying(true);

      if (result.status === "missing_requirements") {
        const error = {
          code: result.status,
          message:
            "A requirement from the email, phone, username settings is missing.",
        };
        setErrors([error]);
        return;
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
      setErrors(err.errors);
    }
  };

  // Verification process
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Once the sign-up form was submitted, verifying is true
  if (verifying) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-full flex flex-col items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Verification Code</h2>
          <span>Enter the code sent to your email address</span>
        </div>
        <div className="size-auto rounded-full border p-2 mb-4 text-sm flex items-center gap-2">
          <svg
            className="size-8 text-zinc-200"
            fill="currentColor"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          {emailAddress}
          <Button
            isIconOnly
            size="sm"
            className="size-8 rounded-full bg-zinc-100 p-2"
            onClick={() => {
              setVerifying(false);
              setPassword("");
            }}>
            <svg
              className="size-full text-zinc-400"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
            </svg>
          </Button>
        </div>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleVerify}>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(code) => setCode(code)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            size="lg"
            className=" bg-primary rounded-full flex-center text-white">
            Verify
          </Button>
        </form>
      </div>
    );
  }

  // OAuth providers
  const signUpWith = (strategy: OAuthStrategy) => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-3">
        <div className="w-full flex flex-col items-center gap-2 mb-8">
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <span>Join us to enjoy!</span>
        </div>
        <div className="w-full flex items-center gap-3">
          <Button
            isIconOnly
            className="w-2/4 h-14 bg-black rounded-full border flex-center"
            onClick={() => signUpWith("oauth_google")}>
            <Image src={google} alt="alt" width={32} height={32} />
          </Button>
          <Button
            isIconOnly
            className="w-2/4 h-14 bg-black rounded-full border flex-center"
            onClick={() => signUpWith("oauth_facebook")}>
            <Image src={facebook} alt="alt" width={32} height={32} />
          </Button>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <div className="flex-grow h-[1px] border"></div>
          Or
          <div className="flex-grow h-[1px] border"></div>
        </div>
        <form
          className="w-full flex flex-col gap-3 "
          action="#"
          onSubmit={handleSubmit}>
          <div className="w-full flex gap-3">
            <Input
              type="text"
              variant="bordered"
              label="First Name"
              defaultValue={firstName}
              className="w-full"
              isInvalid={invalidFirstName.length > 0}
              errorMessage={invalidFirstName}
              onChange={(e) => setFirstName(e.target.value)}
              classNames={{
                inputWrapper: ["group-data-[focus=true]:border-primary border"],
              }}
            />
            <Input
              type="text"
              variant="bordered"
              label="Last Name"
              defaultValue={lastName}
              className="w-full"
              isInvalid={invalidLastName.length > 0}
              errorMessage={invalidLastName}
              onChange={(e) => setLastName(e.target.value)}
              classNames={{
                inputWrapper: ["group-data-[focus=true]:border-primary border"],
              }}
            />
          </div>
          <Input
            type="email"
            variant="bordered"
            label="Email"
            className="w-full"
            defaultValue={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            isInvalid={invalidEmail.length > 0}
            errorMessage={invalidEmail}
            classNames={{
              inputWrapper: ["group-data-[focus=true]:border-primary border"],
            }}
          />
          <PasswordInput
            setPassword={setPassword}
            invalidPassword={invalidPassword}
          />
          <div className="flex justify-center">
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
      <div className="w-full h-auto flex gap-2 items-center mt-auto">
        <span>Already have an account?</span>
        <Link href="/sign-in">
          <Button className="bg-black text-white" radius="full">
            Sign In
          </Button>
        </Link>
      </div>
    </>
  );
};
