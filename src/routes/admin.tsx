import { createFileRoute } from "@tanstack/react-router";
import adminHtml from "#/public/admin/index.html?raw";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

export function AdminPage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: adminHtml }}
      className="tina-admin-wrapper"
    />
  );
}