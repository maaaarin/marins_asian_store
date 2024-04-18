import React from "react";
import { Button, Input } from "@nextui-org/react";

const Account = async () => {
  return (
    <div className="size-full flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Account</h2>
      <section className="w-full h-auto flex flex-col gap-4">
        <div className="flex flex-col bg-zinc-50 rounded-xl p-4">
          <span className="font-semibold text-xl">Personal Information</span>
          <p className="text-zinc-40000">Manage your account information</p>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            label="First Name"
            labelPlacement="outside"
            placeholder="Your first name"
            defaultValue="Andrés"
          />
          <Input
            type="text"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Your last name"
            defaultValue="Marín"
          />
        </div>
      </section>
      <section className="w-full h-auto flex flex-col gap-4">
        <div className="flex flex-col bg-zinc-50 rounded-xl p-4">
          <span className="font-semibold text-xl">Security</span>
          <p className="text-zinc-40000">Manage your security preferences</p>
        </div>
        <div className="flex gap-4">
          <Input
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Your email"
            defaultValue="andresfprivado@gmail.com"
          />
          <Input
            type="password"
            label="Password"
            labelPlacement="outside"
            placeholder="Your password"
            defaultValue="asdasdas"
          />
        </div>
        <div className="">
          <span className=" font-semibold">Dangerous area</span>
          <div className="flex items-center gap-5">
            <p>Delete your account and all its associated data.</p>
            <Button color="danger">Delete account</Button>
          </div>
        </div>
      </section>
      <div className="flex items-center gap-3 mt-auto">
        <Button color="primary">Save changes</Button>
        <Button color="danger" variant="flat">
          Discard changes
        </Button>
      </div>
    </div>
  );
};
export default Account;
