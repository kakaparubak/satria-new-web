import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import RedirectCountdown from "./RedirectCountdown";

describe("RedirectCountdown", () => {
  let replaceSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    replaceSpy = vi.fn();
    // jsdom doesn't navigate on replace; stub the method
    Object.defineProperty(window, "location", {
      value: { replace: replaceSpy },
      writable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the text when provided", () => {
    render(<RedirectCountdown slug="hello" url="https://example.com" text="Heading text" />);
    expect(screen.getByText("Heading text")).toBeInTheDocument();
  });

  it("does not render a text block when text is omitted", () => {
    const { container } = render(<RedirectCountdown slug="hello" url="https://example.com" />);
    // The component uses a specific data-testid on the text block when present
    expect(container.querySelector("[data-testid='redirect-text']")).toBeNull();
  });

  it("applies the img URL as a background image when provided", () => {
    const { container } = render(
      <RedirectCountdown slug="hello" url="https://example.com" img="https://example.com/bg.jpg" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.backgroundImage).toContain("https://example.com/bg.jpg");
  });

  it("uses a solid background when no img is provided", () => {
    const { container } = render(<RedirectCountdown slug="hello" url="https://example.com" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.backgroundImage).toBe("");
  });

  it("renders a meta refresh tag pointing at the target url", () => {
    render(<RedirectCountdown slug="hello" url="https://example.com" />);
    const meta = document.querySelector('meta[http-equiv="refresh"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toBe("5;url=https://example.com");
  });

  it("clicking 'Redirect Now' calls window.location.replace once", () => {
    render(<RedirectCountdown slug="hello" url="https://example.com" />);
    fireEvent.click(screen.getByRole("button", { name: /redirect now/i }));
    expect(replaceSpy).toHaveBeenCalledTimes(1);
    expect(replaceSpy).toHaveBeenCalledWith("https://example.com");
  });

  it("auto-redirects after 5 seconds", () => {
    render(<RedirectCountdown slug="hello" url="https://example.com" />);
    expect(replaceSpy).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(replaceSpy).toHaveBeenCalledTimes(1);
    expect(replaceSpy).toHaveBeenCalledWith("https://example.com");
  });

  it("clears the interval on unmount (no leaked timer)", () => {
    const { unmount } = render(<RedirectCountdown slug="hello" url="https://example.com" />);
    unmount();
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(replaceSpy).not.toHaveBeenCalled();
  });

  it("does not double-fire when button is clicked before auto-redirect", () => {
    render(<RedirectCountdown slug="hello" url="https://example.com" />);
    fireEvent.click(screen.getByRole("button", { name: /redirect now/i }));
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(replaceSpy).toHaveBeenCalledTimes(1);
  });
});
