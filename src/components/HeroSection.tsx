"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

const SENTENCES = [
  {
    text: "Care Shouldn't Be Denied.",
    highlight: false,
  },
  {
    text: "80% of Appeals Win.",
    highlight: true,
  },
  {
    text: "We Make It Effortless.",
    highlight: false,
  },
];

const HOLD_MS = 2600;
const FADE_MS = 700;

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "in") {
      t = setTimeout(() => setPhase("hold"), FADE_MS);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("out"), HOLD_MS);
    } else {
      t = setTimeout(() => {
        setCurrentIdx((i) => (i + 1) % SENTENCES.length);
        setPhase("in");
      }, FADE_MS);
    }
    return () => clearTimeout(t);
  }, [phase]);

  const opacity = phase === "hold" ? 1 : 0;
  const translateY = phase === "in" ? "12px" : phase === "hold" ? "0px" : "-12px";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(-45deg, #1a0533, #3B0764, #6D28D9, #7C3AED, #4C1D95, #1e0a3e)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 10s ease infinite",
      }}
    >
      {/* Floating orbs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "480px",
          height: "480px",
          top: "-80px",
          left: "-60px",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float-orb 13s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-60px",
          right: "-40px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float-orb-2 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "280px",
          height: "280px",
          top: "40%",
          right: "22%",
          background:
            "radial-gradient(circle, rgba(196,181,253,0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
          animation: "float-orb 9s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
      {/* Extra orb for depth */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          top: "15%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(221,214,254,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float-orb-2 11s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-10 animate-scale-in backdrop-blur-sm">
          <Sparkles size={14} className="text-brand-300" />
          Saving lives, one appeal at a time
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Cycling headline */}
        <div className="relative h-36 sm:h-28 md:h-32 flex items-center justify-center mb-8">
          {SENTENCES.map((s, idx) => (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden={idx !== currentIdx}
            >
              <h1
                className={`text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight px-4 ${
                  s.highlight
                    ? "text-gradient-animated"
                    : "text-white"
                }`}
                style={{
                  opacity: idx === currentIdx ? opacity : 0,
                  transform: `translateY(${idx === currentIdx ? translateY : "0px"})`,
                  transition: `opacity ${FADE_MS}ms ease-in-out, transform ${FADE_MS}ms ease-in-out`,
                }}
              >
                {s.text}
              </h1>
            </div>
          ))}
        </div>

        {/* Sentence indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {SENTENCES.map((_, idx) => (
            <div
              key={idx}
              className="rounded-full transition-all duration-500"
              style={{
                width: idx === currentIdx ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  idx === currentIdx
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Vitalis turns your insurance denial into a winning appeal — in
          minutes. No lawyers. No stress. Just paste your letter and let us
          handle the rest.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-base shadow-lg hover:bg-brand-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 glow-pulse"
          >
            <span className="relative z-10 flex items-center gap-2">
              Try It Free — 30 Seconds <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <a
            href="mailto:jja87@cornell.edu"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
          >
            Request Access
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            HIPAA Compliant
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            No Sign-Up Required
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Results in Minutes
          </span>
        </div>
      </div>
    </section>
  );
}
