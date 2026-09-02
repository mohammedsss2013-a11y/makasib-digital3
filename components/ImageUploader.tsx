"use client";

import { ChangeEvent, useState } from "react";
import { uploadArticleImage } from "@/lib/upload";
import { createClient } from "@/utils/supabase/client";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);
    setIsUploading(true);
    setProgress(0);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      const client = createClient();
      setProgress(25);

      const uploadedUrl = await uploadArticleImage(file, "articles", client);
      setProgress(100);
      setImageUrl(uploadedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل في رفع الصورة");
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-700">
          اختيار صورة
        </span>
        <input
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

      {previewUrl && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
          <img
            src={previewUrl}
            alt="معاينة الصورة"
            className="h-48 w-full rounded-md object-cover"
          />
        </div>
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
