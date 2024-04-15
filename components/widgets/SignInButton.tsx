"use client";

import { Player } from "@lordicon/react";
import { Button } from "@nextui-org/react";
import React, { useRef } from "react";
import arrowIcon from "@/public/assets/icons/arrow.json";
import Image from "next/image";

export const SignInButton = ({ handleSubmit }: Promise<void>) => {
  const arrowRef = useRef<Player>(null);

  function arrowIconAnimation() {
    let iconAnimation = arrowRef.current;
    if (!iconAnimation?.isPlaying) {
      iconAnimation?.playFromBeginning();
    }
  }

  return (
    <Button
      isIconOnly
      color="primary"
      className="w-40 h-14  rounded-full border flex-center"
      onMouseOver={() => {
        arrowIconAnimation();
      }}>
      <Player ref={arrowRef} icon={arrowIcon} size={32} />
    </Button>
  );
};
