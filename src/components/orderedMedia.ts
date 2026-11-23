// Sources stay in data-src during SSR so React's automatic preloads cannot
// bypass the video-first queue. This loader owns src; React owns the markup.
export function createOrderedMediaLoader(root: HTMLElement) {
  const groups = Array.from(
    root.querySelectorAll<HTMLElement>("[data-media-section]"),
  ).map((section) =>
    Array.from(section.querySelectorAll<HTMLImageElement>("img[data-src]")),
  );
  const pending = new Set(groups.flat());
  const running = new Map<HTMLImageElement, () => void>();
  let started = false;
  let disposed = false;
  let priority = -1;
  const video = root.querySelector("video");
  root.dataset.mediaLoading = "waiting";

  function pump() {
    if (!started || disposed) return;
    // A section is completed before beginning the next. Explicit navigation
    // can promote another section, but never launches more than two requests.
    const hasWork = (images: HTMLImageElement[]) =>
      images.some((img) => pending.has(img) || running.has(img));
    const group =
      priority >= 0 && hasWork(groups[priority] ?? [])
        ? groups[priority]
        : groups.find(hasWork);
    if (!group) {
      root.dataset.mediaLoading = "complete";
      return;
    }
    root.dataset.mediaLoading = "loading";
    for (const img of group) {
      if (running.size >= 2) break;
      if (!pending.delete(img)) continue;
      img.dataset.mediaState = "loading";
      img.loading = "eager";
      img.decoding = "async";
      img.fetchPriority = group === groups[priority] ? "high" : "low";
      let settled = false;
      const cleanup = () => {
        clearTimeout(timer);
        img.removeEventListener("load", loaded);
        img.removeEventListener("error", failed);
      };
      const finish = (state: "loaded" | "error") => {
        if (settled || disposed) return;
        settled = true;
        cleanup();
        running.delete(img);
        img.dataset.mediaState = state;
        pump();
      };
      const loaded = () => finish("loaded");
      const failed = () => finish("error");
      const timer = setTimeout(() => {
        img.removeAttribute("src");
        failed();
      }, 15000);
      running.set(img, cleanup);
      img.addEventListener("load", loaded);
      img.addEventListener("error", failed);
      img.src = img.dataset.src!;
    }
  }

  function start() {
    if (disposed || started) return;
    started = true;
    clearTimeout(heroTimeout);
    pump();
  }
  // Autoplay restrictions or a failed video must not block the rest of the page.
  const heroTimeout = setTimeout(start, 8000);
  video?.addEventListener("playing", start);
  video?.addEventListener("error", start, true);
  if (!video || (!video.paused && video.readyState >= 3)) start();

  return {
    prioritize(index: number) {
      if (disposed || index < 1) return;
      priority = index;
      // A visitor returning to a failed section gets one fresh attempt.
      for (const img of groups[index] ?? []) {
        if (img.dataset.mediaState === "error") pending.add(img);
      }
      if (started) pump();
      else start();
    },
    dispose() {
      disposed = true;
      clearTimeout(heroTimeout);
      video?.removeEventListener("playing", start);
      video?.removeEventListener("error", start, true);
      for (const cleanup of running.values()) cleanup();
      running.clear();
      pending.clear();
    },
  };
}
