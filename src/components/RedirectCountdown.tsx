import { useEffect, useRef, useState } from "react";

interface RedirectCountdownProps {
  slug: string;
  url: string;
  img?: string;
  text?: string;
}

const COUNTDOWN_SECONDS = 5;

export default function RedirectCountdown({ slug, url, img, text }: RedirectCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  // Guard against double-fire: button click triggers redirect, then state update
  // re-runs the effect at secondsLeft=0 which would also redirect. The ref
  // ensures only the first path calls window.location.replace.
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current) return;
    const id = setInterval(() => {
      if (redirectedRef.current) {
        clearInterval(id);
        return;
      }
      setSecondsLeft(s => {
        if (s <= 1) {
          redirectedRef.current = true;
          clearInterval(id);
          // schedule the navigation on next tick so the
          // UI can render the final "0" frame first
          window.location.replace(url);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [url]);

  const handleRedirectNow = () => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.location.replace(url);
  };

  const backgroundStyle: React.CSSProperties = img
    ? { backgroundImage: `url(${img})` }
    : {};

  return (
    <>
      <meta httpEquiv="refresh" content={`${COUNTDOWN_SECONDS};url=${url}`} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1a1a1a",
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...backgroundStyle,
        }}
      >
        {/* Dark gradient overlay (always present for readability) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 40%, transparent 70%)",
          }}
        />
        {/* Brand strip */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 32,
            right: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <span style={{ fontWeight: 700, color: "#fff" }}>/to/{slug}</span>
          <span>redirect in...</span>
        </div>
        {/* Content */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "60px 32px 44px",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {text && (
            <div
              data-testid="redirect-text"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 20,
                lineHeight: 1.35,
                marginBottom: 24,
                fontWeight: 500,
                maxWidth: 780,
              }}
            >
              {text}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1 }}>
              {secondsLeft}
              <small
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  opacity: 0.7,
                  display: "block",
                  marginTop: 4,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                seconds
              </small>
            </div>
            <button
              onClick={handleRedirectNow}
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                padding: "14px 26px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.5,
                cursor: "pointer",
                textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              Redirect Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}