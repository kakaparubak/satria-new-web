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

const ExpandingSections = ({ sections }: ExpandingSectionsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const underlineRefs = React.useRef<(HTMLDivElement | null)[]>([]);

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

  const handleClose = () => {
    if (activeIndex !== null) {
      setActiveIndex(null);
      refs.current.forEach((el) => {
        if (el) {
          gsap.to(el, { height: "20dvh", duration: 0.5, ease: "power2.inOut" });
        }
      });
      if (bgRefs.current[activeIndex]) {
        gsap.to(bgRefs.current[activeIndex], { opacity: 1, duration: 0.3 });
      }
      setIsSectionVisible(false);
    }
  };

  const handlePanelClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      refs.current.forEach((el, i) => {
        if (el) {
          if (i === index) {
            gsap
              .to(el, { height: "100dvh", duration: 0.5, ease: "power2.inOut" })
              .then(() => setIsSectionVisible(true));
          } else {
            gsap.to(el, { height: "0px", duration: 0.5, ease: "power2.inOut" });
          }
        }
      });
      if (bgRefs.current[index]) {
        gsap.to(bgRefs.current[index], { opacity: 0, duration: 0.3 });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-dvh w-dvw overflow-hidden"
    >
      {activeIndex !== null && (
        <button
          onClick={handleClose}
          className="fixed top-8 left-8 z-50 bg-black/50 text-white px-4 py-2 rounded-lg font-bold text-xl hover:bg-black/70 transition-colors cursor-pointer"
        >
          ← Back
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
          className={`w-full h-[20dvh] cursor-pointer flex items-start relative overflow-hidden`}
        >
          <div
            ref={(el) => {
              bgRefs.current[index] = el;
            }}
            className={`absolute inset-0 ${section.color} ${isSectionVisible ? "z-10" : "z-30"}`}
          />
          <div
            ref={(el) => {
              labelRefs.current[index] = el;
            }}
            className={`z-30 transition-opacity p-2 duration-300 origin-top-left ${activeIndex === index ? "opacity-0" : "opacity-100"}`}
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
            className="absolute inset-0 z-20 overflow-y-auto h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandingSections;
