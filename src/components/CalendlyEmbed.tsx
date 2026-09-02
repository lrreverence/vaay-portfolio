"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const CALENDLY_URL = "https://calendly.com/caesarisidrovaay/30min";

function calendlySrc(theme: string | undefined) {
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    embed_type: "Inline",
  });

  if (theme === "dark") {
    params.set("background_color", "030712");
    params.set("text_color", "f8fafc");
    params.set("primary_color", "e2e8f0");
  } else {
    params.set("background_color", "ffffff");
    params.set("text_color", "0a0f1a");
    params.set("primary_color", "111827");
  }

  return `${CALENDLY_URL}?${params.toString()}`;
}

export default function CalendlyEmbed() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-[720px] w-full rounded-md border bg-muted/40"
        aria-hidden
      />
    );
  }

  return (
    <iframe
      key={resolvedTheme}
      src={calendlySrc(resolvedTheme)}
      title="Schedule a 30-minute meeting with Caesar Va-ay"
      loading="lazy"
      className="h-[720px] w-full rounded-md border"
    />
  );
}
