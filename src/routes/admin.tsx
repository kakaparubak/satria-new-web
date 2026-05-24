import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const adminHtmlPath = path.join(process.cwd(), "public", "admin", "index.html");
  const adminHtml = fs.readFileSync(adminHtmlPath, "utf-8");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: adminHtml }}
      className="tina-admin-wrapper"
    />
  );
}