const HeroSection = () => {
  return (
    <section className="hero w-dvw h-dvh flex items-center justify-end relative overflow-hidden">
      <video
        className="absolute w-dvw h-dvh object-cover -z-100 "
        autoPlay
        preload="auto"
        muted
        loop
        playsInline
        controls={false}
        data-speed="0.75"
      >
        <source
          src="https://res.cloudinary.com/dipyszxjg/video/upload/q_auto/f_auto/v1779189503/Highlights_2_bgcifp.mp4"
        ></source>
      </video>
      <div className="absolute h-dvh w-dvw bg-radial-[circle_at_25%_50%] from-transparent to-black/70 to-69% -z-1"></div>
      <div className="leading-none relative text-right flex flex-col items-end mr-[5%]">
        <h1 className="text-[10.5rem] font-medium font-anton tracking-tight text-white">SATRIA</h1>
        <h1 className="text-[10.5rem] font-medium font-anton tracking-tight text-white">CHANDRA</h1>
        <img className="w-[60%]" src="../../public/lighting-designer.png" />
      </div>
    </section>
  )
}

export default HeroSection