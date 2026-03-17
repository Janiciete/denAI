"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle,
  Loader2,
  Sparkles,
  ChevronRight,
  FileText,
  Upload,
  Download,
  Copy,
  ClipboardPaste,
  MousePointerClick,
  Cpu,
  FileDown,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   CURSOR
   ═══════════════════════════════════════════════════════════ */

function Cursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: x,
        top: y,
        transition: "left 0.8s cubic-bezier(0.4,0,0.2,1), top 0.8s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-md transition-transform duration-150 ${clicking ? "scale-90" : ""}`}
      >
        <path d="M5 3l14 9-6 1.5L9.5 20z" fill="white" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {clicking && <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-brand-400/40 animate-ping" />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const DENIAL_SNIPPET = [
  "Aetna Health Insurance",
  "RE: Adverse Benefit Determination",
  "",
  "DENIED SERVICE:",
  "Total Right Knee Arthroplasty",
  "CPT Code: 27447  |  $42,800.00",
  "",
  "REASON: Medical Necessity (MN-04)",
  "Insufficient documentation of failed",
  "conservative therapies...",
];

const APPEAL_SNIPPET = [
  "FORMAL APPEAL — CLM-2026-00184732",
  "",
  "Dear Aetna Appeals Committee,",
  "",
  "I formally appeal your denial of Total",
  "Right Knee Arthroplasty (CPT 27447).",
  "",
  "I. CONSERVATIVE TREATMENT (12+ mo)",
  "  • PT: 24 sessions — no improvement",
  "  • Injections: 3 rounds — temporary",
  "  • NSAIDs: 18 mo — GI side effects",
  "",
  "II. FUNCTIONAL STATUS",
  "  • KOOS: 28/100 (severe impairment)",
  "  • Cannot walk > 1 block",
  "",
  "III. IMAGING (Dec 2025)",
  "  • Grade IV osteoarthritis",
  "  • Bone-on-bone medial compartment",
  "",
  "Based on the above, I request reversal",
  "of denial and authorization of payment.",
];

const PROCESSING_STEPS = [
  "Extracting denial reason & CPT codes",
  "Matching clinical guidelines",
  "Building evidence-based response",
  "Drafting personalized appeal letter",
];

/* ═══════════════════════════════════════════════════════════
   INSTRUCTIONAL STEPS (left panel)
   ═══════════════════════════════════════════════════════════ */

const GUIDE_STEPS = [
  {
    num: 1,
    icon: ClipboardPaste,
    title: "Paste Your Denial Letter",
    desc: "Upload or paste the denial letter from your insurance company. This is the only document you need — Vitalis handles the rest.",
    tip: "You can use a photo, PDF, or just copy-paste the text.",
  },
  {
    num: 2,
    icon: MousePointerClick,
    title: "Hit Continue",
    desc: "Once your denial letter is loaded, click continue. Vitalis will instantly begin analyzing your case.",
    tip: "No forms to fill out. No questions to answer.",
  },
  {
    num: 3,
    icon: Cpu,
    title: "AI Builds Your Case",
    desc: "Vitalis extracts the denial reason, matches clinical guidelines, and writes a personalized, evidence-based appeal letter.",
    tip: "References your insurer's own criteria against you.",
  },
  {
    num: 4,
    icon: FileDown,
    title: "Download & Send",
    desc: "Your complete appeal letter is ready — reviewed, formatted, and scored for strength. Download it and send it to your insurer.",
    tip: "80% of appeals win. Now you have one.",
  },
];

/* ═══════════════════════════════════════════════════════════
   PHASES
   ═══════════════════════════════════════════════════════════ */

type Phase =
  | "idle"
  | "move-sample"
  | "click-sample"
  | "filling"
  | "move-continue"
  | "click-continue"
  | "processing"
  | "result"
  | "move-download"
  | "click-download"
  | "done";

