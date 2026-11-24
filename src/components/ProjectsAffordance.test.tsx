import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProjectsSection from "./ProjectsSection";

describe("project expansion cues", () => {
  it("renders the first gallery open with a minus, and the remaining galleries closed with pluses", () => {
    const html = renderToStaticMarkup(<ProjectsSection />);
    expect(html).toContain("−");
    const { container } = render(<ProjectsSection />);
    const rows = [...container.querySelectorAll(".mouse-hover-detect")];
    expect(rows[0].children[1]).toHaveStyle({
      height: "auto",
      opacity: "1",
      visibility: "visible",
    });
    expect(within(rows[0] as HTMLElement).getByText("−")).toBeInTheDocument();
    for (const row of rows.slice(1)) {
      expect(row.children[1]).toHaveStyle({ visibility: "hidden" });
      expect(within(row as HTMLElement).getByText("+")).toBeInTheDocument();
    }
  });

  it("switches the cue between plus and minus as galleries open and close", async () => {
    const { container } = render(<ProjectsSection />);
    const rows = container.querySelectorAll(".mouse-hover-detect");
    const row = rows[1] as HTMLElement;
    fireEvent.mouseEnter(row);
    expect(within(row).getByText("−")).toBeInTheDocument();
    await waitFor(() =>
      expect(row.children[1]).toHaveStyle({ visibility: "visible" }),
    );
    fireEvent.pointerLeave(row, { pointerType: "mouse" });
    expect(within(row).getByText("+")).toBeInTheDocument();
    await waitFor(() =>
      expect(row.children[1]).toHaveStyle({ visibility: "hidden" }),
    );
    fireEvent.pointerLeave(rows[0], { pointerType: "mouse" });
    expect(within(rows[0] as HTMLElement).getByText("+")).toBeInTheDocument();
    fireEvent.touchStart(row);
    fireEvent.mouseEnter(row);
    expect(within(row).getByText("−")).toBeInTheDocument();
  });
});
