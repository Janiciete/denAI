import Link from "next/link";
import { Lock, TrendingUp, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { DASHBOARD_APPEALS } from "@/lib/mockData";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Won: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    "In Review": "bg-blue-50 text-blue-700 border-blue-200",
    Submitted: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        styles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const stats = [
    { label: "Total Appeals", value: "8", icon: <BarChart3 size={20} />, color: "text-brand-600 bg-brand-50" },
    { label: "Won", value: "4", icon: <CheckCircle2 size={20} />, color: "text-green-600 bg-green-50" },
    { label: "In Review / Pending", value: "3", icon: <Clock size={20} />, color: "text-yellow-600 bg-yellow-50" },
    { label: "Avg Response Time", value: "18 days", icon: <TrendingUp size={20} />, color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Appeals Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your insurance appeal history.</p>
        </div>
      </div>

      {/* Blurred dashboard content */}
      <div className="relative">
        {/* The gated overlay */}
        <div className="absolute inset-0 z-20 flex items-start justify-center pt-32 bg-white/60 backdrop-blur-sm pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-100 text-brand-700 mb-5 mx-auto">
              <Lock size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Full Access Required</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Track all your appeals, view outcomes, and collaborate with your team. Request access to unlock the full dashboard.
            </p>
            <a
              href="mailto:jja87@cornell.edu"
              className="block w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors mb-3"
            >
              Request Full Access
            </a>
            <Link
              href="/demo"
              className="block text-sm text-brand-600 hover:text-brand-700 font-medium hover:underline"
            >
              Or try the demo first →
            </Link>
          </div>
        </div>

        {/* Blurred dashboard underneath */}
        <div className="blur-sm pointer-events-none select-none" aria-hidden="true">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${s.color}`}>
                    {s.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mb-0.5">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="font-semibold text-slate-900">Recent Appeals</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {["ID", "Claimant", "Insurer", "Denial Code", "CPT", "Amount", "Status", "Date"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DASHBOARD_APPEALS.map((appeal) => (
                      <tr key={appeal.id}>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                          {appeal.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">
                          {appeal.claimant}
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{appeal.insurer}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                          {appeal.denial_code}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                          {appeal.cpt_code}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                          {appeal.amount}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={appeal.status} />
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">
                          {appeal.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