function phaseToStep(phase: Phase): number {
  if (["idle", "move-sample", "click-sample", "filling"].includes(phase)) return 0;
  if (["move-continue", "click-continue"].includes(phase)) return 1;
  if (phase === "processing") return 2;
  return 3;
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function DemoPreview() {
  const contentRef = useRef<HTMLDivElement>(null);
  const sampleBtnRef = useRef<HTMLDivElement>(null);
  const continueBtnRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursor, setCursor] = useState({ x: 100, y: 100 });
  const [clicking, setClicking] = useState(false);
  const [denialVisible, setDenialVisible] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [appealVisible, setAppealVisible] = useState(0);
  const [showStrength, setShowStrength] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeGuide = phaseToStep(phase);

  const moveToRef = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    const container = contentRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setCursor({
      x: eRect.left - cRect.left + eRect.width / 2 - 4,
      y: eRect.top - cRect.top + eRect.height / 2 - 4,
    });
  }, []);

  const doClick = useCallback(() => {
    setClicking(true);
    setTimeout(() => setClicking(false), 250);
  }, []);

  // Start on scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Phase state machine
  useEffect(() => {
    if (!started) return;
    let t: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "idle":
        setCursor({ x: 100, y: 100 });
        t = setTimeout(() => setPhase("move-sample"), 1000);
        break;
      case "move-sample":
        moveToRef(sampleBtnRef);
        t = setTimeout(() => setPhase("click-sample"), 1000);
        break;
      case "click-sample":
        doClick();
        t = setTimeout(() => setPhase("filling"), 350);
        break;
      case "filling":
        t = setTimeout(() => setPhase("move-continue"), 2400);
        break;
      case "move-continue":
        moveToRef(continueBtnRef);
        t = setTimeout(() => setPhase("click-continue"), 1000);
        break;
      case "click-continue":
        doClick();
        t = setTimeout(() => setPhase("processing"), 500);
        break;
      case "processing":
        t = setTimeout(() => setPhase("result"), 4200);
        break;
      case "result":
        // longer hold so appeal text fully renders
        t = setTimeout(() => setPhase("move-download"), 3000);
        break;
      case "move-download":
        moveToRef(downloadBtnRef);
        t = setTimeout(() => setPhase("click-download"), 1000);
        break;
      case "click-download":
        doClick();
        setCopied(true);
        t = setTimeout(() => { setCopied(false); setPhase("done"); }, 1500);
        break;
      case "done":
        t = setTimeout(() => {
          setPhase("idle");
          setDenialVisible(0);
          setCompletedSteps([]);
          setActiveStep(0);
          setAppealVisible(0);
          setShowStrength(false);
        }, 3000);
        break;
    }
    return () => clearTimeout(t);
  }, [phase, started, moveToRef, doClick]);

  // Denial text fill
  useEffect(() => {
    if (phase !== "filling") return;
    setDenialVisible(0);
    const iv = setInterval(() => {
      setDenialVisible((p) => { if (p >= DENIAL_SNIPPET.length) { clearInterval(iv); return p; } return p + 1; });
    }, 130);
    return () => clearInterval(iv);
  }, [phase]);

  // Processing steps
  useEffect(() => {
    if (phase !== "processing") return;
    setCompletedSteps([]); setActiveStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    PROCESSING_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => { setActiveStep(i); if (i > 0) setCompletedSteps((p) => [...p, i - 1]); }, i * 900));
    });
    timers.push(setTimeout(() => setCompletedSteps([0, 1, 2, 3]), 3800));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Appeal text fill — triggers on "result" and keeps going
  useEffect(() => {
    if (phase !== "result") return;
    setAppealVisible(0);
    setShowStrength(false);
    const iv = setInterval(() => {
      setAppealVisible((p) => { if (p >= APPEAL_SNIPPET.length) { clearInterval(iv); return p; } return p + 1; });
    }, 90);
    const st = setTimeout(() => setShowStrength(true), 1600);
    return () => { clearInterval(iv); clearTimeout(st); };
  }, [phase]);

  const showInput = ["idle", "move-sample", "click-sample", "filling", "move-continue", "click-continue"].includes(phase);
  const showProcessing = phase === "processing";
  const showResult = ["result", "move-download", "click-download", "done"].includes(phase);
  const showCursor = phase !== "processing";
  const progressIdx = showInput ? 0 : showProcessing ? 1 : 2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      {/* ═══ LEFT: Instructional guide ═══ */}
      <div className="lg:col-span-4 order-2 lg:order-1">
        <div className="space-y-4">
          {GUIDE_STEPS.map((step, i) => {
            const isActive = activeGuide === i;
            const isDone = activeGuide > i;
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`rounded-xl border p-4 transition-all duration-500 ${
                  isActive
                    ? "bg-white border-brand-200 shadow-lg shadow-brand-100/40 scale-[1.02]"
                    : isDone
                    ? "bg-white/60 border-slate-200"
                    : "bg-slate-50/50 border-slate-100 opacity-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Step indicator */}
                  <div
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-brand-600 text-white ring-4 ring-brand-100"
                        : isDone
                        ? "bg-brand-600 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle size={18} />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-brand-500" : "text-slate-400"}`}>
                        Step {step.num}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                      )}
                    </div>
                    <h3 className={`text-sm font-bold mb-1 transition-colors duration-300 ${isActive ? "text-slate-900" : isDone ? "text-slate-600" : "text-slate-400"}`}>
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed transition-all duration-500 overflow-hidden ${
                        isActive ? "text-slate-500 max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {step.desc}
                    </p>
                    {isActive && (
                      <div className="mt-2 flex items-start gap-1.5 animate-slide-up">
                        <Sparkles size={11} className="text-brand-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-brand-600 font-medium italic">{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA below steps */}
          <Link
            href="/demo"
            className="group w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-200/50 mt-2"
          >
            Try It Yourself — Free
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ═══ RIGHT: Demo window ═══ */}
      <div className="lg:col-span-8 order-1 lg:order-2">
        <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-brand-200/20 overflow-hidden bg-white">

          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-md border border-slate-200 px-3 py-0.5 text-[11px] text-slate-400 font-mono">
                app.vitalis.com/demo
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    progressIdx === i ? "w-4 bg-brand-500" : progressIdx > i ? "w-1.5 bg-brand-400" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content area */}
          <div ref={contentRef} className="relative" style={{ height: 460 }}>
            {showCursor && <Cursor x={cursor.x} y={cursor.y} clicking={clicking} />}

            {/* ── Screen 1: Input ── */}
            <div className={`absolute inset-0 flex flex-col p-4 sm:p-5 transition-all duration-500 ease-out ${showInput ? "opacity-100 translate-x-0" : "-translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Upload size={14} className="text-brand-600" />
                <span className="text-xs font-bold text-slate-800">Upload Your Denial Letter</span>
              </div>

              <div className={`flex-1 rounded-lg border-2 transition-colors duration-300 bg-slate-50 p-3 overflow-hidden ${denialVisible > 0 ? "border-brand-300" : "border-slate-200"}`}>
                {denialVisible === 0 ? (
                  <span className="text-xs text-slate-400">Paste the full text of your insurance denial letter here...</span>
                ) : (
                  <div className="text-[11px] sm:text-xs font-mono leading-relaxed">
                    {DENIAL_SNIPPET.slice(0, denialVisible).map((line, i) => (
                      <div
                        key={i}
                        className={`animate-tick-in ${
                          line.startsWith("DENIED") || line.startsWith("REASON") ? "text-red-600 font-semibold"
                          : line.startsWith("CPT") || line.startsWith("Total") ? "text-slate-600"
                          : line === "" ? "h-1.5" : "text-slate-700"
                        }`}
                      >
                        {line || "\u00A0"}
                      </div>
                    ))}
                    {denialVisible < DENIAL_SNIPPET.length && (
                      <span className="inline-block w-1.5 h-3 bg-brand-500 animate-pulse rounded-sm ml-0.5" />
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-2.5 mb-2.5">
                <div
                  ref={sampleBtnRef}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all duration-200 ${
                    phase === "click-sample" || denialVisible > 0 ? "bg-brand-100 border-brand-300 text-brand-700 scale-95" : "bg-brand-50 border-brand-200 text-brand-700"
                  }`}
                >
                  <FileText size={12} />
                  Use Sample Denial
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border bg-slate-50 border-slate-200 text-slate-500">
                  <Upload size={12} />
                  Upload File
                </div>
              </div>

              <div
                ref={continueBtnRef}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 ${
                  denialVisible > 0 ? "bg-brand-600 text-white shadow-sm" : "bg-slate-200 text-slate-400"
                } ${phase === "click-continue" ? "scale-[0.97] brightness-90" : ""}`}
              >
                Continue with Appeal Generation
                <ChevronRight size={14} />
              </div>
            </div>

            {/* ── Screen 2: Processing ── */}
            <div className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-500 ease-out ${showProcessing ? "opacity-100 scale-100" : showResult ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="text-center w-full max-w-xs">
                <div className="flex justify-center mb-5">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-brand-300 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Analyzing Your Denial</h3>
                <p className="text-[11px] text-slate-400 mb-5">Building your evidence-based appeal...</p>
                <ul className="text-left space-y-2.5 mx-auto">
                  {PROCESSING_STEPS.map((step, i) => {
                    const isDone = completedSteps.includes(i);
                    const isActive = activeStep === i && !isDone;
                    return (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                          {isDone ? <CheckCircle size={16} className="text-green-500" /> : isActive ? <Loader2 size={14} className="text-brand-500 animate-spin" /> : <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-200" />}
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${isDone ? "text-green-600" : isActive ? "text-brand-700" : "text-slate-400"}`}>
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* ── Screen 3: Result (appeal letter) ── */}
            <div className={`absolute inset-0 flex flex-col p-4 sm:p-5 transition-all duration-500 ease-out ${showResult ? "opacity-100 translate-x-0" : "translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs font-bold text-slate-800">Your Appeal Letter</span>
                </div>
                {showStrength && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-200 animate-scale-in">
                    <Sparkles size={10} className="text-green-600" />
                    <span className="text-[10px] font-bold text-green-700">92% strength</span>
                  </div>
                )}
              </div>

              {/* Appeal text area */}
              <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-3 overflow-auto">
                <div className="text-[11px] sm:text-xs font-mono leading-relaxed">
                  {APPEAL_SNIPPET.slice(0, appealVisible).map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        line.startsWith("FORMAL") ? "text-brand-700 font-bold text-[10px] uppercase tracking-widest"
                        : line.startsWith("I.") || line.startsWith("II.") || line.startsWith("III.") ? "text-green-700 font-semibold"
                        : line.startsWith("Based on") || line.startsWith("of denial") ? "text-brand-600 font-medium"
                        : line.startsWith("  •") ? "text-slate-600 pl-1"
                        : line === "" ? "h-1.5" : "text-slate-700"
                      }`}
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}
                  {appealVisible < APPEAL_SNIPPET.length && showResult && (
                    <span className="inline-block w-1.5 h-3 bg-green-500 animate-pulse rounded-sm ml-0.5" />
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-2.5">
                <div className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold border transition-all duration-200 ${copied ? "bg-green-600 text-white border-green-600 scale-[0.97]" : "bg-white text-slate-600 border-slate-200"}`}>
                  {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </div>
                <div
                  ref={downloadBtnRef}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 ${phase === "click-download" ? "bg-brand-700 text-white scale-[0.97]" : "bg-brand-600 text-white"}`}
                >
                  <Download size={12} />
                  Download .txt
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {["Paste", "Analyze", "Download"].map((label, i) => {
                const isComplete = progressIdx > i || phase === "done";
                const isCurrent = progressIdx === i && phase !== "done";
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    {i > 0 && <div className={`w-4 h-px ${isComplete ? "bg-brand-400" : "bg-slate-200"}`} />}
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${isComplete ? "bg-brand-600 text-white" : isCurrent ? "bg-brand-600 text-white ring-2 ring-brand-200" : "bg-slate-200 text-slate-400"}`}>
                      {isComplete ? "✓" : i + 1}
                    </div>
                    <span className={`text-[10px] font-medium hidden sm:inline ${isComplete || isCurrent ? "text-brand-700" : "text-slate-400"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            {phase === "done" && (
              <Link href="/demo" className="group inline-flex items-center gap-1 px-3 py-1 rounded-md bg-brand-600 text-white text-[10px] font-semibold hover:bg-brand-700 transition-all duration-200 animate-scale-in">
                Try It Yourself
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
