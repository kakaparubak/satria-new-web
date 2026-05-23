import { rcheckImages } from "../../public/data";

const RCheckSection = () => {
  return (
    <section className="relative w-dvw h-dvh bg-radial-[circle_at_50%_50%] from-[#E0C337] from-50% to-[#9F671E] to-100%">
      <div className="relative -top-5 sm:top-0 py-8 sm:py-0 flex flex-col justify-center items-center w-full h-full">
        <img
          className="w-[55%]"
          src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779021848/Reality_Check_title_dmiyqt.png"
        ></img>
        {/* Mobile: vertical stack */}
        <div className="flex sm:hidden flex-col gap-3 w-[90%]">
          <img src={rcheckImages[0].src} className="w-full h-48 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
          <img src={rcheckImages[1].src} className="w-full h-48 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
          <img src={rcheckImages[2].src} className="w-full h-48 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
          <img src={rcheckImages[3].src} className="w-full h-48 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
          <img src={rcheckImages[4].src} className="w-full h-48 object-cover shadow-[0_5px_20px_rgba(0,0,0,0.40)] transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
        </div>
        {/* Desktop: 2-row grid */}
        <div className="hidden sm:grid grid-cols-5 grid-rows-2 gap-2.5 h-[60%] w-[90%]">
          <img src={rcheckImages[0].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] row-start-1 row-span-2 col-start-1 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          <img src={rcheckImages[1].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] row-start-1 col-start-2 col-span-3 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          <img src={rcheckImages[2].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] row-start-2 col-start-2 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          <img src={rcheckImages[3].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] row-start-2 col-start-3 col-span-2 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          <img src={rcheckImages[4].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] row-start-1 row-span-2 col-start-5 w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
        </div>
      </div>
    </section>
  );
};

export default RCheckSection;
