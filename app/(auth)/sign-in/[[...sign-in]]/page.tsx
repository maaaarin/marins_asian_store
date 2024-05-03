"use client";

import { ForgotPassword } from "@/components/ui/SignIn/ForgotPassword";
import { SignIn } from "@/components/ui/SignIn/SignIn";
import { useState } from "react";

export default function Page() {
  const [forgotPassword, setForgotPassword] = useState(false);

  if (forgotPassword) {
    return <ForgotPassword setForgotPassword={setForgotPassword} />;
  }

  return <SignIn setForgotPassword={setForgotPassword} />;
}
