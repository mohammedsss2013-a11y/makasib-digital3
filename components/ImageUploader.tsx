"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadArticleImage } from "@/services/upload.service";
import AppImage from "@/components/ui/AppImage";

type ImageUploaderProps = {
  onUploadComplete?: (url: string) => void;
  onImageSelected?: (file: File | null) => void;
  defaultImage?: string;
};

export default function ImageUploader({ onUploadComplete, onImageSelected, defaultImage }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImage ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);
    setIsUploading(true);
    setProgress(0);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onImageSelected?.(file);

    try {
      setProgress(25);

      const uploadedUrl = await uploadArticleImage(file);
      setProgress(100);
      setImageUrl(uploadedUrl);
      onUploadComplete?.(uploadedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل في رفع الصورة");
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setImageUrl(null);
    onImageSelected?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 dir-rtl">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-700">
          اختيار صورة
        </span>
        <input
          ref={fileInputRef}
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
        />
      </label>

      {isUploading && (
        <div className="w-full">
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>جاري الرفع...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {previewUrl ? (
        <div className="group relative h-48 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <AppImage
            src={previewUrl}
            alt="معاينة الصورة"
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 480px"
            fallbackType="article"
            className="object-cover transition-transform group-hover:scale-105"
          />
          <button type="button" onClick={handleRemoveImage} className="absolute left-3 top-3 rounded-xl bg-slate-900/80 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-600" aria-label="إزالة الصورة"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <label htmlFor="image-upload-input" className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/50 p-6 text-center transition-colors hover:bg-slate-800/50"><Upload className="mb-3 h-6 w-6 text-slate-500" /><span className="text-sm font-bold text-slate-300">اضغط لرفع صورة</span><span className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP حتى 5 ميجابايت</span></label>
      )}

      {imageUrl && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">رابط الصورة:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all text-sm text-blue-600 underline"
          >
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
}
