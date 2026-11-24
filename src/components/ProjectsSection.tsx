import { useRef, useState } from "react";
import { projects } from "../../public/data";
import gsap from "gsap";
import ImageLightbox from "#/components/ImageLightbox";

const ProjectsSection = () => {
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const openState = useRef<boolean[]>(projects.map((_, index) => index === 0));
  const [expandedProjects, setExpandedProjects] = useState(() =>
    projects.map((_, index) => index === 0),
  );

  // Lightbox state
  const [activeImage, setActiveImage] = useState<{
    src: string;
    originalRect: DOMRect;
  } | null>(null);

  const handleMouseEnter = (index: number) => {
    const trigger = triggerRefs.current[index];
    const panel = panelRefs.current[index];
    const textEl = textRefs.current[index];
    if (!trigger || !panel) return;

    if (!openState.current[index]) {
      gsap.killTweensOf(panel);
      openState.current[index] = true;
      setExpandedProjects((current) =>
        current.map((open, i) => (i === index ? true : open)),
      );
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
    setExpandedProjects((current) =>
      current[index]
        ? current.map((open, i) => (i === index ? false : open))
        : current,
    );

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
    <section className="flex flex-col items-center relative text-black leading-none w-dvw bg-[#f4f4f4] overflow-hidden">
      <div className="z-0 absolute w-full h-[10dvh] bg-linear-180 from-0% from-black/15 to-100% to-transparent"></div>
      <div className="flex flex-col justify-center items-center pb-10 pt-16 lg:py-20 md:py-20">
        <h2 className="font-inter text-5xl md:text-6xl lg:text-[6rem] font-bold tracking-tighter">
          MY PROJECTS
        </h2>
        <p className="font-inter text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter">
          Bekasi, Jawa Barat
        </p>
        <p className="font-inter text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter">
          2005 Kid
        </p>
      </div>
      <hr className="border-0 border-b-6 w-[95dvw]"></hr>
      <div className="relative z-100 flex h-full w-full pt-12 pb-4 px-8 md:px-12 lg:px-20 gap-4 md:gap-10 lg:gap-12 no-vertical-scrollbar">
        <div className="flex w-full flex-col gap-2">
          {projects.map((curr, index) => {
            return (
              <div
                className="flex flex-col gap-6 md:gap-6 lg:gap-8 mouse-hover-detect"
                key={`project-${index}`}
                onMouseEnter={() => {
                  handleMouseEnter(index);
                }}
                onTouchStart={() => {
                  handleMouseEnter(index);
                }}
                onPointerLeave={(event) => {
                  // Touch browsers synthesize mouse-leave after a tap; do not
                  // immediately collapse the gallery the visitor just opened.
                  if (event.pointerType !== "touch") handleMouseLeave(index);
                }}
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
                    className="font-anton text-4xl md:text-5xl lg:text-7xl decoration-4 underline underline-offset-4"
                    style={{
                      textDecorationColor:
                        index === 0 ? "black" : "transparent",
                    }}
                  >
                    {curr.name.toLocaleUpperCase()}
                  </p>
                  <span
                    aria-hidden="true"
                    className="shrink-0 px-1 font-inter text-2xl leading-none md:text-3xl lg:text-5xl"
                  >
                    {expandedProjects[index] ? "−" : "+"}
                  </span>
                  <hr className="w-fit flex-auto mx-5 self-end my-2 border-dotted border-0 border-b-4 border-black hidden md:block lg:block"></hr>
                  <p className="font inter text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-tighter">
                    {curr.date}
                  </p>
                </div>
                <div
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-4 overflow-hidden"
                  style={
                    index === 0
                      ? { height: "auto", opacity: 1, visibility: "visible" }
                      : { height: 0, opacity: 0, visibility: "hidden" }
                  }
                >
                  <div className="flex gap-3 overflow-x-scroll overflow-y-hidden custom-scrollbar">
                    {curr.imgs.map((currImg, imgIndex) => {
                      return (
                        <img
                          key={`img-${imgIndex}`}
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setActiveImage({
                              src: currImg,
                              originalRect: rect,
                            });
                          }}
                          className="rounded-lg object-contain h-[22dvh] md:h-[25dvh] lg:h-[30dvh] cursor-zoom-in"
                          data-src={currImg}
                        ></img>
                      );
                    })}
                  </div>
                  <p className="font-inter text-xl md:text-2xl lg:text-2xl pb-6 tracking-tight leading-tight">
                    {curr.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="border-0 border-b-6 w-[95dvw]"></hr>
      <div className="flex w-full items-center justify-center px-8 py-6 text-center md:px-12 md:py-8 lg:px-20 lg:py-10">
        <p className="font-anton text-4xl md:text-5xl lg:text-7xl">
          AND MANY MORE...
        </p>
      </div>
      {activeImage && (
        <ImageLightbox
          src={activeImage.src}
          originalRect={activeImage.originalRect}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
