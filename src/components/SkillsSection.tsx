const SkillsSection = () => {
  return (
    <section className="w-dvw h-dvh bg-radial-[circle_at_50%_50%] from-27% from-[#992729] via-63% via-[#EE3A3D] to-105% to-[#7C1C1E]">
      <div className="w-full h-full px-[4%] py-[6%] flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8">
        <div className="w-full h-full justify-center flex items-end gap-3 @container-size">
          <p className="hidden md:block lg:block text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-[6cqw] tracking-tighter leading-none">
            DESIGN
          </p>
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full md:w-1/2 lg:w-1/2 h-full flex">
            <img
              className="h-full w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017197/Sketch_Plot_RAMADHAN_JAZZ_ooxf67.png"
            ></img>
            <div className="flex flex-col justify-center items-center h-full w-1/2 gap-0 p-4 bg-[#F3F3F3]">
              <p className="block md:hidden lg:hidden text-black font-inter tracking-tighter font-bold text-xl p-0 m-0 w-full text-right">DESIGN</p>
              <p className="leading-tight text-black font-inter text-right text-[0.875rem] md:text-lg lg:text-xl font-medium tracking-tighter">
                Utilizing WYSIWYG for precise dimensional accuracy and
                high-fidelity fixture plotting
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full justify-center flex items-end gap-3 @container-size">
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full md:w-1/2 lg:w-1/2 h-full flex">
            <div className="flex flex-col justify-center items-center h-full w-1/2 gap-0 p-4 bg-[#1B1B1B]">
              <p className="block md:hidden lg:hidden text-[#EAEAEA] font-inter tracking-tighter font-bold text-xl p-0 m-0 w-full text-left">PRE-VISUALIZER</p>
              <p className="leading-tight text-[#EAEAEA] font-inter text-left text-[0.875rem] md:text-lg lg:text-xl font-medium tracking-tighter">
                Seeing the finished stage before construction even begins
              </p>
            </div>
            <img
              className="h-full w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/PDI_Main_photo_lorql0.png"
            ></img>
          </div>
          <p className="hidden md:block lg:block text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter text-nowrap font-semibold h-1/2 text-[6cqw] tracking-tighter leading-none">
            PRE-VISUALIZER
          </p>
        </div>
        <div className="w-full h-full justify-center flex gap-3 @container-size">
          <p className="hidden md:block lg:block text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-[6cqw] tracking-tighter leading-none">
            PROGRAMMING
          </p>
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full md:w-1/2 lg:w-1/2 h-full flex">
            <img
              className="h-full w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017266/IMG_8797.JPG_n229yx.jpg"
            ></img>
            <div className="flex flex-col justify-center items-center h-full w-1/2 gap-0 p-4 bg-[#1B1B1B]">
              <p className="block md:hidden lg:hidden text-[#EAEAEA] font-inter tracking-tighter font-bold text-xl p-0 m-0 w-full text-right">PROGRAMMING</p>
              <p className="leading-tight text-[#EAEAEA] font-inter text-right text-[0.875rem] md:text-lg lg:text-xl font-medium tracking-tighter">
                Programming anywhere, from the home studio to the venue
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full justify-center flex gap-3 @container-size">
          <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full md:w-1/2 lg:w-1/2 h-full flex">
            <div className="flex flex-col justify-center items-center h-full w-1/2 gap-0 p-4 bg-[#F3F3F3]">
              <p className="block md:hidden lg:hidden text-black font-inter tracking-tighter font-bold text-xl p-0 m-0 w-full text-left">OPERATE</p>
              <p className="leading-tight text-black font-inter text-left text-[0.875rem] md:text-lg lg:text-xl font-medium tracking-tighter">
                It's not just about the console, it's about the craft
              </p>
            </div>
            <img
              className="h-full w-1/2 object-cover"
              src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/20251003_232255_dfs9pv.jpg"
            ></img>
          </div>
          <p className="hidden md:block lg:block text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-[6cqw] tracking-tighter leading-none">
            OPERATE
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;