import { createFileRoute } from "@tanstack/react-router";
import fs from "fs";
import path from "path";

interface RedirectItem {
  slug: string;
  url: string;
}

function getRedirectsData(): RedirectItem[] {
  const filePath = path.join(process.cwd(), "content", "redirects.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Parse frontmatter
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const frontmatter = match[1];
  const itemsMatch = frontmatter.match(/items:\s*\n([\s\S]*)$/);
  if (!itemsMatch) return [];

  const itemsContent = itemsMatch[1];
  const items: RedirectItem[] = [];

  // Parse YAML list items
  const itemRegex = /-\s+slug:\s*(.+?)\n\s+url:\s*(.+?)(?=\n\s*-\s+slug:|$)/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(itemsContent)) !== null) {
    items.push({
      slug: itemMatch[1].trim(),
      url: itemMatch[2].trim(),
    });
  }

  return items;
}

export const Route = createFileRoute("/to/$slug")({
  loader: ({ params }) => {
    const { slug } = params;
    const redirects = getRedirectsData();
    const match = redirects.find((r) => r.slug === slug);

    if (match) {
      return new Response(null, {
        status: 302,
        headers: { Location: match.url },
      });
    }

    // Fallback: redirect to home
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  },
});

