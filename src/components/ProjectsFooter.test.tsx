import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsSection from "./ProjectsSection";
import { projects } from "../../public/data";

describe("project list closing message", () => {
  it("replaces the three statistics with AND MANY MORE without removing projects", () => {
    const { container } = render(<ProjectsSection />);
    expect(screen.getByText("AND MANY MORE...")).toBeInTheDocument();
    for (const label of [
      "TOTAL",
      "HOURS SPENT ON WYSIWYG",
      "PEERS RAGEBAITED",
      "2000+",
      "UNCOUNTABLE",
    ]) {
      expect(
        screen.queryByText(label, { exact: true }),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.queryByText(`${projects.length} PROJECTS`, { exact: true }),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll(".mouse-hover-detect")).toHaveLength(
      projects.length,
    );
  });
});
