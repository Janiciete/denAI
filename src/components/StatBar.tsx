"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return count;
}

export default function StatBar() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const denial = useCountUp(19, started);
  const winRate = useCountUp(80, started);

  return (
    <section ref={ref} className="bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle animated gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.15), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className={`transition-all duration-700 ${started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-4xl font-extrabold text-brand-400 mb-1 tabular-nums">
              {denial}%
            </div>
            <div className="text-sm text-slate-400 font-medium">
              Average claim denial rate in the US
            </div>
          </div>
          <div className={`sm:border-x border-slate-700 transition-all duration-700 delay-150 ${started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-4xl font-extrabold text-brand-400 mb-1">
              &lt;1%
            </div>
            <div className="text-sm text-slate-400 font-medium">
              Of patients ever file an appeal
            </div>
          </div>
          <div className={`transition-all duration-700 delay-300 ${started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-4xl font-extrabold text-brand-400 mb-1 tabular-nums">
              {winRate}%+
            </div>
            <div className="text-sm text-slate-400 font-medium">
              Win rate when an appeal is filed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
