import { createFileRoute, redirect } from "@tanstack/react-router";
import { redirects } from "../../../public/data";

interface RedirectItem {
  slug: string;
  url: string;
}

export const Route = createFileRoute("/to/$slug")({
  loader: ({ params }) => {
    const { slug } = params;
    const match = (redirects as unknown as RedirectItem[]).find(
      (r) => r.slug === slug
    );

    if (match) {
      throw redirect({
        href: match.url,
      });
    } else {
      throw redirect({
        to: "/",
      });
    }
  },
});
