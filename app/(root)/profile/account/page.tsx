import React from "react";
import { Button, Input } from "@nextui-org/react";
import { auth, currentUser } from "@clerk/nextjs/server";

const Account = async () => {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="size-full flex flex-col gap-8">
      <h2 className="text-2xl font-semibold text-center lg:text-left">
        Account
      </h2>
      <section className="w-full h-auto flex flex-col gap-4">
        <div className="flex flex-col bg-zinc-50 rounded-xl p-4">
          <span className="font-semibold text-xl text-center lg:text-left">
            Personal Information
          </span>
          <p className="text-zinc-500 text-center text-sm lg:text-base lg:text-left">
            Manage your account information
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            label="First Name"
            labelPlacement="outside"
            placeholder="Your first name"
            defaultValue={user?.firstName || ""}
          />
          <Input
            type="text"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Your last name"
            defaultValue={user?.lastName || ""}
          />
        </div>
      </section>
      <section className="w-full h-auto flex flex-col gap-4">
        <div className="flex flex-col bg-zinc-50 rounded-xl p-4">
          <span className="font-semibold text-xl text-center lg:text-left">
            Security
          </span>
          <p className="text-zinc-500 text-center text-sm lg:text-base lg:text-left">
            Manage your security preferences
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Your email"
            defaultValue={user?.emailAddresses[0].emailAddress || ""}
          />
          <Input
            type="password"
            label="Password"
            labelPlacement="outside"
            placeholder="Your password"
            defaultValue="asdasdasasd"
          />
        </div>
      </section>
      <section className="w-full h-auto flex gap-4 bg-zinc-50 rounded-xl items-center justify-between p-4">
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Dangerous area</span>
          <p className="text-zinc-500 text-sm lg:text-base">
            Delete your account and all its associated data.
          </p>
        </div>
        <Button color="danger" className="w-fit">
          <span className="">Delete</span>
        </Button>
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
