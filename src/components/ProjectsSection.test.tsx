import { fireEvent, render, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProjectsSection from "./ProjectsSection";
import { projects } from "../../public/data";

describe("project gallery background loading", () => {
  it("registers all galleries for the ordered loader before hover without eager preloads", () => {
    const html = renderToStaticMarkup(<ProjectsSection />);
    const { container } = render(<ProjectsSection />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(
      projects.reduce((total, project) => total + project.imgs.length, 0),
    );
    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image).toHaveAttribute("data-src");
      expect(image).not.toHaveAttribute("src");
    }
    expect(html).not.toContain('rel="preload"');
  });

  it("opens and closes a gallery without replacing its preloaded images", async () => {
    const { container } = render(<ProjectsSection />);
    const row = container.querySelector(".mouse-hover-detect")!;
    const image = row.querySelector("img");
    fireEvent.mouseEnter(row);
    await waitFor(() =>
      expect(row.children[1]).toHaveStyle({ visibility: "visible" }),
    );
    fireEvent.pointerLeave(row, { pointerType: "mouse" });
    await waitFor(() =>
      expect(row.children[1]).toHaveStyle({ visibility: "hidden" }),
    );
    expect(row.querySelector("img")).toBe(image);
  });

  it("keeps a touched gallery open across compatibility mouse events", async () => {
    const { container } = render(<ProjectsSection />);
    const row = container.querySelector(".mouse-hover-detect")!;
    fireEvent.touchStart(row);
    fireEvent.mouseEnter(row);
    await waitFor(() =>
      expect(row.children[1]).toHaveStyle({ visibility: "visible" }),
    );
  });
});
