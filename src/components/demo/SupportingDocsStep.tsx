"use client";

import { useRef, useState } from "react";
import { Upload, X, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";

type DocValue = null | { type: "file"; name: string };

interface SimpleUploadZoneProps {
  label: string;
  description: string;
  value: DocValue;
  onChange: (v: DocValue) => void;
}

function SimpleUploadZone({ label, description, value, onChange }: SimpleUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
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

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-sm font-semibold text-slate-800">{label}</span>
          <span className="ml-2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Optional
          </span>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 shrink-0 mt-0.5"
          >
            <X size={12} />
            Remove
          </button>
        )}
      </div>

      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          <span className="text-sm font-medium text-green-700 flex-1 truncate">{value.name}</span>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl px-6 py-4 text-center cursor-pointer transition-all duration-200 ${
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
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Upload size={16} />
            <span className="text-sm">
              Drop or{" "}
              <span className="text-brand-600 font-medium">click to upload</span>
            </span>
          </div>
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
    </div>
  );
}

export default function SupportingDocsStep({
  onBack,
  onGenerate,
}: {
  onBack: () => void;
  onGenerate: () => void;
}) {
  const [lmnDoc, setLmnDoc] = useState<DocValue>(null);
  const [spdDoc, setSpdDoc] = useState<DocValue>(null);
  const [priorAuthDoc, setPriorAuthDoc] = useState<DocValue>(null);
  const [otherDoc, setOtherDoc] = useState<DocValue>(null);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Supporting Documents
        </h2>
        <p className="text-slate-500 text-lg">
          Attach any additional records to further strengthen your case. All optional.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <SimpleUploadZone
          label="Letter of Medical Necessity"
          description="From your treating physician explaining why this procedure is medically necessary."
          value={lmnDoc}
          onChange={setLmnDoc}
        />

        <div className="border-t border-slate-100" />

        <SimpleUploadZone
          label="Full Summary Plan Description (SPD)"
          description="Your complete plan document detailing all covered benefits, exclusions, and limitations."
          value={spdDoc}
          onChange={setSpdDoc}
        />

        <div className="border-t border-slate-100" />

        <SimpleUploadZone
          label="Prior Authorization Request"
          description="Include any prior auth request, along with its approval or denial documentation."
          value={priorAuthDoc}
          onChange={setPriorAuthDoc}
        />

        <div className="border-t border-slate-100" />

        <SimpleUploadZone
          label="Other Supporting Documentation"
          description="Previous medical records, lab results, imaging reports, or any other relevant materials."
          value={otherDoc}
          onChange={setOtherDoc}
        />

        {/* Navigation */}
        <div className="pt-2 flex flex-col gap-3">
          <button
            type="button"
            onClick={onGenerate}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-600 text-white font-bold text-base hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Sparkles size={18} />
            Generate Appeal
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

      <p className="text-center text-xs text-slate-400 mt-4">
        No data is stored or transmitted. This is a fully offline demonstration.
      </p>
    </div>
  );
}
