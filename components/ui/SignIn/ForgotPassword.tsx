"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";

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

export const ForgotPassword = ({ setForgotPassword }: any) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidCode, setInvalidCode] = useState("");

  useEffect(() => {
    errors?.map((er) => {
      if (er.meta?.paramName == "password") {
        setInvalidPassword(er.message);
        if (er.code == "form_password_pwned") {
          setInvalidPassword("For safety, please use a different password.");
        }
      } else if (er.meta?.paramName == "code") {
        setInvalidCode(er.message);
        if (er.code == "form_code_incorrect") {
          setInvalidCode("Code is incorrect.");
        }
      }
    });
  }, [errors]);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setErrors(undefined);
      })
      .catch((err) => {
        // console.error("error", err.errors[0]);
        setErrors(err.errors);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setInvalidPassword("");
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setErrors(undefined);
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setErrors(undefined);
        } else {
          //   console.log(result);
        }
      })
      .catch((err) => {
        // console.error("error", err.errors[0]);
        setErrors(err.errors);
      });
  }

  if (successfulCreation) {
    return (
      <>
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative">
          <Button
            isIconOnly
            size="lg"
            className="bg-zinc-100 rounded-full p-2 flex-center absolute top-0 left-0"
            onClick={() => {
              setForgotPassword(false);
            }}>
            <svg fill="currentColor" className="size-full" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </Button>
          <div className="w-full flex flex-col items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">Reset your password</h2>
            <span className="text-center">
              Enter the password reset code that was sent to your email and your
              new password
            </span>
          </div>

          <form className="flex flex-col items-center gap-6" onSubmit={reset}>
            {invalidCode && (
              <div className="w-full h-auto rounded-full bg-zinc-100 p-3 flex items-center gap-2">
                <div className="size-6 bg-red-500 rounded-full text-white">
                  <svg
                    fill="currentColor"
                    className="size-full "
                    viewBox="0 0 16 16">
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                  </svg>
                </div>
                <span className="text-zinc-600">{invalidCode}</span>
              </div>
            )}
            <PasswordInput
              setPassword={setPassword}
              placeholderPassword="New password"
              invalidPassword={invalidPassword}
            />
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
              className=" bg-black rounded-full flex-center text-white">
              Verify
            </Button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 mb-auto relative">
        <Button
          isIconOnly
          size="lg"
          className="bg-zinc-100 rounded-full p-2 flex-center absolute top-0 left-0"
          onClick={() => {
            setForgotPassword(false);
          }}>
          <svg fill="currentColor" className="size-full" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </Button>
        <div className="w-full flex flex-col items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold">Reset your password</h2>
          <span>Please provide your email address.</span>
        </div>
        {errors && (
          <div className="w-full h-auto rounded-full bg-zinc-100 p-3 flex items-center gap-2">
            <div className="size-6 bg-red-500 rounded-full text-white">
              <svg
                fill="currentColor"
                className="size-full "
                viewBox="0 0 16 16">
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
              </svg>
            </div>
            <span className="text-zinc-600">{}</span>
          </div>
        )}
        <form
          className="w-full flex flex-col items-center gap-3 "
          action="#"
          onSubmit={create}>
          <Input
            type="email"
            variant="bordered"
            label="Email"
            className="w-full"
            onChange={(e) => setEmailAddress(e.target.value)}
            classNames={{
              inputWrapper: ["group-data-[focus=true]:border-primary border"],
            }}
          />
          <Button
            color="primary"
            type="submit"
            className="w-40 h-14 rounded-full border flex-center">
            Send code
          </Button>
        </form>
      </div>
    </>
  );
};
