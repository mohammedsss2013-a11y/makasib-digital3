"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { splitSpeechText } from "@/utils/articleSpeechText";
import { getArticleReadingTime } from "@/utils/articleReadingTime";

type PlaybackState = "idle" | "speaking" | "paused";

export function ArticleSpeechControls({ text }: { text: string }) {
  const [state, setState] = useState<PlaybackState>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const speechIdRef = useRef(0);
  const chunksRef = useRef<ReturnType<typeof splitSpeechText>>([]);
  const currentChunkRef = useRef(0);

  function speakNextChunk(speechId: number) {
    const synthesis = window.speechSynthesis;
    const chunk = chunksRef.current[currentChunkRef.current];
    if (!chunk || speechId !== speechIdRef.current) return;

    const utterance = new SpeechSynthesisUtterance(chunk.text);
    const arabicVoices = synthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("ar"));
    const selectedVoice = arabicVoices.find((voice) => voice.lang.toLowerCase() === "ar-sa")
      ?? arabicVoices.find((voice) => voice.lang.toLowerCase() === "ar")
      ?? arabicVoices[0];

    utterance.lang = selectedVoice?.lang ?? "ar";
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onboundary = (event) => {
      if (speechId !== speechIdRef.current || text.length === 0) return;
      const characterPosition = chunk.start + event.charIndex;
      setProgress(Math.min(99, Math.round((characterPosition / text.length) * 100)));
    };
    utterance.onend = () => {
      if (speechId !== speechIdRef.current) return;
      currentChunkRef.current += 1;
      const nextChunk = chunksRef.current[currentChunkRef.current];
      if (nextChunk) {
        setProgress(Math.min(99, Math.round((nextChunk.start / text.length) * 100)));
        speakNextChunk(speechId);
      } else {
        setProgress(100);
        setState("idle");
      }
    };
    utterance.onerror = (event) => {
      if (speechId !== speechIdRef.current || event.error === "canceled" || event.error === "interrupted") return;
      console.error("تعذرت قراءة المقال صوتياً:", event.error);
      chunksRef.current = [];
      currentChunkRef.current = 0;
      setMessage("تعذرت قراءة المقال صوتياً. تحقق من إعدادات الصوت في المتصفح.");
      setState("idle");
    };

    setState("speaking");
    synthesis.speak(utterance);
  }

  useEffect(() => {
    const stopSpeech = () => {
      speechIdRef.current += 1;
      window.speechSynthesis?.cancel();
    };
    window.addEventListener("pagehide", stopSpeech);

    return () => {
      window.removeEventListener("pagehide", stopSpeech);
      stopSpeech();
    };
  }, [text]);

  function startOrResume() {
    setMessage("");
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setMessage("ميزة القراءة الصوتية غير مدعومة في هذا المتصفح.");
      return;
    }

    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("speaking");
      return;
    }

    const chunks = splitSpeechText(text);
    if (chunks.length === 0) {
      setMessage("لا يوجد نص قابل للقراءة في هذا المقال.");
      return;
    }

    speechIdRef.current += 1;
    chunksRef.current = chunks;
    currentChunkRef.current = 0;
    setProgress(0);
    window.speechSynthesis.cancel();
    speakNextChunk(speechIdRef.current);
  }

  function pause() {
    if (state !== "speaking") return;
    window.speechSynthesis.pause();
    setState("paused");
  }

  function stop() {
    speechIdRef.current += 1;
    window.speechSynthesis.cancel();
    chunksRef.current = [];
    currentChunkRef.current = 0;
    setProgress(0);
    setState("idle");
    setMessage("");
  }

  const estimatedReadingTime = getArticleReadingTime(text);

  return (
    <div
      className="min-w-64 space-y-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/50 p-2"
      dir="rtl"
      aria-label="مشغل قراءة المقال صوتياً"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 text-xs font-bold text-[var(--text-muted)]">
          <Volume2 className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          استمع إلى المقال
        </span>
        <button
          type="button"
          onClick={startOrResume}
          disabled={state === "speaking"}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] disabled:opacity-40"
          aria-label={state === "paused" ? "استئناف القراءة" : "بدء القراءة"}
          title={state === "paused" ? "استئناف القراءة" : "بدء القراءة"}
        >
          <Play className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={pause}
          disabled={state !== "speaking"}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] disabled:opacity-40"
          aria-label="إيقاف مؤقت"
          title="إيقاف مؤقت"
        >
          <Pause className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={stop}
          disabled={state === "idle" && progress === 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-rose-400 disabled:opacity-40"
          aria-label="إيقاف القراءة"
          title="إيقاف القراءة"
        >
          <Square className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="mr-auto px-2 text-[11px] text-[var(--text-muted)]">
          {state === "speaking" ? "جارٍ القراءة" : state === "paused" ? "متوقف مؤقتاً" : `وقت القراءة ${estimatedReadingTime}`}
        </span>
      </div>

      {(state !== "idle" || progress > 0) && (
        <div className="flex items-center gap-2 px-2">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border-main)]"
            role="progressbar"
            aria-label="تقدم القراءة الصوتية"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-[var(--accent-primary)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="min-w-9 text-left text-[10px] tabular-nums text-[var(--text-muted)]">{progress}%</span>
        </div>
      )}

      {message && (
        <p className="px-2 text-[11px] text-rose-500" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
