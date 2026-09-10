"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const DARK_FRAME_SECONDS = 0;
const LIGHT_FRAME_SECONDS = 4;
const PLAYBACK_RATE = 10;
const FORWARD_VIDEO_SRC = "/vid-optimized.mp4";
const REVERSE_VIDEO_SRC = "/vid-optimized-reverse.mp4";

type ActiveVideo = "forward" | "reverse";

export default function HeroVideo() {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const activeVideoRef = useRef<ActiveVideo>("forward");
  const previousThemeRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>("forward");

  // Defer loading the videos until after mount so they don't block initial paint.
  useEffect(() => {
    setShouldLoadVideos(true);
  }, []);

  useEffect(() => {
    const forwardVideo = forwardVideoRef.current;
    const reverseVideo = reverseVideoRef.current;
    if (!forwardVideo || !reverseVideo || !resolvedTheme || !shouldLoadVideos) {
      return;
    }

    let isCancelled = false;
    let didApplyTheme = false;

    const stopVideos = () => {
      forwardVideo.pause();
      reverseVideo.pause();
    };

    const showVideo = (video: ActiveVideo) => {
      activeVideoRef.current = video;
      setActiveVideo(video);
    };

    const applyTheme = () => {
      if (
        isCancelled ||
        didApplyTheme ||
        forwardVideo.readyState < HTMLMediaElement.HAVE_METADATA ||
        reverseVideo.readyState < HTMLMediaElement.HAVE_METADATA
      ) {
        return;
      }

      didApplyTheme = true;
      stopVideos();

      const nextTheme = resolvedTheme === "dark" ? "dark" : "light";
      const previousTheme = previousThemeRef.current;
      previousThemeRef.current = nextTheme;

      if (previousTheme === null) {
        showVideo("forward");
        forwardVideo.currentTime =
          nextTheme === "dark" ? DARK_FRAME_SECONDS : LIGHT_FRAME_SECONDS;
        reverseVideo.currentTime =
          nextTheme === "dark" ? LIGHT_FRAME_SECONDS : DARK_FRAME_SECONDS;
        return;
      }

      if (previousTheme === nextTheme) return;

      const currentVideo =
        activeVideoRef.current === "forward" ? forwardVideo : reverseVideo;
      const targetDirection: ActiveVideo =
        nextTheme === "dark" ? "reverse" : "forward";
      const targetVideo =
        targetDirection === "forward" ? forwardVideo : reverseVideo;

      if (activeVideoRef.current !== targetDirection) {
        targetVideo.currentTime = Math.max(
          DARK_FRAME_SECONDS,
          Math.min(
            LIGHT_FRAME_SECONDS,
            LIGHT_FRAME_SECONDS - currentVideo.currentTime,
          ),
        );
      }

      showVideo(targetDirection);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targetVideo.currentTime = LIGHT_FRAME_SECONDS;
        return;
      }

      targetVideo.playbackRate = PLAYBACK_RATE;
      targetVideo.play().catch(() => {
        if (!isCancelled) {
          targetVideo.currentTime = LIGHT_FRAME_SECONDS;
        }
      });
    };

    forwardVideo.addEventListener("loadedmetadata", applyTheme);
    reverseVideo.addEventListener("loadedmetadata", applyTheme);
    applyTheme();

    return () => {
      isCancelled = true;
      forwardVideo.removeEventListener("loadedmetadata", applyTheme);
      reverseVideo.removeEventListener("loadedmetadata", applyTheme);
      stopVideos();
    };
  }, [resolvedTheme, shouldLoadVideos]);

  const videoClassName =
    "absolute inset-0 block h-full w-full rounded-lg object-cover";

  return (
    <div
      className="relative mx-auto aspect-[9/16] w-[340px] sm:w-[420px] md:mx-0 md:w-[480px]"
      role="img"
      aria-label="Video of Vaay"
    >
      <video
        ref={forwardVideoRef}
        width={720}
        height={1280}
        className={`${videoClassName} ${activeVideo === "forward" ? "opacity-100" : "opacity-0"}`}
        src={shouldLoadVideos ? FORWARD_VIDEO_SRC : undefined}
        preload="metadata"
        muted
        playsInline
        aria-hidden="true"
      />
      <video
        ref={reverseVideoRef}
        width={720}
        height={1280}
        className={`${videoClassName} ${activeVideo === "reverse" ? "opacity-100" : "opacity-0"}`}
        src={shouldLoadVideos ? REVERSE_VIDEO_SRC : undefined}
        preload="metadata"
        muted
        playsInline
        aria-hidden="true"
      />
    </div>
  );
}
