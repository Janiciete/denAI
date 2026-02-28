"use client";

import { useRef } from "react";
import { Upload, FileText, ChevronRight } from "lucide-react";
import { SAMPLE_DENIAL_LETTER } from "@/lib/mockData";

interface DemoInputProps {
  denialText: string;
  setDenialText: (text: string) => void;
  contextText: string;
  setContextText: (text: string) => void;
  onGenerate: () => void;
}

export default function DemoInput({
  denialText,
  setDenialText,
  contextText,
  setContextText,
  onGenerate,
}: DemoInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Generate Your Appeal Letter
        </h1>
        <p className="text-slate-500 text-lg">
          Paste your denial letter below or upload a file to get started.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Denial Letter Input */}
        <div>
          <label
            htmlFor="denial-letter"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Denial Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            id="denial-letter"
            rows={10}
            value={denialText}
            onChange={(e) => setDenialText(e.target.value)}
            placeholder="Paste the full text of your insurance denial letter here..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y transition"
          />

          {/* Helper buttons */}
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="button"
              onClick={() => setDenialText(SAMPLE_DENIAL_LETTER)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-colors"
            >
              <FileText size={15} />
              Use Sample Denial Letter
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
              aria-label="Upload denial letter file"
            >
              <Upload size={15} />
              Upload File
            </button>
            {/* Cosmetic file input — no real processing */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
              className="hidden"
              onChange={() => {
                /* cosmetic only — file is not processed */
              }}
            />
          </div>
          {denialText && (
            <p className="mt-2 text-xs text-slate-400">
              {denialText.length.toLocaleString()} characters
            </p>
          )}
        </div>

        {/* Context Input */}
        <div>
          <label
            htmlFor="context"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Additional Context{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Include any relevant details: diagnosis, prior treatment history, dates, provider notes.
          </p>
          <textarea
            id="context"
            rows={4}
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            placeholder="e.g. I had 3 months of physical therapy from March–June 2025 with no improvement. My surgeon recommended surgery after imaging confirmed bone-on-bone contact..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y transition"
          />
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!denialText.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-600 text-white font-bold text-base hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Generate Appeal Letter
            <ChevronRight size={20} />
          </button>
          {!denialText.trim() && (
            <p className="text-center text-xs text-slate-400 mt-2">
              Paste your denial letter or use the sample above to continue.
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        No data is stored or transmitted. This is a fully offline demonstration.
      </p>
    </div>
  );
}
