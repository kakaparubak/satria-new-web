import React, { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Section {
  label: React.ReactNode;
  content: React.ReactNode;
  color: string;
}

interface ExpandingSectionsProps {
  sections: Section[];
}

const animatePanels = (
  from: HTMLDivElement,
  to: HTMLDivElement,
  fromIndex: number,
  toIndex: number,
  setActiveIndex: (i: number) => void,
  setisSectionActive: (b: boolean) => void,
  scrollPositions: React.MutableRefObject<number[]>,
  isTransitioning: React.MutableRefObject<boolean>
) => {
  isTransitioning.current = true

  // Save scroll position of current section
  const fromScrollable = from.querySelector('.overflow-y-auto')
  if (fromScrollable) {
    scrollPositions.current[fromIndex] = (fromScrollable as HTMLElement).scrollTop
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioning.current = false
      setActiveIndex(toIndex)
      // Restore scroll position of new active section
      const toScrollable = to.querySelector('.overflow-y-auto')
      if (toScrollable) {
        (toScrollable as HTMLElement).scrollTop = scrollPositions.current[toIndex]
      }
      setisSectionActive(true)
    },
  })

  tl.to(from, { height: '0px', duration: 0.5, ease: 'power2.inOut' })
    .to(to, { height: '100dvh', duration: 0.5, ease: 'power2.inOut' }, '<')
}

