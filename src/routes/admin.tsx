import { createFileRoute } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  loader: async () => {
    const adminHtmlPath = join(process.cwd(), "public", "admin", "index.html");
    const adminHtml = readFileSync(adminHtmlPath, "utf-8");
    return { adminHtml };
  },
});

function AdminPage() {
  const data = Route.useLoaderData();

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data.adminHtml }}
      className="tina-admin-wrapper"
    />
  );
}