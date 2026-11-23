import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import ExpandingSections from "./ExpandingSections";

const sections = [
  {
    label: "HOME",
    content: (
      <div>
        <video data-testid="hero-video" />
        <input aria-label="Retained value" />
      </div>
    ),
    color: "bg-black",
  },
  {
    label: "BIOGRAPHY",
    content: (
      <img alt="Biography photo" data-src="https://example.com/bio.jpg" />
    ),
    color: "bg-green-900",
  },
  {
    label: "GALLERY",
    content: (
      <div>
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            alt={`Gallery ${i}`}
            data-src={`https://example.com/g${i}.jpg`}
          />
        ))}
      </div>
    ),
    color: "bg-yellow-900",
  },
  {
    label: "SKILLS",
    content: (
      <img alt="Skills photo" data-src="https://example.com/skills.jpg" />
    ),
    color: "bg-red-900",
  },
];

afterEach(() => vi.useRealTimers());

describe("ordered page media loading", () => {
  it("mounts all content in SSR without eagerly preloading section images", () => {
    const html = renderToStaticMarkup(
      <ExpandingSections sections={sections} />,
    );
    expect(html).toContain('alt="Biography photo"');
    expect(html).toContain('alt="Skills photo"');
    expect(html).not.toContain('href="https://example.com/bio.jpg"');
  });

  it("starts after video playback and loads whole sections in order, two images at a time", () => {
    render(<ExpandingSections sections={sections} />);
    const bio = screen.getByAltText("Biography photo");
    const gallery = [1, 2, 3].map((i) => screen.getByAltText(`Gallery ${i}`));
    const skills = screen.getByAltText("Skills photo");
    expect(bio).not.toHaveAttribute("src");
    fireEvent.playing(screen.getByTestId("hero-video"));
    expect(bio).toHaveAttribute("src", "https://example.com/bio.jpg");
    expect(gallery[0]).not.toHaveAttribute("src");
    fireEvent.load(bio);
    expect(gallery[0]).toHaveAttribute("src");
    expect(gallery[1]).toHaveAttribute("src");
    expect(gallery[2]).not.toHaveAttribute("src");
    fireEvent.load(gallery[0]);
    expect(gallery[2]).toHaveAttribute("src");
    expect(skills).not.toHaveAttribute("src");
    fireEvent.error(gallery[1]);
    expect(skills).not.toHaveAttribute("src");
    fireEvent.load(gallery[2]);
    expect(skills).toHaveAttribute("src");
  });

  it("prioritizes a jumped-to section without unmounting other content", async () => {
    const { container } = render(<ExpandingSections sections={sections} />);
    const input = screen.getByLabelText("Retained value");
    fireEvent.change(input, { target: { value: "keep me" } });
    fireEvent.click(container.querySelector("button")!);
    fireEvent.click(screen.getByText("SKILLS", { exact: true }));
    await waitFor(() =>
      expect(screen.getByAltText("Skills photo")).toHaveAttribute("src"),
    );
    expect(screen.getByLabelText("Retained value")).toBe(input);
    expect(input).toHaveValue("keep me");
    expect(screen.getByAltText("Biography photo")).toBeInTheDocument();
  });

  it("does not deadlock if autoplay is blocked or an image never finishes", () => {
    vi.useFakeTimers();
    render(<ExpandingSections sections={sections} />);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByAltText("Biography photo")).toHaveAttribute("src");
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByAltText("Gallery 1")).toHaveAttribute("src");
  });

  it("removes pending timers and listeners on unmount", () => {
    vi.useFakeTimers();
    const { unmount } = render(<ExpandingSections sections={sections} />);
    fireEvent.playing(screen.getByTestId("hero-video"));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
