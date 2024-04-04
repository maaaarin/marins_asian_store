"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import { NextUIProvider } from "@nextui-org/react";

interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  return (
    <Provider store={store}>
      <NextUIProvider>{props.children}</NextUIProvider>
    </Provider>
  );
};
