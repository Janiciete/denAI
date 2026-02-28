"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const STEPS = [
  "Extracting denial reason and CPT codes...",
  "Identifying applicable coverage guidelines...",
  "Drafting personalized appeal letter...",
];

interface DemoProcessingProps {
  onComplete: () => void;
}

export default function DemoProcessing({ onComplete }: DemoProcessingProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((_, index) => {
      // Complete each step after: 1.1s, 2.3s, 3.5s
      const t = setTimeout(
        () => {
          setCompletedSteps((prev) => [...prev, index]);
          if (index < STEPS.length - 1) {
            setActiveStep(index + 1);
          }
        },
        1100 + index * 1200
      );
      timers.push(t);
    });

    // Advance to output after all steps done
    const doneTimer = setTimeout(onComplete, 4200);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
            <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Your Denial</h2>
        <p className="text-slate-500 text-sm mb-8">This usually takes a few seconds.</p>

        {/* Step List */}
        <ul className="text-left space-y-4">
          {STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = activeStep === i && !isDone;

            return (
              <li key={i} className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  {isDone ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : isActive ? (
                    <Loader2 size={18} className="text-brand-500 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isDone
                      ? "text-green-600"
                      : isActive
                      ? "text-brand-700"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
