import { createFileRoute } from "@tanstack/react-router";

const adminHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/admin/assets/favicon-eb31bc17.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TinaCMS</title>
    <script type="module" crossorigin src="/admin/assets/index-64f0607c.js"></script>
    <link rel="stylesheet" href="/admin/assets/index-e2d6f2f7.css">
  </head>
  <body class="tina-tailwind">
    <div id="root"></div>
  </body>
</html>`;

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: adminHtml }}
      className="tina-admin-wrapper"
    />
  );
}