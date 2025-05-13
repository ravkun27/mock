import React from "react";

const Strip = () => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap bg-black hover:bg-white text-white hover:text-black">
      <div className="animate-slide-left inline-block">
        {[...Array(10)].map((_, idx) => (
          <p
            key={idx}
            className="inline-block text-[30vw] leading-[0.9] font-normal tracking-[-5px] uppercase m-0 px-4"
          >
            Work With Us
            <span className="inline-block align-middle mx-14 h-[1px] w-44 bg-white"></span>
            Let&apos;s Chat
            <span className="inline-block align-middle mx-14 h-[1px] w-44 bg-white"></span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Strip;
