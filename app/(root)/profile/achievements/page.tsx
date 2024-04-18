import React from "react";

const Achievements = () => {
  return (
    <div className="size-full flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <ul className="w-full h-auto flex flex-col gap-4">
        <li className="w-full h-auto">
          <div className="w-full h-10 bg-red-400"></div>
        </li>
      </ul>
    </div>
  );
};

export default Achievements;
