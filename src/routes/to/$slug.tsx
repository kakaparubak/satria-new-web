import { createFileRoute, notFound } from "@tanstack/react-router";
import { findRedirect } from "../../../public/data";
import RedirectCountdown from "#/components/RedirectCountdown";

export const Route = createFileRoute("/to/$slug")({
  loader: ({ params }) => {
    const redirect = findRedirect(params.slug);
    if (!redirect) throw notFound();
    return redirect;
  },
  component: ToSlugPage,
  notFoundComponent: () => <div>Redirect not found.</div>,
});

function ToSlugPage() {
  const redirect = Route.useLoaderData();
  return (
    <RedirectCountdown
      slug={redirect.slug}
      url={redirect.url}
      img={redirect.img}
      text={redirect.text}
    />
  );
}
