"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  initialHtml?: string;
  scope: "blog" | "events";
};

export function RichTextEditor({ name, initialHtml = "", scope }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitializedRef = useRef(false);
  const savedRangeRef = useRef<Range | null>(null);
  const [html, setHtml] = useState(initialHtml);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;
    if (isInitializedRef.current) return;
    editorRef.current.innerHTML = initialHtml;
    setHtml(initialHtml);
    isInitializedRef.current = true;
  }, [initialHtml]);

  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    syncHtmlFromEditor();
  }

  function syncHtmlFromEditor() {
    setHtml(editorRef.current?.innerHTML ?? "");
    saveSelection();
  }

  function saveSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    savedRangeRef.current = selection.getRangeAt(0).cloneRange();
  }

  function restoreSelection() {
    const selection = window.getSelection();
    if (!selection || !savedRangeRef.current) return;
    selection.removeAllRanges();
    selection.addRange(savedRangeRef.current);
  }

  function getSafeRange() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (!editor.contains(container)) return null;
    return range;
  }

  function applyHeading() {
    editorRef.current?.focus();
    restoreSelection();
    const range = getSafeRange();
    if (!range) return;
    const heading = document.createElement("h2");
    heading.textContent = range.toString().trim() || "Новый заголовок";
    range.deleteContents();
    range.insertNode(heading);
    range.setStartAfter(heading);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    syncHtmlFromEditor();
  }

  function applyUnorderedList() {
    editorRef.current?.focus();
    restoreSelection();
    const range = getSafeRange();
    if (!range) return;
    const selectedText = range.toString().trim();
    const lines = (selectedText || "Новый пункт")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const ul = document.createElement("ul");
    lines.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });
    range.deleteContents();
    range.insertNode(ul);
    range.setStartAfter(ul);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    syncHtmlFromEditor();
  }

  function applyLink(url: string) {
    editorRef.current?.focus();
    restoreSelection();
    const range = getSafeRange();
    if (!range) return;
    const linkText = range.toString().trim() || url;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer noopener";
    anchor.textContent = linkText;
    range.deleteContents();
    range.insertNode(anchor);
    range.setStartAfter(anchor);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    syncHtmlFromEditor();
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
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            exec("bold");
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Жирный
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            exec("italic");
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Курсив
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            applyHeading();
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Заголовок
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            applyUnorderedList();
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Список
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            saveSelection();
            const link = window.prompt("Вставь ссылку");
            if (link) applyLink(link);
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Ссылка
        </button>
        <button
          type="button"
          disabled={isUploading}
          onMouseDown={(event) => {
            event.preventDefault();
            saveSelection();
            fileInputRef.current?.click();
          }}
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
        onBlur={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onInput={syncHtmlFromEditor}
        className="min-h-48 rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800"
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
