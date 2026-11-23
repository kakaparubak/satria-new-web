import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HeroSection from "./HeroSection";

describe("hero media delivery", () => {
  it("renders a poster and smaller mobile/desktop videos without waiting for hydration", () => {
    const html = renderToStaticMarkup(<HeroSection />);
    const { container } = render(<HeroSection />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("poster")).toMatch(/so_1.*\.jpg$/);
    expect(html).toContain("poster=");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("preload", "auto");
    const sources = [...video.querySelectorAll("source")];
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("media", "(max-width: 767px)");
    expect(sources[0].src).toContain("w_1280,h_720");
    expect(sources[1].src).toContain("w_1920,h_1080");
    for (const source of sources) {
      expect(source.src).toContain("fps_30");
      expect(source.src).toContain("ac_none");
      expect(source.src).toContain("f_mp4,vc_h264");
      expect(source).toHaveAttribute("type", "video/mp4");
    }
  });
});
