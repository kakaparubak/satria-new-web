import { createFileRoute } from "@tanstack/react-router";
import { redirects } from "/data";

interface RedirectItem {
  slug: string;
  url: string;
}

export const Route = createFileRoute("/to/$slug")({
  loader: ({ params }) => {
    const { slug } = params;
    const match = (redirects as unknown as { items?: RedirectItem[] })?.items?.find((r) => r.slug === slug);

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

