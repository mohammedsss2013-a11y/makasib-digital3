'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import RichTextEditor from '@/components/RichTextEditor';
import { createClient } from '@/lib/supabase/client';

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      },
    ]);

    setSubmitting(false);

    if (error) {
      console.error('خطأ أثناء حفظ المقال:', error.message);
      alert('حدث خطأ أثناء حفظ المقال');
      return;
    }

    alert('تم نشر المقال بنجاح!');
    router.push('/admin/posts');
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">إضافة مقال جديد</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            عنوان المقال
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل عنوان المقال..."
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            الصورة البارزة للمقال
          </label>
          <ImageUploader onUploadComplete={(url) => setImageUrl(url)} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            محتوى المقال
          </label>
          <RichTextEditor content={content} onChange={setContent} />
          <input type="hidden" name="content" value={content} readOnly />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'جاري النشر...' : 'نشر المقال'}
        </button>
      </form>
    </div>
  );
}
