"use client";

import { useState, useCallback } from "react";
import DemoInput from "@/components/demo/DemoInput";
import DemoProcessing from "@/components/demo/DemoProcessing";
import DemoOutput from "@/components/demo/DemoOutput";

type Step = 1 | 2 | 3;

export default function DemoPage() {
  const [step, setStep] = useState<Step>(1);
  const [denialText, setDenialText] = useState("");
  const [contextText, setContextText] = useState("");

  const handleGenerate = () => {
    if (!denialText.trim()) return;
    setStep(2);
  };

  const handleProcessingComplete = useCallback(() => {
    setStep(3);
  }, []);

  const handleReset = () => {
    setStep(1);
    setDenialText("");
    setContextText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 justify-center">
            {[
              { n: 1, label: "Input" },
              { n: 2, label: "Processing" },
              { n: 3, label: "Result" },
            ].map(({ n, label }, i, arr) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step > n
                        ? "bg-brand-600 text-white"
                        : step === n
                        ? "bg-brand-600 text-white ring-4 ring-brand-100"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {step > n ? "✓" : n}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      step >= n ? "text-brand-700" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mb-4 transition-colors ${
                      step > n ? "bg-brand-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {step === 1 && (
          <DemoInput
            denialText={denialText}
            setDenialText={setDenialText}
            contextText={contextText}
            setContextText={setContextText}
            onGenerate={handleGenerate}
          />
        )}
        {step === 2 && <DemoProcessing onComplete={handleProcessingComplete} />}
        {step === 3 && <DemoOutput onReset={handleReset} />}
      </div>
    </div>
  );
}
