"use client";

import { FileText, Image as ImageIcon, User } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FallbackType = "avatar" | "article" | "general";

interface AppImageProps extends Omit<ImageProps, "onError" | "src"> {
  src?: string | null;
  fallbackSrc?: string;
  fallbackType?: FallbackType;
}

export default function AppImage({ src, alt, fallbackSrc, fallbackType = "general", className = "", ...props }: AppImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    if (fallbackSrc) {
      return <Image {...props} src={fallbackSrc} alt={alt || "صورة"} className={className} />;
    }

    const Icon = fallbackType === "avatar" ? User : fallbackType === "article" ? FileText : ImageIcon;
    return <div className={`flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800 ${className}`} role="img" aria-label={alt || "صورة غير متاحة"}><Icon className={fallbackType === "article" ? "h-8 w-8 opacity-60" : "h-1/2 w-1/2 opacity-60"} aria-hidden="true" /></div>;
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt || "صورة"}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
