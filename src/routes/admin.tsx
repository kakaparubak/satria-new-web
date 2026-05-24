import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <iframe src="/admin/index.html" className="w-full h-screen border-0" />
  );
}
