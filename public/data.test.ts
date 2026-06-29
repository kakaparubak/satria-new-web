import { describe, it, expect } from "vitest";
import { findRedirect, redirects } from "./data";

describe("findRedirect", () => {
  it("returns the matching entry when slug exists", () => {
    const result = findRedirect("hello");
    expect(result).toBeDefined();
    expect(result?.url).toBe("https://whatsapp.com");
  });

  it("returns undefined for an unknown slug", () => {
    const result = findRedirect("does-not-exist");
    expect(result).toBeUndefined();
  });

  it("returns img and text when present on the entry", () => {
    const result = findRedirect("sample");
    expect(result?.img).toContain("unsplash.com");
    expect(result?.text).toMatch(/redirected/);
  });
});

describe("redirects array", () => {
  it("contains the existing two entries", () => {
    const slugs = redirects.map(r => r.slug);
    expect(slugs).toContain("hello");
    expect(slugs).toContain("BinusianBeachFestival2026");
  });

  it("all entries have a slug and url", () => {
    for (const r of redirects) {
      expect(r.slug).toBeTruthy();
      expect(r.url).toBeTruthy();
    }
  });
});
