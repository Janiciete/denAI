"use client";

import { useRef } from "react";
import { Upload, FileText, ChevronRight, Info } from "lucide-react";
import { SAMPLE_DENIAL_LETTER } from "@/lib/mockData";

interface DenialLetterStepProps {
  denialText: string;
  setDenialText: (text: string) => void;
  contextText: string;
  setContextText: (text: string) => void;
  onContinue: () => void;
}

const OPTIONAL_DOCS = [
  "Explanation of Benefits (EOB)",
  "Summary of Benefits & Coverage",
  "Letter of Medical Necessity",
  "Summary Plan Description (SPD)",
  "Prior Authorization Request",
  "Other Supporting Documentation",
];

export default function DenialLetterStep({
  denialText,
  setDenialText,
  contextText,
  setContextText,
  onContinue,
}: DenialLetterStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (ev) => setDenialText((ev.target?.result as string) ?? "");
      reader.readAsText(file);
    } else {
      // For non-text files (PDF, DOCX, images), simulate with sample
      setDenialText(SAMPLE_DENIAL_LETTER);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Upload Your Denial Letter
        </h1>
        <p className="text-slate-500 text-lg">
          Paste or upload your denial letter. It&apos;s the only document required to generate an appeal.
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
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileChange}
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
            Include relevant details: diagnosis, treatment history, provider notes.
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

        {/* Optional docs notice */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className="text-slate-400 shrink-0" />
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Optional documents you can add in the next steps
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {OPTIONAL_DOCS.map((doc) => (
              <span
                key={doc}
                className="text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-2.5 py-1"
              >
                {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onContinue}
            disabled={!denialText.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-600 text-white font-bold text-base hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Continue with Appeal Generation
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
