"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const DARK_PAUSE_AT_SECONDS = 0;
const LIGHT_PAUSE_AT_SECONDS = 4;
const PLAYBACK_RATE = 10; // 4x speed → 4 sec of video plays in 1 real second
const VIDEO_SRC = "/vid-optimized.mp4";

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

    let cleanup: (() => void) | void;

    const applyTheme = () => {
      cleanup?.();

      if (resolvedTheme === "dark") {
        const wasLight = previousThemeRef.current === "light";
        previousThemeRef.current = "dark";

        if (wasLight) {
          video.currentTime = LIGHT_PAUSE_AT_SECONDS;
          video.pause();

          video.playbackRate = PLAYBACK_RATE;
          let rafId: number;
          const playBackwards = () => {
            video.currentTime -= PLAYBACK_RATE / 60;
            if (video.currentTime <= DARK_PAUSE_AT_SECONDS) {
              video.currentTime = DARK_PAUSE_AT_SECONDS;
              video.pause();
              return;
            }
            rafId = requestAnimationFrame(playBackwards);
          };
          rafId = requestAnimationFrame(playBackwards);
          cleanup = () => cancelAnimationFrame(rafId);
        } else {
          video.currentTime = DARK_PAUSE_AT_SECONDS;
          video.pause();
        }
      } else {
        const wasDark = previousThemeRef.current === "dark";
        previousThemeRef.current = "light";

        if (wasDark) {
          video.currentTime = 0;
          video.playbackRate = PLAYBACK_RATE;
          video.play().catch(() => {});

          const stopAtFour = () => {
            if (video.currentTime >= LIGHT_PAUSE_AT_SECONDS) {
              video.pause();
              video.removeEventListener("timeupdate", stopAtFour);
            }
          };
          video.addEventListener("timeupdate", stopAtFour);
          cleanup = () => video.removeEventListener("timeupdate", stopAtFour);
        } else {
          video.currentTime = LIGHT_PAUSE_AT_SECONDS;
          video.pause();
        }
      }
    };

    applyTheme();
    video.addEventListener("loadedmetadata", applyTheme);
    return () => {
      video.removeEventListener("loadedmetadata", applyTheme);
      cleanup?.();
    };
  }, [resolvedTheme, videoSrc]);

  return (
    <video
      ref={videoRef}
      className="rounded-lg mx-auto md:mx-0 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] object-cover"
      src={videoSrc ?? undefined}
      poster="/vaaypp.png"
      preload="metadata"
      muted
      playsInline
      aria-label="Video of Vaay"
    />
  );
}
