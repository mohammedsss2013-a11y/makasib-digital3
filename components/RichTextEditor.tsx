"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { AlignCenter, AlignRight, Bold, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Quote, Redo, Strikethrough, Undo } from "lucide-react";
import { uploadArticleImage } from "@/services/upload.service";
import { sanitizeHtml } from "@/lib/sanitize";

type EditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ content, onChange, placeholder = "اكتب محتوى المقال هنا..." }: EditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: true, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"], defaultAlignment: "right" }),
    ],
    content: sanitizeHtml(content || ""),
    editorProps: { attributes: { class: "prose prose-lg max-w-none min-h-[300px] p-4 text-right focus:outline-none", dir: "rtl" } },
    onUpdate: ({ editor: currentEditor }) => onChange(sanitizeHtml(currentEditor.getHTML())),
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("أدخل الرابط");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        setIsUploading(true);
        editor.chain().focus().setImage({ src: await uploadArticleImage(file) }).run();
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "حدث خطأ أثناء رفع الصورة");
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const buttonClass = (active = false) => `rounded p-2 transition hover:bg-slate-200 ${active ? "bg-slate-300 text-blue-700" : "text-slate-700"}`;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white" dir="rtl">
      <div className="flex flex-wrap items-center gap-1 border-b bg-slate-100 p-2">
        <button type="button" className={buttonClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="عريض" aria-label="عريض"><Bold size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="مائل" aria-label="مائل"><Italic size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()} title="يتوسطه خط" aria-label="يتوسطه خط"><Strikethrough size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="قائمة نقطية" aria-label="قائمة نقطية"><List size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="قائمة رقمية" aria-label="قائمة رقمية"><ListOrdered size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="اقتباس" aria-label="اقتباس"><Quote size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="عنوان فرعي" aria-label="عنوان فرعي">H2</button>
        <button type="button" className={buttonClass(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="محاذاة لليمين" aria-label="محاذاة لليمين"><AlignRight size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="محاذاة للوسط" aria-label="محاذاة للوسط"><AlignCenter size={16} /></button>
        <button type="button" className={buttonClass(editor.isActive("link"))} onClick={addLink} title="إضافة رابط" aria-label="إضافة رابط"><LinkIcon size={16} /></button>
        <button type="button" className={buttonClass()} onClick={addImage} disabled={isUploading} title="إدراج صورة" aria-label="إدراج صورة"><ImageIcon size={16} /></button>
        <span className="mx-1 h-6 w-px bg-slate-300" />
        <button type="button" className={buttonClass()} onClick={() => editor.chain().focus().undo().run()} title="تراجع" aria-label="تراجع"><Undo size={16} /></button>
        <button type="button" className={buttonClass()} onClick={() => editor.chain().focus().redo().run()} title="إعادة" aria-label="إعادة"><Redo size={16} /></button>
      </div>
      <EditorContent editor={editor} />
      {isUploading && <p className="border-t bg-blue-50 p-2 text-center text-xs text-blue-700">جاري رفع الصورة...</p>}
    </div>
  );
}
