import Image from "next/image";
import React from "react";

const Settings = () => {
  return (
    <div className="size-full overflow-auto flex flex-col items-center justify-center">
      <Image
        src={`/assets/img/cat_not_available.gif`}
        alt="Cat Asset"
        width={200}
        height={150}
        className="mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Not available yet!</h2>
      <span>Still working on it!</span>
    </div>
  );
};

export default Settings;
