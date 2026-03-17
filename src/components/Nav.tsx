"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import VitalisLogo from "@/components/VitalisLogo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <VitalisLogo size="sm" variant="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#who-its-for"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Who It&apos;s For
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isDemo ? (
              <span className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-300 cursor-default select-none">
                Try the Demo
              </span>
            ) : (
              <Link
                href="/demo"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-200/50 hover:-translate-y-0.5"
              >
                Try the Demo
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2 animate-slide-up">
          <nav className="flex flex-col gap-1">
            <Link
              href="/#how-it-works"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              How It Works
            </Link>
            <Link
              href="/#who-its-for"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Who It&apos;s For
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Dashboard
            </Link>
            {isDemo ? (
              <span className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-300 cursor-default select-none text-center">
                Try the Demo
              </span>
            ) : (
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-brand-600 text-white text-center hover:bg-brand-700 transition-colors"
              >
                Try the Demo
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
