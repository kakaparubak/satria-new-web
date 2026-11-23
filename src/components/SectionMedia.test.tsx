import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatsSection from "./StatsSection";
import RCheckSection from "./RCheckSection";
import SkillsSection from "./SkillsSection";

for (const [name, Component] of [
  ["Biography", StatsSection],
  ["Reality Check", RCheckSection],
  ["Skills", SkillsSection],
] as const) {
  describe(`${name} media`, () => {
    it("lets the ordered loader assign image sources instead of fetching immediately", () => {
      const { container } = render(<Component />);
      const images = container.querySelectorAll("img");
      expect(images.length).toBeGreaterThan(0);
      for (const image of images) {
        expect(image).toHaveAttribute("data-src");
        expect(image).not.toHaveAttribute("src");
      }
    });
  });
}
