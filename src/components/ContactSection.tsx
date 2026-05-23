import { RxArrowBottomRight } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-dvh w-dvw bg-radial-[circle_at_50%_0%] from-blue-900 via-blue-300 to-blue-800 via-60% to-120%">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          <p
            aria-hidden="true"
            className="marquee-content text-nowrap font-inter -tracking-[0.1em]"
          >
            SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA
            CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA
            SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA
            CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA
          </p>
          <p
            aria-hidden="true"
            className="marquee-content text-nowrap font-inter -tracking-[0.1em]"
          >
            SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA
            CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA
            SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA
            CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA SATRIA CHANDRA
          </p>
        </div>
      </div>
      <div>
        <h1 className="top-10 font-inter font-medium text-xl md:text-3xl lg:text-4xl pb-3 md:pb-0 lg:pb-0 italic">
          Let&apos;s get in touch!
        </h1>
        <div className="font-anton tracking-tight text-2xl md:text-6xl lg:text-8xl text-white flex justify-center items-center gap-3 underline underline-offset-0 decoration-0 decoration-transparent hover:decoration-4 hover:scale-105 hover:underline hover:underline-offset-4 hover:decoration-amber-300 transition-all w-full">
          <a
            href="mailto:contact@satriachandra.com"
            target="_blank"
            className="break-all"
          >
            CONTACT@SATRIACHANDRA.COM
          </a>
          <RxArrowBottomRight className="" />
        </div>
        <div className="font-inter flex flex-col md:flex-row lg:flex-row items-baseline md:items-center lg:items-center justify-between mt-4 gap-2 md:gap-0 lg:gap-0 text-lg md:text-xl lg:text-2xl">
          <div className="flex gap-2 justify-center items-center hover:scale-105 transition-all">
            <FaWhatsapp />
            <a href="https://wa.me/6287780008482" target="_blank">
              +62 877-8000-8482
            </a>
          </div>
          <div className="flex gap-2 justify-center items-center hover:scale-105 transition-all">
            <FaInstagram />
            <a
              href="https://www.instagram.com/satriaberchandra?utm_source=ig_web_button_share_sheet&igsh=MWMxa3EyZnExMXQxMA=="
              target="_blank"
            >
              satriaberchandra
            </a>
          </div>
          <div className="flex gap-2 justify-center items-center hover:scale-105 transition-all">
            <FaLinkedinIn />
            <a
              href="https://www.linkedin.com/in/satria-chandra-dharmaputra-a3a058260/"
              target="_blank"
            >
              Satria Chandra Dharmaputra
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
