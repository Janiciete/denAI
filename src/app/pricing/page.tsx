"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronDown, Mail } from "lucide-react";
import { PRICING_EMPLOYER, PRICING_PROVIDER, type PricingTier } from "@/lib/mockData";

type Tab = "employer" | "provider";

const FAQS = [
  {
    q: "How does Vitalis generate appeal letters?",
    a: "Vitalis analyzes your denial letter to identify the denial reason, relevant CPT codes, and the insurer's stated clinical criteria. It then drafts a personalized appeal letter that directly addresses each deficiency cited by the insurer, referencing applicable clinical guidelines and peer-reviewed evidence.",
  },
  {
    q: "Is Vitalis HIPAA compliant?",
    a: "Yes. All plans include a full BAA (Business Associate Agreement). All data is encrypted in transit and at rest. We do not sell or share member health data with any third parties.",
  },
  {
    q: "What types of denials does Vitalis support?",
    a: "Vitalis supports the most common denial categories including: Medical Necessity (MN), Prior Authorization (PA), Experimental/Investigational (EX), Coordination of Benefits (COB), and Coding/Bundling denials (CO). New denial types are added regularly.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — you can try the demo for free with a sample denial letter, no sign-up required. For full access with your own claims data, reach out and we'll set up a guided pilot for your team.",
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  const hasPrice = Boolean(tier.price);

  return (
    <div
      className={`rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        tier.highlighted
          ? "bg-brand-700 text-white border-brand-700 shadow-xl"
          : "bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-8 pb-6 border-b ${
          tier.highlighted ? "border-brand-600" : "border-slate-100"
        }`}
      >
        {tier.highlighted && (
          <span className="inline-block text-xs font-bold text-brand-100 uppercase tracking-widest mb-2">
            Most Popular
          </span>
        )}
        <h3
          className={`text-2xl font-extrabold mb-1 ${
            tier.highlighted ? "text-white" : "text-slate-900"
          }`}
        >
          {tier.name}
        </h3>
        <p
          className={`text-sm font-semibold mb-3 ${
            tier.highlighted ? "text-brand-200" : "text-brand-600"
          }`}
        >
          {tier.tagline}
        </p>

        {hasPrice && (
          <div className="mt-3 mb-2">
            <span
              className={`text-3xl font-extrabold ${
                tier.highlighted ? "text-white" : "text-slate-900"
              }`}
            >
              {tier.price}
            </span>
            <span
              className={`text-sm font-medium ml-1 ${
                tier.highlighted ? "text-brand-100" : "text-slate-400"
              }`}
            >
              {tier.priceUnit}
            </span>
            <p
              className={`text-xs mt-1 ${
                tier.highlighted ? "text-brand-200" : "text-slate-400"
              }`}
            >
              Sample range — contact us to confirm your rate
            </p>
          </div>
        )}

        <p
          className={`text-sm leading-relaxed ${hasPrice ? "mt-3" : ""} ${
            tier.highlighted ? "text-brand-100" : "text-slate-500"
          }`}
        >
          {tier.description}
        </p>
      </div>

      {/* Features */}
      <div className="p-8 flex-1">
        <ul className="space-y-3">
          {tier.features.map((f, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 text-sm ${
                tier.highlighted ? "text-brand-100" : "text-slate-600"
              }`}
            >
              <CheckCircle
                size={16}
                className={`shrink-0 mt-0.5 ${
                  tier.highlighted ? "text-brand-300" : "text-brand-500"
                }`}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        {!hasPrice && (
          <div
            className={`text-center text-sm mb-3 font-medium ${
              tier.highlighted ? "text-brand-200" : "text-slate-400"
            }`}
          >
            Custom pricing — no published rates
          </div>
        )}
        <a
          href="mailto:jja87@cornell.edu"
          className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
            tier.highlighted
              ? "bg-white text-brand-700 hover:bg-brand-50 hover:shadow-md"
              : "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-md hover:shadow-brand-200/50"
          }`}
        >
          <Mail size={15} />
          {hasPrice ? "Inquire & Get Started" : "Contact Us"}
        </a>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-base pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("employer");

  const tiers = activeTab === "employer" ? PRICING_EMPLOYER : PRICING_PROVIDER;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Transparent, Outcome-Driven Pricing
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Plans built for employers and provider practices of every size. All plans include
            access to our core AI appeal engine.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 mt-6 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="sticky top-16 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("employer")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "employer"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Employers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("provider")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "provider"
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Provider Practices
            </button>
          </div>
        </div>
      </section>

      {/* Provider pricing disclaimer banner */}
      {activeTab === "provider" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-brand-50 border border-brand-100 rounded-xl px-5 py-3 text-sm text-brand-700 text-center">
            Prices shown are sample ranges. Final pricing depends on appeal volume and contract
            terms.{" "}
            <a
              href="mailto:jja87@cornell.edu"
              className="font-semibold underline hover:no-underline"
            >
              Email us to confirm your rate &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Questions about pricing?{" "}
          <a
            href="mailto:jja87@cornell.edu"
            className="text-brand-600 hover:underline font-medium"
          >
            Email us
          </a>{" "}
          and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      {/* All Plans Include */}
      <section className="bg-brand-50 border-y border-brand-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Plans Include</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-left">
            {[
              "AI-powered appeal generation",
              "Multi-payer denial support",
              "Clinical guideline references",
              "Secure, HIPAA-compliant platform",
              "Onboarding & training resources",
              "Regular model updates",
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-700">
                <CheckCircle size={16} className="text-brand-500 shrink-0 mt-0.5" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-700 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-600/20 to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to start winning appeals?
          </h2>
          <p className="text-brand-100 mb-8">
            Try the demo for free, then reach out to get set up with the right plan for your
            organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-block px-8 py-3.5 rounded-xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Try the Demo Free
            </Link>
            <a
              href="mailto:jja87@cornell.edu"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-brand-400 text-white font-semibold hover:bg-brand-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
