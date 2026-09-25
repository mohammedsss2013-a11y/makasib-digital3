"use client";

import { useEffect, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

export function ArticleSpeechControls({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle");

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function speak() {
    if (!("speechSynthesis" in window)) return;
    if (state === "paused") { window.speechSynthesis.resume(); setState("speaking"); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, " "));
    utterance.lang = "ar-SA";
    utterance.rate = 0.95;
    utterance.onend = () => setState("idle");
    window.speechSynthesis.speak(utterance);
    setState("speaking");
  }

  function pause() { window.speechSynthesis.pause(); setState("paused"); }
  function stop() { window.speechSynthesis.cancel(); setState("idle"); }

  return <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/50 p-2" dir="rtl"><span className="flex items-center gap-1.5 px-2 text-xs font-bold text-[var(--text-muted)]"><Volume2 className="h-4 w-4 text-[var(--accent-primary)]" />استمع إلى المقال</span><button type="button" onClick={speak} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)]" aria-label={state === "paused" ? "استئناف القراءة" : "بدء القراءة"}>{state === "paused" ? <Play className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button><button type="button" onClick={pause} disabled={state !== "speaking"} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] disabled:opacity-40" aria-label="إيقاف مؤقت"><Pause className="h-4 w-4" /></button><button type="button" onClick={stop} disabled={state === "idle"} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-rose-400 disabled:opacity-40" aria-label="إيقاف القراءة"><Square className="h-4 w-4" /></button></div>;
}