import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const StatsSection = () => {
  return (
    <section className="flex items-center w-dvw h-dvh relative">
      <img
        className="w-full h-full object-cover absolute scale-x-[-1] -z-1"
        src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779196111/IMG_8795_1_ffy6kd.jpg"
      ></img>
      <div className="absolute h-dvh w-dvw bg-radial-[circle_at_75%_50%] from-transparent to-black/80 to-69% -z-1"></div>
      <div className="flex flex-col gap-3 mx-6 md:mx-16 lg:mx-24 text-3xl md:text-5xl lg:text-7xl font-anton tracking-tight">
        <p className="bg-linear-165 from-green-800/60 to-green-950/60 p-2 md:p-4 lg:p-4 w-fit">
          BORN IN BEKASI, INDONESIA
        </p>
        <p className="bg-linear-165 from-green-800/60 to-green-950/60 p-2 md:p-4 lg:p-4 w-fit">
          BROADCAST @ UI
        </p>
        <p className="bg-linear-165 from-green-800/60 to-green-950/60 p-2 md:p-4 lg:p-4 w-fit">
          2005 KID!
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
