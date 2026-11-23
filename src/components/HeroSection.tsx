const HeroSection = () => {
  return (
    <section className="hero w-dvw h-dvh flex items-center justify-end relative overflow-hidden">
      <video
        className="absolute w-dvw h-dvh object-cover -z-100 "
        autoPlay
        preload="auto"
        poster="https://res.cloudinary.com/dipyszxjg/video/upload/c_limit,w_1280,h_720/so_1/q_auto/v1779189503/Highlights_2_bgcifp.jpg"
        muted
        loop
        playsInline
        controls={false}
        data-speed="0.75"
      >
        <source
          media="(max-width: 767px)"
          src="https://res.cloudinary.com/dipyszxjg/video/upload/c_limit,w_1280,h_720/fps_30/ac_none/q_auto/f_mp4,vc_h264/v1779189503/Highlights_2_bgcifp.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/dipyszxjg/video/upload/c_limit,w_1920,h_1080/fps_30/ac_none/q_auto/f_mp4,vc_h264/v1779189503/Highlights_2_bgcifp.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute h-dvh w-dvw bg-radial-[circle_at_25%_50%] from-transparent to-black/70 to-69% -z-1"></div>
      <div className="leading-none relative text-right flex flex-col items-end mr-[2%] sm:mr-[5%]">
        <h1 className="text-7xl md:text-9xl lg:text-[10.5rem] font-medium font-anton tracking-tight text-white">
          SATRIA
        </h1>
        <h1 className="text-7xl md:text-9xl lg:text-[10.5rem] font-medium font-anton tracking-tight text-white">
          CHANDRA
        </h1>
        <img
          className="w-[80%] sm:w-[70%]"
          src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779544340/lighting-designer_tfijbb.png"
        />
      </div>
    </section>
  );
};

export default HeroSection;
