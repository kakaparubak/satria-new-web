const SkillsSection = () => {
  return (
    <section className="w-dvw h-dvh bg-radial-[circle_at_50%_50%] from-27% from-[#992729] via-63% via-[#EE3A3D] to-105% to-[#7C1C1E]">
      <div className="w-full h-auto sm:h-full px-[4%] py-[6%] flex flex-col items-center justify-center gap-6">
        {/* DESIGN */}
        <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
          <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold text-[6cqw] tracking-tighter leading-none hidden sm:block">
            DESIGN
          </p>
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row">
            <img
              className="h-1/2 sm:h-full sm:w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017197/Sketch_Plot_RAMADHAN_JAZZ_ooxf67.png"
            ></img>
            <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#F3F3F3]">
              <p className="leading-tight text-black p-[10%] font-inter text-right text-base sm:text-xl font-medium tracking-tighter">
                Utilizing WYSIWYG for precise dimensional accuracy and high-fidelity fixture plotting
              </p>
            </div>
          </div>
        </div>
        {/* PRE-VISUALIZER */}
        <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row-reverse">
            <img
              className="h-1/2 sm:h-full sm:w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/PDI_Main_photo_lorql0.png"
            ></img>
            <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#1B1B1B]">
              <p className="leading-tight text-[#EAEAEA] p-[10%] font-inter text-left text-base sm:text-xl font-medium tracking-tighter">
                Seeing the finished stage before construction even begins
              </p>
            </div>
          </div>
          <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter text-nowrap font-semibold text-[6cqw] tracking-tighter leading-none hidden sm:block">
            PRE-VISUALIZER
          </p>
        </div>
        {/* PROGRAMMING */}
        <div className="w-full h-[120px] sm:h-full justify-center flex gap-3 @container-size">
          <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold text-[6cqw] tracking-tighter leading-none hidden sm:block">
            PROGRAMMING
          </p>
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row">
            <img
              className="h-1/2 sm:h-full sm:w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017266/IMG_8797.JPG_n229yx.jpg"
            ></img>
            <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#1B1C1B]">
              <p className="leading-tight text-[#EAEAEA] p-[10%] font-inter text-right text-base sm:text-xl font-medium tracking-tighter">
                Programming anywhere, from the home studio to the venue
              </p>
            </div>
          </div>
        </div>
        {/* OPERATE */}
        <div className="w-full h-[120px] sm:h-full justify-center flex gap-3 @container-size">
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row-reverse">
            <img
              className="h-1/2 sm:h-full sm:w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/20251003_232255_dfs9pv.jpg"
            ></img>
            <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#F3F3F3]">
              <p className="leading-tight text-black p-[10%] font-inter text-left text-base sm:text-xl font-medium tracking-tighter">
                It's not just about the console, it's about the craft
              </p>
            </div>
          </div>
          <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold text-[6cqw] tracking-tighter leading-none hidden sm:block">
            OPERATE
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