const ExpandingSections = ({ sections }: ExpandingSectionsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSectionActive, setisSectionActive] = useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const underlineRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const scrollPositions = React.useRef<number[]>(sections.map(() => 0));
  const isTransitioning = React.useRef(false);
  const touchStartY = React.useRef<number>(0);

  React.useEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, { height: i === 0 ? "100dvh" : "0px" });
      }
    });
    bgRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, { opacity: i === 0 ? 0 : 1 });
      }
    });
  }, []);

  React.useEffect(() => {
    if (activeIndex !== -1 && refs.current[activeIndex]) {
      // Save scroll position before leaving a section
      const scrollableContent = refs.current[activeIndex].querySelector('.overflow-y-auto')
      if (scrollableContent) {
        scrollPositions.current[activeIndex] = (scrollableContent as HTMLElement).scrollTop
      }
    }
  }, [activeIndex])

  const handleMouseEnterLabel = (index: number) => {
    const label = labelRefs.current[index];
    const underline = underlineRefs.current[index];
    if (label && activeIndex !== index) {
      gsap.to(label, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top left",
      });
    }
    if (underline) {
      gsap.to(underline, {
        scaleX: 0.96,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top left",
      });
    }
  };

  const handleMouseLeaveLabel = (index: number) => {
    const label = labelRefs.current[index];
    const underline = underlineRefs.current[index];
    if (label && activeIndex !== index) {
      gsap.to(label, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top left",
      });
    }
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "top left",
      });
    }
  };

  const handleOpenMenu = () => {
    // Save scroll before collapsing
    if (activeIndex !== -1) {
      const panel = refs.current[activeIndex]
      if (panel) {
        const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
        if (scrollable) {
          scrollPositions.current[activeIndex] = scrollable.scrollTop
        }
      }
    }

    setActiveIndex(-1);
    refs.current.forEach((el) => {
      if (el) {
        gsap.to(el, { height: "calc(100dvh / 6)", duration: 0.5, ease: "power2.inOut" });
      }
    });
    bgRefs.current.forEach((el) => {
      if (el) {
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    });
    setisSectionActive(false);
  };

  const handlePanelClick = (index: number) => {
    if (activeIndex === -1) {
      // Save scroll of current section before transition
      if (activeIndex !== -1) {
        const currentPanel = refs.current[activeIndex]
        if (currentPanel) {
          const scrollable = currentPanel.querySelector('.overflow-y-auto') as HTMLElement | null
          if (scrollable) {
            scrollPositions.current[activeIndex] = scrollable.scrollTop
          }
        }
      }

      setActiveIndex(index)
      refs.current.forEach((el, i) => {
        if (el) {
          if (i === index) {
            gsap
              .to(el, { height: '100dvh', duration: 0.5, ease: 'power2.inOut' })
              .then(() => setisSectionActive(true))
          } else {
            gsap.to(el, { height: '0px', duration: 0.5, ease: 'power2.inOut' })
          }
        }
      })
      if (bgRefs.current[index]) {
        gsap.to(bgRefs.current[index], { opacity: 0, duration: 0.3 })
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-dvh w-dvw overflow-hidden"
    >
      {activeIndex !== -1 && (
        <button
          onClick={handleOpenMenu}
          className="fixed top-8 left-8 z-50 bg-black/50 text-white px-4 py-2 rounded-lg font-bold text-xl hover:bg-black/70 transition-colors cursor-pointer"
        >
          ← Menu
        </button>
      )}
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          onClick={() => handlePanelClick(index)}
          onMouseEnter={() => handleMouseEnterLabel(index)}
          onMouseLeave={() => handleMouseLeaveLabel(index)}
          onWheel={(e) => {
            if (isTransitioning.current) return
            const panel = refs.current[index]
            if (!panel) return
            const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
            if (!scrollable) return

            const atTop = scrollable.scrollTop === 0
            const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1

            if (atTop && e.deltaY < 0 && index > 0) {
              animatePanels(
                refs.current[index]!,
                refs.current[index - 1]!,
                index,
                index - 1,
                setActiveIndex,
                setisSectionActive,
                scrollPositions,
                isTransitioning
              )
            } else if (atBottom && e.deltaY > 0 && index < sections.length - 1) {
              animatePanels(
                refs.current[index]!,
                refs.current[index + 1]!,
                index,
                index + 1,
                setActiveIndex,
                setisSectionActive,
                scrollPositions,
                isTransitioning
              )
            }
          }}
          onTouchStart={(e) => {
            touchStartY.current = e.touches[0].clientY
          }}
          onTouchEnd={(e) => {
            if (isTransitioning.current) return
            const delta = touchStartY.current - e.changedTouches[0].clientY
            const threshold = 50
            const panel = refs.current[index]
            if (!panel) return
            const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
            if (!scrollable) return

            const atTop = scrollable.scrollTop === 0
            const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1

            if (delta > threshold && atBottom && index < sections.length - 1) {
              animatePanels(
                refs.current[index]!,
                refs.current[index + 1]!,
                index,
                index + 1,
                setActiveIndex,
                setisSectionActive,
                scrollPositions,
                isTransitioning
              )
            } else if (delta < -threshold && atTop && index > 0) {
              animatePanels(
                refs.current[index]!,
                refs.current[index - 1]!,
                index,
                index - 1,
                setActiveIndex,
                setisSectionActive,
                scrollPositions,
                isTransitioning
              )
            }
          }}
          className={`w-full h-[calc(100dvh/6)] cursor-pointer flex items-start relative overflow-hidden`}
        >
          <div
            ref={(el) => {
              bgRefs.current[index] = el;
            }}
            className={`absolute inset-0 ${section.color} ${isSectionActive ? "z-10" : "z-30"}`}
          />
          <div
            ref={(el) => {
              labelRefs.current[index] = el;
            }}
            className={`${isSectionActive ? "z-10" : "z-30"} transition-opacity p-2 duration-300 origin-top-left ${activeIndex === -1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {section.label}
            <div
              ref={(el) => {
                underlineRefs.current[index] = el;
              }}
              className={`absolute bottom-0 left-2 w-full h-1 origin-top-left ${index === 3 ? "bg-black" : index === 1 ? "bg-transparent" : "bg-white"}`}
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div
            className={`absolute inset-0 z-20 overflow-y-auto transition-opacity duration-300 h-full ${activeIndex === -1 ? "opacity-100 pointer-events-none" : "opacity-100"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {(activeIndex !== -1 || !isSectionActive) && section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandingSections;
