import { Button, Progress, Tooltip } from "@nextui-org/react";
import React, { RefObject, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/widgets/drawer";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import styles from "./FlavorTrail.module.scss";

export const FlavorTrail = () => {
  const flavortrail = [
    {
      level: 1,
      reward: "https://i.imgur.com/fcFnQrz.png",
      rewardPoints: 500,
    },
    {
      level: 2,
      reward: "https://i.imgur.com/2chtIZL.png",
      rewardPoints: 500,
    },
    {
      level: 3,
      reward: "https://i.imgur.com/HXi1L2g.png",
      rewardPoints: 500,
    },
    {
      level: 4,
      reward: "https://i.imgur.com/DXmAnBy.png",
      rewardPoints: 500,
    },
    {
      level: 5,
      reward: "https://i.imgur.com/fuIt1tA.png",
      rewardPoints: 500,
    },
  ];

  function getRewardPoints() {}

  const userProgress = {
    level: 1,
    flavorPoints: 560,
  };

  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(45);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [firstRewardCompleted, setFirstRewardCompleted] = useState(false);
  const [firstReward, setFirstReward] = useState(false);
  const [secondReward, setSecondReward] = useState(false);

  const [rewardPrevPicture, setRewardPrevPicture] = useState("");
  const [rewardPicture, setRewardPicture] = useState("");

  // if (user.level > 1000) level++; points = 0;
  // 10 niveels 5 recompensas

  useEffect(() => {
    handleLevels(currentLevel);
  });

  const levels = [1, 2, 3, 4, 5];

  function checkLevelProgress(userLevel: number) {
    if (userLevel > currentLevel) {
      setLevelCompleted(true);
    } else if (userLevel == currentLevel) {
      setLevelCompleted(false);
      setLevelProgress(Math.round(userProgress.flavorPoints / 10));
      if (userProgress.flavorPoints >= 500) {
        setFirstRewardCompleted(true);
      } else {
        setFirstRewardCompleted(false);
      }
    } else {
      setLevelCompleted(false);
      setLevelProgress(0);
      setFirstRewardCompleted(false);
    }
  }

  function handleLevels(level: number) {
    setCurrentLevel(level);
    checkLevelProgress(userProgress.level);
    setRewardPrevPicture(rewardPicture);
    setRewardPicture(flavortrail[level - 1].reward);
  }

  function handleNextLevel() {
    if (currentLevel < 5) {
      handleLevels(currentLevel + 1);
    } else {
      handleLevels(1);
    }
  }

  function handlePrevLevel() {
    if (currentLevel > 1) {
      handleLevels(currentLevel - 1);
    } else {
      handleLevels(5);
    }
  }

  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <Drawer>
      <DrawerTrigger>
        <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-[125px] h-2 bg-zinc-200 rounded-full mb-2"></div>
        <DrawerHeader>
          <div className="w-full h-auto flex items-center justify-center">
            <Image
              src="\assets\flavor_trail\logo.svg"
              alt="alt"
              width={160}
              height={160}
            />
          </div>
        </DrawerHeader>
        <div className="container h-96 flex-center flex-col relative">
          <div className="w-full h-auto flex items-center justify-between mb-24 relative">
            {/* Profile Picture */}
            <Image
              src={user?.imageUrl || ""}
              alt="alt"
              width={128}
              height={128}
              className="size-24 object-cover rounded-full border-4 border-secondary cursor-pointer"
            />
            {/* Progress bar */}
            <Progress
              value={levelCompleted ? 100 : levelProgress}
              disableAnimation={levelCompleted}
              size="lg"
              classNames={{
                base: "absolute w-full -z-10",
                track: "bg-zinc-200",
                indicator: "bg-secondary h-6",
              }}
            />
            {/* First Reward */}
            <Tooltip
              showArrow
              placement="bottom"
              classNames={{
                base: ["before:bg-black"],
                content: ["p-3 bg-black text-white"],
              }}
              content={
                <div className="flex gap-4 bg-black items-center">
                  <div className="flex-center size-12 bg-white rounded-full text-black text-xl">
                    2€
                  </div>
                  <ul className="flex gap-4">
                    <li className="flex flex-col">
                      <span className="font-semibold text-sm">Category</span>
                      Candy
                    </li>
                    <li className="flex flex-col">
                      <span className="font-semibold text-sm">Expiry</span>
                      1d
                    </li>
                  </ul>
                </div>
              }>
              <div
                className={clsx("size-16 bg-zinc-200 rounded-full p-1", {
                  "!bg-secondary": firstRewardCompleted || levelCompleted,
                })}>
                <div className="size-full bg-white rounded-full p-2">
                  <svg
                    className="size-full text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M21 5H3a1 1 0 0 0-1 1v4h.893c.996 0 1.92.681 2.08 1.664A2.001 2.001 0 0 1 3 14H2v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4h-1a2.001 2.001 0 0 1-1.973-2.336c.16-.983 1.084-1.664 2.08-1.664H22V6a1 1 0 0 0-1-1zM11 17H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2z" />
                  </svg>
                </div>
              </div>
            </Tooltip>
            {/* Second Reward */}
            <div
              className={clsx("size-48 bg-zinc-200 rounded-full", {
                "!bg-secondary": levelCompleted,
              })}></div>
            <div className="size-48 flex-center absolute right-0">
              <Image
                src={rewardPicture}
                alt="Reward"
                width={192}
                height={192}
                className={clsx("w-4/5 h-auto", {
                  "animate-slide-in-blurred-bottom":
                    rewardPicture == rewardPrevPicture,
                })}
              />
            </div>
            {/* Fade */}
            <div className="absolute top-0 right-[-10%] w-[10%] h-full bg-gradient-to-r from-transparent from-10% to-white to-90% z-10"></div>
            <div
              className={clsx(
                "w-[110%] h-5 absolute -z-20 left-0 bg-zinc-200",
                { "!bg-secondary": levelCompleted }
              )}></div>
          </div>
          {/* Level Controls */}
          <ul className="flex gap-3">
            <Button
              isIconOnly
              radius="full"
              size="sm"
              className="size-8 rounded-full p-1 bg-transparent flex-center"
              onClick={handlePrevLevel}>
              <svg
                fill="currentColor"
                className="size-full"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </Button>
            {levels.map((level) => (
              <li
                key={level}
                className={clsx(
                  "size-8 rounded-full border border-dashed border-black cursor-pointer",
                  {
                    "bg-primary": currentLevel === level,
                  }
                )}
                onClick={() => {
                  handleLevels(level);
                }}></li>
            ))}
            <Button
              isIconOnly
              radius="full"
              size="sm"
              className="size-8 rounded-full p-1 bg-transparent flex-center"
              onClick={handleNextLevel}>
              <svg
                fill="currentColor"
                className="size-full"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </Button>
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
