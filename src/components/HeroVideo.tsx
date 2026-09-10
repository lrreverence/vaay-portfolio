"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const LIGHT_FRAME_SECONDS = 4;
const DARK_FRAME_SECONDS = 8;
const PLAYBACK_RATE = 10;
const VIDEO_SRC = "/vid-theme-transition.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousThemeRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Defer loading video until after mount so it doesn't block initial paint
  useEffect(() => {
    setVideoSrc(VIDEO_SRC);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedTheme || !videoSrc) return;

    let animationFrameId: number | undefined;
    let isCancelled = false;

    const stopPlayback = () => {
      video.pause();
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      }
    };

    const playUntil = (endTime: number) => {
      video.playbackRate = PLAYBACK_RATE;

      const stopAtEnd = () => {
        if (video.currentTime >= endTime || video.ended) {
          stopPlayback();
          video.currentTime = endTime;
          return;
        }

        animationFrameId = requestAnimationFrame(stopAtEnd);
      };

      animationFrameId = requestAnimationFrame(stopAtEnd);
      video.play().catch(() => {
        if (!isCancelled) {
          stopPlayback();
          video.currentTime = endTime;
        }
      });
    };

    const applyTheme = () => {
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;

      stopPlayback();

      const nextTheme = resolvedTheme === "dark" ? "dark" : "light";
      const previousTheme = previousThemeRef.current;
      previousThemeRef.current = nextTheme;

      if (previousTheme === null || previousTheme === nextTheme) {
        video.currentTime =
          nextTheme === "dark" ? DARK_FRAME_SECONDS : LIGHT_FRAME_SECONDS;
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        video.currentTime =
          nextTheme === "dark" ? DARK_FRAME_SECONDS : LIGHT_FRAME_SECONDS;
        return;
      }

      if (nextTheme === "dark") {
        // The second half of the clip contains the pre-rendered reverse motion.
        // Map an interrupted forward transition to the matching reverse frame.
        if (video.currentTime < LIGHT_FRAME_SECONDS) {
          video.currentTime = DARK_FRAME_SECONDS - video.currentTime;
        }
        playUntil(DARK_FRAME_SECONDS);
      } else {
        // Map an interrupted reverse transition back to the matching forward frame.
        if (video.currentTime > LIGHT_FRAME_SECONDS) {
          video.currentTime = DARK_FRAME_SECONDS - video.currentTime;
        }
        playUntil(LIGHT_FRAME_SECONDS);
      }
    };

    video.addEventListener("loadedmetadata", applyTheme);
    applyTheme();
    return () => {
      isCancelled = true;
      video.removeEventListener("loadedmetadata", applyTheme);
      stopPlayback();
    };
  }, [resolvedTheme, videoSrc]);

  return (
    <div className="mx-auto aspect-[9/16] w-[340px] sm:w-[420px] md:mx-0 md:w-[480px]">
      <video
        ref={videoRef}
        width={720}
        height={1280}
        className="block h-full w-full rounded-lg object-cover"
        src={videoSrc ?? undefined}
        preload="metadata"
        muted
        playsInline
        aria-label="Video of Vaay"
      />
    </div>
  );
}
