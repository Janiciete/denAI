"use client";

import { useRef, useState } from "react";
import { Upload, FileText, X, ChevronRight, ChevronLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { SAMPLE_EOB, SAMPLE_SBC } from "@/lib/mockData";

type DocValue = null | { type: "sample" } | { type: "file"; name: string };

interface DocUploadZoneProps {
  label: string;
  hint: string;
  sampleText: string;
  sampleButtonLabel: string;
  value: DocValue;
  onChange: (v: DocValue) => void;
}

function DocUploadZone({
  label,
  hint,
  sampleText,
  sampleButtonLabel,
  value,
  onChange,
}: DocUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange({ type: "file", name: file.name });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange({ type: "file", name: file.name });
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange(null);
    setPreviewOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-sm font-semibold text-slate-800">{label}</span>
          <span className="ml-2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Optional
          </span>
          <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
        </div>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 shrink-0 mt-0.5"
          >
            <X size={12} />
            Remove
          </button>
        )}
      </div>

      {/* Uploaded / active state */}
      {value ? (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-50 border border-brand-200">
          {value.type === "sample" ? (
            <FileText size={17} className="text-brand-600 shrink-0" />
          ) : (
            <CheckCircle2 size={17} className="text-green-600 shrink-0" />
          )}
          <span className="text-sm font-medium text-brand-700 flex-1 truncate">
            {value.type === "sample" ? sampleButtonLabel : value.name}
          </span>
          {value.type === "sample" && (
            <button
              type="button"
              onClick={() => setPreviewOpen((p) => !p)}
              className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-800 font-medium transition-colors shrink-0"
            >
              {previewOpen ? <EyeOff size={13} /> : <Eye size={13} />}
              {previewOpen ? "Hide" : "Preview"}
            </button>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragging
              ? "border-brand-400 bg-brand-50 scale-[1.01]"
              : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={22} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm text-slate-500">
            Drop file here or{" "}
            <span className="text-brand-600 font-semibold">click to upload</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">.pdf, .docx, .txt, .jpg, .png</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {/* Use Sample button (shown when no doc yet) */}
      {!value && (
        <button
          type="button"
          onClick={() => {
            onChange({ type: "sample" });
            setPreviewOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-colors"
        >
          <FileText size={14} />
          {sampleButtonLabel}
        </button>
      )}

      {/* Inline sample preview */}
      {value?.type === "sample" && previewOpen && (
        <div className="rounded-xl border border-brand-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between bg-brand-50 border-b border-brand-100 px-4 py-2">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
              Sample Preview
            </span>
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="text-brand-400 hover:text-brand-700 transition-colors"
              aria-label="Close preview"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            <pre className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap break-words">
              {sampleText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InsuranceDocsStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [eobDoc, setEobDoc] = useState<DocValue>(null);
  const [sbcDoc, setSbcDoc] = useState<DocValue>(null);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Insurance Documents
        </h2>
        <p className="text-slate-500 text-lg">
          Adding these documents helps build a stronger, more targeted appeal. Both are optional.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        <DocUploadZone
          label="Explanation of Benefits (EOB)"
          hint="The EOB from your insurer showing exactly how the claim was processed and denied."
          sampleText={SAMPLE_EOB}
          sampleButtonLabel="Use Sample EOB"
          value={eobDoc}
          onChange={setEobDoc}
        />

        <div className="border-t border-slate-100" />

        <DocUploadZone
          label="Summary of Benefits & Coverage (SBC)"
          hint="Your plan's SBC outlines coverage terms, cost-sharing, and medical necessity criteria."
          sampleText={SAMPLE_SBC}
          sampleButtonLabel="Use Sample SBC"
          value={sbcDoc}
          onChange={setSbcDoc}
        />

        {/* Navigation */}
        <div className="pt-2 flex flex-col gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-600 text-white font-bold text-base hover:bg-brand-700 transition-colors shadow-sm"
          >
            Continue with Appeal Generation
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-slate-500 font-medium text-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
