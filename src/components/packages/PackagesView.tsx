import React from 'react';
import { useApp } from '../../context/AppContext';
import { PricingPackage } from '../../types';
import {
  Package,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Clock,
} from 'lucide-react';

export const PackagesView: React.FC = () => {
  const { packages, settings, startQuoteFromPackage, navigateTo } = useApp();

  const handleSelectPackage = (pkg: PricingPackage) => {
    startQuoteFromPackage(pkg.id);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            Tiered Package Architecture
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Standardize your client offerings into tiered options that speed up proposal approvals.
          </p>
        </div>

        <button
          onClick={() => navigateTo('new-quote')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>+ Custom Quote</span>
        </button>
      </div>

      {/* Package Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        {packages.map((pkg) => {
          const isStandard = pkg.tier === 'standard';

          return (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                isStandard
                  ? 'bg-neutral-900 text-white shadow-xl border border-neutral-900'
                  : 'bg-white text-neutral-900 border border-neutral-200/90 shadow-xs'
              }`}
            >
              {isStandard && (
                <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Recommended Tier
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider font-mono ${
                        isStandard ? 'text-blue-400' : 'text-neutral-500'
                      }`}
                    >
                      {pkg.tier} TIER
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isStandard ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {pkg.turnaround}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-bold font-display ${
                      isStandard ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      isStandard ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pkg.tagline}
                  </p>
                </div>

                <div className="py-2 border-y border-neutral-100 dark:border-neutral-800">
                  <span
                    className={`text-4xl font-extrabold font-mono tabular-nums ${
                      isStandard ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    {settings.currency}{pkg.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs block mt-1 ${
                      isStandard ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    Fixed engagement investment
                  </span>
                </div>

                {/* Features & Deliverables */}
                <div className="space-y-3">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider font-mono block ${
                      isStandard ? 'text-neutral-400' : 'text-neutral-400'
                    }`}
                  >
                    Included In This Tier:
                  </span>
                  <ul className="space-y-2.5 text-xs">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isStandard ? 'text-blue-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={isStandard ? 'text-neutral-200' : 'text-neutral-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isStandard
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  <span>Build Proposal With {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package comparison table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 space-y-6 max-w-5xl mx-auto shadow-xs">
        <div>
          <h2 className="text-lg font-bold font-display text-neutral-900">
            Package Comparison Matrix
          </h2>
          <p className="text-xs text-neutral-500">
            Present clear distinctions to avoid scope creep and justify your rates.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Feature / Deliverable</th>
                <th className="py-3 px-4">Basic Sprint</th>
                <th className="py-3 px-4 font-bold text-blue-700">Growth Pro</th>
                <th className="py-3 px-4">Enterprise Bespoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">Pages / Deliverable Count</td>
                <td className="py-3 px-4 text-neutral-600 font-mono">1 Page</td>
                <td className="py-3 px-4 text-neutral-900 font-semibold font-mono">Up to 5 Pages</td>
                <td className="py-3 px-4 text-neutral-900 font-mono">Up to 10 Pages</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">Revisions Allowed</td>
                <td className="py-3 px-4 text-neutral-600 font-mono">1 Round</td>
                <td className="py-3 px-4 text-neutral-900 font-semibold font-mono">3 Rounds</td>
                <td className="py-3 px-4 text-neutral-900 font-mono">Continuous in-sprint</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">Technical SEO Audit</td>
                <td className="py-3 px-4 text-neutral-400">Basic tags</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Included</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Included + Schema</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">Turnaround Duration</td>
                <td className="py-3 px-4 text-neutral-600 font-mono">5 - 7 Days</td>
                <td className="py-3 px-4 text-neutral-900 font-semibold font-mono">10 - 14 Days</td>
                <td className="py-3 px-4 text-neutral-900 font-mono">18 - 24 Days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">Post-Launch Warranty</td>
                <td className="py-3 px-4 text-neutral-600 font-mono">7 Days</td>
                <td className="py-3 px-4 text-neutral-900 font-semibold font-mono">14 Days</td>
                <td className="py-3 px-4 text-neutral-900 font-mono">30 Days SLA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
