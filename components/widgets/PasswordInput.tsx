"use client";

import { Input } from "@nextui-org/react";
import React from "react";

type Props = {
  invalidPassword: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const PasswordInput = ({ setPassword, invalidPassword }: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      label="Password"
      variant="bordered"
      onChange={(e) => setPassword(e.target.value)}
      isInvalid={invalidPassword.length > 0}
      errorMessage={invalidPassword}
      classNames={{
        inputWrapper: ["group-data-[focus=true]:border-primary border"],
      }}
      endContent={
        <button
          className="focus:outline-none w-5 h-full"
          type="button"
          onClick={toggleVisibility}>
          {isVisible ? (
            <svg
              className="size-5 text-default-400 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
            </svg>
          ) : (
            <svg
              className="size-5 text-default-400 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="w-full"
    />
  );
};
