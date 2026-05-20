import { useRef } from "react";
import { projects } from "../../public/data";
import gsap from "gsap";

const ProjectsSection = () => {
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const openState = useRef<boolean[]>(new Array(projects.length).fill(false));

  const handleMouseEnter = (index: number) => {
    const trigger = triggerRefs.current[index];
    const panel = panelRefs.current[index];
    const textEl = textRefs.current[index];
    if (!trigger || !panel) return;

    gsap.killTweensOf(panel);

    if (!openState.current[index]) {
      openState.current[index] = true;
      const tl = gsap.timeline();
      tl.set(panel, { height: "auto", visibility: "visible" }).fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    }

    if (textEl) {
      gsap.killTweensOf(textEl);
      gsap.fromTo(
        textEl,
        { textDecorationColor: "transparent" },
        { textDecorationColor: "black", duration: 0.2, ease: "power2.out" },
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    const panel = panelRefs.current[index];
    const textEl = textRefs.current[index];
    if (!panel) return;

    gsap.killTweensOf(panel);
    openState.current[index] = false;

    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(panel, { visibility: "hidden" });
      },
    });

    if (textEl) {
      gsap.killTweensOf(textEl);
      gsap.to(textEl, {
        textDecorationColor: "transparent",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  return (
    <section className="flex flex-col items-center relative text-black leading-none w-dvw bg-[#f4f4f4]">
      <div className="z-0 absolute w-full h-[10dvh] bg-linear-180 from-0% from-black/15 to-100% to-transparent"></div>
      <div className="flex flex-col justify-center items-center py-20">
        <h2 className="font-inter text-[7rem] font-bold tracking-tighter">
          MY PROJECTS
        </h2>
        <p className="font-inter text-3xl font-medium tracking-tighter">
          Bekasi, Jawa Barat
        </p>
        <p className="font-inter text-3xl font-medium tracking-tighter">
          2005 Kid
        </p>
      </div>
      <hr className="border-0 border-b-6 w-[90dvw]"></hr>
      <div className="relative z-100 flex h-full py-16 px-12 gap-12">
        <div className="flex flex-col gap-6">
          {projects.map((curr, index) => {
            return (
              <div
                className="flex flex-col gap-4 px-8 mouse-hover-detect"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div
                  ref={(el) => {
                    triggerRefs.current[index] = el;
                  }}
                  className="flex justify-between items-center gap-1.5 cursor-pointer"
                >
                  <p
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                    className="font-anton text-7xl decoration-4 underline underline-offset-4"
                    style={{ textDecorationColor: "transparent" }}
                  >
                    {curr.name.toLocaleUpperCase()}
                  </p>
                  <hr className="w-fit flex-auto mx-5 self-end my-2 border-dotted border-0 border-b-4  border-black"></hr>
                  <p className="font inter text-4xl font-bold tracking-tighter">
                    {curr.date}
                  </p>
                </div>
                <div
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-2 overflow-hidden"
                  style={{ height: 0, opacity: 0, visibility: "hidden" }}
                >
                  <div className="flex gap-3">
                    {curr.imgs.map((currImg) => {
                      return (
                        <img
                          className="rounded-lg object-contain h-[25dvh] shadow-2xl"
                          src={currImg}
                        ></img>
                      );
                    })}
                  </div>
                  <p className="font-inter text-2xl tracking-tight leading-tight">
                    {curr.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="border-0 border-b-6 w-[90dvw]"></hr>
      <div className="w-full py-16 px-12">
        <div className="flex flex-col gap-8 px-8">
          <div className="flex justify-between items-center gap-1.5 cursor-pointer">
            <p className="font-anton text-7xl decoration-4">
              TOTAL
            </p>
            <hr className="w-fit flex-auto mx-5 self-end my-2 border-dotted border-0 border-b-4  border-black"></hr>
            <p className="font inter text-5xl font-bold tracking-tighter">
              {projects.length} PROJECTS
            </p>
          </div>
          <div className="flex justify-between items-center gap-1.5 cursor-pointer">
            <p className="font-anton text-7xl decoration-4">
              HOURS SPENT ON WYSIWYG
            </p>
            <hr className="w-fit flex-auto mx-5 self-end my-2 border-dotted border-0 border-b-4  border-black"></hr>
            <p className="font inter text-5xl font-bold tracking-tighter">
              2000+
            </p>
          </div>
          <div className="flex justify-between items-center gap-1.5 cursor-pointer">
            <p className="font-anton text-7xl decoration-4">
              COKE ZERO DRINKED
            </p>
            <hr className="w-fit flex-auto mx-5 self-end my-2 border-dotted border-0 border-b-4  border-black"></hr>
            <p className="font inter text-5xl font-bold tracking-tighter">
              100+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
