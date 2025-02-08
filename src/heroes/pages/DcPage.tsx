import { HR } from "flowbite-react";
import { HeroList } from "../components";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { useRef } from "react";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

export const DcPage = () => {
  // const bg = "/assets/dc-bg.jpg";

  return (
    <div className={`dc-page  h-full overflow-hidden`}>
      <div className="backdrop-blur-[3px]  p-5 sm:px-2">
        <h1 className="text-5xl font-bold">DC Comics</h1>
          
        <HR className="min-w-full dark:bg-white" />
        <HeroList publisher="DC Comics" />
      </div>
    </div>
  );
};
