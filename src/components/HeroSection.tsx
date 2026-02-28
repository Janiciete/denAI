"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SENTENCES = [
  {
    text: "Fight Back.",
    highlight: false,
  },
  {
    text: "80% of Appeals Win.",
    highlight: true,
  },
  {
    text: "Almost Nobody Files.",
    highlight: false,
  },
];

// Duration each sentence is shown (fade-in + hold + fade-out)
const HOLD_MS = 2600;
const FADE_MS = 700;
const TOTAL_MS = HOLD_MS + FADE_MS * 2;

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
  const sentence = SENTENCES[currentIdx];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(-45deg, #3B0764, #6D28D9, #7C3AED, #4C1D95, #5B21B6)",
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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now available in early access
        </div>

        {/* Cycling headline */}
        <div className="relative h-28 sm:h-24 md:h-32 flex items-center justify-center mb-8">
          {SENTENCES.map((s, idx) => (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden={idx !== currentIdx}
            >
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight px-4 ${
                  s.highlight
                    ? "text-brand-200"
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
          DenAI turns your insurance denial letter into a complete, ready-to-send
          appeal — in minutes. No lawyers. No paperwork maze. Just results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-base shadow-lg hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Try the Demo <ChevronRight size={18} />
          </Link>
          <a
            href="mailto:jja87@cornell.edu"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}
