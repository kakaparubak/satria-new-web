import { rcheckImages } from "../../public/data";

const rcheckGridLayout = [
  { src: rcheckImages[0].src, className: "row-start-1 row-span-2 col-start-1" },
  { src: rcheckImages[1].src, className: "row-start-1 row-span-1 col-start-2 col-span-3" },
  { src: rcheckImages[2].src, className: "row-start-2 row-span-1 col-start-2" },
  { src: rcheckImages[3].src, className: "row-start-2 row-span-1 col-start-3 col-span-2" },
  { src: rcheckImages[4].src, className: "row-start-1 row-span-2 col-start-5" },
];

const RCheckSection = () => {
  return (
    <section className="relative w-dvw md:h-dvh lg:h-dvh bg-radial-[circle_at_50%_50%] from-[#E0C337] from-50% to-[#9F671E] to-100%">
      <div className="relative top-0 md:-top-6 lg:-top-8 py-0 flex flex-col justify-center items-center w-full h-full">
        <img
          className="w-[95%] lg:w-[60%] h-auto -mb-3"
          src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779021848/Reality_Check_title_dmiyqt.png"
        ></img>
        {/* Mobile: vertical stack */}
        <div className="flex sm:hidden flex-col gap-3 w-[80%] pb-8">
          {rcheckImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              className="w-full h-40 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05]"
            />
          ))}
        </div>
        {/* Desktop: 2-row grid */}
        <div className="hidden sm:block w-[90%] h-[60%]">
          <div className="grid grid-cols-5 grid-rows-2 gap-2.5 h-full w-full">
            {rcheckGridLayout.map((item, i) => (
              <img
                key={i}
                src={item.src}
                className={`shadow-[0_5px_20px_rgba(0,0,0,0.40)] ${item.className} w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RCheckSection;