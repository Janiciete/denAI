"use client";

import { useState, useCallback } from "react";
import DenialLetterStep from "@/components/demo/DemoInput";
import InsuranceDocsStep from "@/components/demo/InsuranceDocsStep";
import SupportingDocsStep from "@/components/demo/SupportingDocsStep";
import DemoProcessing from "@/components/demo/DemoProcessing";
import DemoOutput from "@/components/demo/DemoOutput";

type MainStep = "documents" | "processing" | "result";
type DocSubStep = 1 | 2 | 3;

const MAIN_STEPS: { key: MainStep; label: string }[] = [
  { key: "documents", label: "Documents" },
  { key: "processing", label: "Processing" },
  { key: "result", label: "Result" },
];

const SUB_STEP_NAMES = ["Denial Letter", "Insurance Docs", "Supporting Docs"];

function TopBar({
  mainStepIndex,
  subStep,
}: {
  mainStepIndex: number;
  subStep: DocSubStep;
}) {
  const isDocuments = mainStepIndex === 0;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        {/* Main step indicators */}
        <div className="flex items-center justify-center gap-2">
          {MAIN_STEPS.map(({ label }, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    mainStepIndex > i
                      ? "bg-brand-600 text-white"
                      : mainStepIndex === i
                      ? "bg-brand-600 text-white ring-4 ring-brand-100"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {mainStepIndex > i ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    mainStepIndex >= i ? "text-brand-700" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < MAIN_STEPS.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mb-4 transition-colors ${
                    mainStepIndex > i ? "bg-brand-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Sub-step mini indicator — only visible during Documents step */}
        {isDocuments && (
          <div className="flex items-center justify-center gap-2.5 mt-3">
            <div className="flex items-center gap-1.5">
              {([1, 2, 3] as DocSubStep[]).map((n) => (
                <div
                  key={n}
                  className={`rounded-full transition-all duration-300 ${
                    subStep === n
                      ? "w-6 h-2 bg-brand-500"
                      : subStep > n
                      ? "w-2 h-2 bg-brand-400"
                      : "w-2 h-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400">
              Step {subStep} of 3 —{" "}
              <span className="text-slate-500 font-medium">
                {SUB_STEP_NAMES[subStep - 1]}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [mainStep, setMainStep] = useState<MainStep>("documents");
  const [subStep, setSubStep] = useState<DocSubStep>(1);
  const [denialText, setDenialText] = useState("");
  const [contextText, setContextText] = useState("");

  const mainStepIndex =
    mainStep === "documents" ? 0 : mainStep === "processing" ? 1 : 2;

  const handleProcessingComplete = useCallback(() => {
    setMainStep("result");
  }, []);

  const handleReset = () => {
    setMainStep("documents");
    setSubStep(1);
    setDenialText("");
    setContextText("");
  };

  const goNext = () => {
    if (subStep < 3) {
      setSubStep((prev) => (prev + 1) as DocSubStep);
    } else {
      setMainStep("processing");
    }
  };

  const goBack = () => {
    if (subStep > 1) {
      setSubStep((prev) => (prev - 1) as DocSubStep);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar mainStepIndex={mainStepIndex} subStep={subStep} />

      {mainStep === "documents" ? (
        /* ── Carousel ─────────────────────────────────────────────────── */
        <div className="overflow-hidden">
          <div
            style={{
              display: "flex",
              width: "300%",
              transform: `translateX(-${(subStep - 1) * (100 / 3)}%)`,
              transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Sub-step 1 — Denial Letter */}
            <div style={{ width: "33.333%" }} className="py-12">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <DenialLetterStep
                  denialText={denialText}
                  setDenialText={setDenialText}
                  contextText={contextText}
                  setContextText={setContextText}
                  onContinue={goNext}
                />
              </div>
            </div>

            {/* Sub-step 2 — Insurance Docs */}
            <div style={{ width: "33.333%" }} className="py-12">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <InsuranceDocsStep onBack={goBack} onContinue={goNext} />
              </div>
            </div>

            {/* Sub-step 3 — Supporting Docs */}
            <div style={{ width: "33.333%" }} className="py-12">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <SupportingDocsStep
                  onBack={goBack}
                  onGenerate={() => setMainStep("processing")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Processing / Result ───────────────────────────────────────── */
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {mainStep === "processing" && (
            <DemoProcessing onComplete={handleProcessingComplete} />
          )}
          {mainStep === "result" && <DemoOutput onReset={handleReset} />}
        </div>
      )}
    </div>
  );
}
