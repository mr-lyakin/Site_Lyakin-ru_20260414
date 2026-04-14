"use client";

import { useRef, useState } from "react";

type Props = {
  name: string;
  initialHtml?: string;
  scope: "blog" | "events";
};

export function RichTextEditor({ name, initialHtml = "", scope }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [html, setHtml] = useState(initialHtml);
  const [isUploading, setIsUploading] = useState(false);

  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setHtml(editorRef.current?.innerHTML ?? "");
  }

  async function uploadAndInsertImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("scope", scope);
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { url?: string };
    if (payload.url) exec("insertImage", payload.url);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => exec("bold")} className="rounded border px-3 py-1 text-sm">
          Жирный
        </button>
        <button type="button" onClick={() => exec("italic")} className="rounded border px-3 py-1 text-sm">
          Курсив
        </button>
        <button type="button" onClick={() => exec("formatBlock", "h2")} className="rounded border px-3 py-1 text-sm">
          Заголовок
        </button>
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="rounded border px-3 py-1 text-sm"
        >
          Список
        </button>
        <button
          type="button"
          onClick={() => {
            const link = window.prompt("Вставь ссылку");
            if (link) exec("createLink", link);
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Ссылка
        </button>
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="rounded border px-3 py-1 text-sm"
        >
          {isUploading ? "Загрузка..." : "Вставить картинку"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setIsUploading(true);
            await uploadAndInsertImage(file);
            setIsUploading(false);
            event.target.value = "";
          }}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => setHtml(editorRef.current?.innerHTML ?? "")}
        className="min-h-48 rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800"
        dangerouslySetInnerHTML={{ __html: initialHtml }}
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
