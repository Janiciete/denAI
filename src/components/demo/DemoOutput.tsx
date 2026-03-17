"use client";

import { useState } from "react";
import { CheckCircle, Copy, Download, RefreshCw, AlertTriangle, Sparkles } from "lucide-react";
import { MOCK_APPEAL_LETTER } from "@/lib/mockData";

interface DemoOutputProps {
  onReset: () => void;
}

export default function DemoOutput({ onReset }: DemoOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MOCK_APPEAL_LETTER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([MOCK_APPEAL_LETTER], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vitalis-appeal-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      {/* Header + Confidence Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Appeal Letter</h1>
          <p className="text-slate-500 text-sm mt-1">Ready to review, copy, or download.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-semibold text-sm shrink-0 animate-scale-in">
          <Sparkles size={16} className="text-green-600" />
          92% Appeal Strength
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
        <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This letter is generated for demonstration purposes only. Vitalis is not a law firm and this does not constitute legal or medical advice. Review all content carefully and consult a qualified professional before submitting. Results are not guaranteed.
        </p>
      </div>

      {/* Appeal Letter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appeal Letter Preview</span>
          <span className="text-xs text-slate-400">
            {MOCK_APPEAL_LETTER.length.toLocaleString()} characters
          </span>
        </div>
        <div className="p-6 max-h-[520px] overflow-y-auto">
          <pre className="text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap break-words">
            {MOCK_APPEAL_LETTER}
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
            copied
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5"
          }`}
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-200/50"
        >
          <Download size={16} />
          Download .txt
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-500 font-medium text-sm border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200 hover:-translate-y-0.5"
        >
          <RefreshCw size={15} />
          Start New Appeal
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Ready to use this for real?{" "}
        <a href="mailto:jja87@cornell.edu" className="text-brand-600 hover:underline font-medium">
          Request full access &rarr;
        </a>
      </p>
    </div>
  );
}
