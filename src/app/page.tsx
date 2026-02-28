import Link from "next/link";
import {
  Upload,
  Cpu,
  FileCheck,
  Users,
  Briefcase,
  Stethoscope,
  TrendingUp,
  Clock,
  Zap,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { PRICING_EMPLOYER } from "@/lib/mockData";
import HeroSection from "@/components/HeroSection";
import StatBar from "@/components/StatBar";
import FadeIn from "@/components/FadeIn";

const HOW_IT_WORKS = [
  {
    icon: <Upload size={28} />,
    step: "01",
    title: "Upload or Paste Your Denial",
    desc: "Drop in your denial letter — PDF, photo, or plain text. DenAI reads it instantly.",
  },
  {
    icon: <Cpu size={28} />,
    step: "02",
    title: "DenAI Analyzes the Denial",
    desc: "Our AI identifies the denial reason, CPT codes, and the exact clinical criteria you need to address.",
  },
  {
    icon: <FileCheck size={28} />,
    step: "03",
    title: "Download Your Appeal Letter",
    desc: "Get a complete, personalized appeal letter — ready to sign and send in minutes.",
  },
];

const WHO_ITS_FOR = [
  {
    icon: <Users size={24} />,
    title: "Employees & Patients",
    subtitle: "For individuals",
    desc: "Don't fight your insurer alone. DenAI gives you a professional-grade appeal letter that levels the playing field — without needing a lawyer.",
    points: ["Any denial type", "Ready in minutes", "No legal background needed"],
  },
  {
    icon: <Briefcase size={24} />,
    title: "HR Admins",
    subtitle: "For employers",
    desc: "Reduce friction and frustration for your workforce. Help employees navigate denials quickly while tracking outcomes across your organization.",
    points: ["Team-level dashboard", "Outcome analytics", "Benefits cost reduction"],
  },
  {
    icon: <Stethoscope size={24} />,
    title: "Provider Billing Staff",
    subtitle: "For practices",
    desc: "Stop losing revenue to preventable denials. Appeal faster, reduce AR days, and get paid sooner — without adding headcount.",
    points: ["Multi-payer support", "Bulk processing", "EHR integrations"],
  },
];

const SOCIAL_PROOF = [
  {
    icon: <TrendingUp size={28} />,
    stat: "$13B+",
    label: "In claims denied annually in the US",
  },
  {
    icon: <Clock size={28} />,
    stat: "4+ hours",
    label: "Average time to write an appeal manually",
  },
  {
    icon: <Zap size={28} />,
    stat: "< 5 min",
    label: "DenAI users submit complete appeals",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Animated Hero ── */}
      <HeroSection />

      {/* ── Animated Stat Bar ── */}
      <StatBar />

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              From denial to appeal-ready letter in three simple steps.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-brand-100 -z-0" />
            {HOW_IT_WORKS.map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="relative z-10 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg hover:shadow-brand-100/60 hover:-translate-y-2 transition-all duration-300 text-center h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-100 text-brand-700 mb-5">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500} className="text-center mt-10">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              See It In Action <ChevronRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section id="who-its-for" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Who It&apos;s For
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              DenAI is built for everyone who&apos;s tired of losing to insurance companies.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHO_ITS_FOR.map((card, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-brand-100/50 hover:-translate-y-2 hover:border-brand-200 transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 text-brand-700 mb-4">
                    {card.icon}
                  </div>
                  <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                    {card.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{card.desc}</p>
                  <ul className="space-y-2">
                    {card.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={15} className="text-brand-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Stats ── */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Problem Is Enormous</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Billions in legitimate claims go unpaid every year — not because appeals fail,
              but because no one files them.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SOCIAL_PROOF.map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700 hover:border-brand-600/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-700/20 transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-600/20 text-brand-400 mb-5">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-extrabold text-white mb-2">{item.stat}</div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Plans for employers of any size. Provider practice plans available too.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-start">
            {PRICING_EMPLOYER.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 150}>
                <div
                  className={`rounded-2xl border p-8 h-full transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-brand-700 text-white border-brand-700 shadow-lg shadow-brand-200 scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-300/40"
                      : "bg-white border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-lg hover:shadow-brand-100/60 hover:border-brand-200"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="text-xs font-bold text-brand-200 uppercase tracking-widest mb-2">
                      Most Popular
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <div
                    className={`text-sm mb-4 ${
                      tier.highlighted ? "text-brand-200" : "text-slate-500"
                    }`}
                  >
                    {tier.tagline}
                  </div>
                  <ul className="space-y-2 mb-8">
                    {tier.features.slice(0, 4).map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2 text-sm ${
                          tier.highlighted ? "text-brand-100" : "text-slate-600"
                        }`}
                      >
                        <CheckCircle
                          size={15}
                          className={`shrink-0 mt-0.5 ${
                            tier.highlighted ? "text-brand-300" : "text-brand-500"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:jja87@cornell.edu"
                    className={`block text-center py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors ${
                      tier.highlighted
                        ? "bg-white text-brand-700 hover:bg-brand-50"
                        : "bg-brand-600 text-white hover:bg-brand-700"
                    }`}
                  >
                    Contact Us
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500} className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-brand-600 font-semibold hover:text-brand-700 text-sm"
            >
              View full pricing including provider plans <ChevronRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <FadeIn>
        <section className="bg-brand-50 border-y border-brand-100 py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Your insurer said no. Don&apos;t accept it.
            </h2>
            <p className="text-slate-500 text-lg mb-8">
              Try our demo to see exactly how DenAI turns a denial letter into a winning appeal.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white font-bold text-lg shadow-lg hover:bg-brand-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-200/50 transition-all duration-200"
            >
              Try the Demo Free <ChevronRight size={20} />
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
