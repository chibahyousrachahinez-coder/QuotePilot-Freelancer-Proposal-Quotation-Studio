import React from 'react';
import { useApp } from '../../context/AppContext';
import { QuoteStatus, Quote } from '../../types';
import {
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Copy,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    quotes,
    settings,
    navigateTo,
    openPreview,
    duplicateQuote,
    deleteQuote,
    stats,
    setActiveQuoteDraft,
    setSelectedQuoteId,
    startQuoteFromTemplate,
  } = useApp();

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Sort recent quotes by updatedAt desc
  const recentQuotes = [...quotes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  const formatCurrency = (amount: number, currency: string = '$') => {
    return `${currency}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Accepted
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Sent
          </span>
        );
      case 'viewed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Viewed
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Draft
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            Expired
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Declined
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCreateNew = () => {
    setActiveQuoteDraft(null);
    setSelectedQuoteId(null);
    navigateTo('new-quote');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            {greeting}, {settings.freelancerName.split(' ')[0]}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Ready to send your next proposal?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('quotes')}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 rounded-xl transition-colors cursor-pointer"
          >
            View All Quotes
          </button>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Quote</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Quote Value */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 block mb-1">
            Total Quote Value
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 tabular-nums">
              {formatCurrency(stats.totalQuoteValue, settings.currency)}
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 block">
            Across {quotes.length} pipeline proposals
          </span>
        </div>

        {/* Metric 2: Quotes Sent */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 block mb-1">
            Quotes Sent
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 tabular-nums">
              {stats.quotesSent}
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 block">
            Delivered to clients
          </span>
        </div>

        {/* Metric 3: Accepted */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 block mb-1">
            Accepted
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 tabular-nums">
              {stats.quotesAccepted}
            </span>
          </div>
          <span className="text-[11px] text-emerald-600/80 font-medium mt-2 block">
            Won projects
          </span>
        </div>

        {/* Metric 4: Acceptance Rate */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 block mb-1">
            Acceptance Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 tabular-nums">
              {stats.acceptanceRate}%
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 block">
            Sent to close ratio
          </span>
        </div>

        {/* Metric 5: Pending */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-xs font-medium text-neutral-500 block mb-1">
            Pending Review
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-600 tabular-nums">
              {stats.quotesPending}
            </span>
          </div>
          <span className="text-[11px] text-amber-700/80 font-medium mt-2 block">
            Awaiting client sign-off
          </span>
        </div>
      </div>

      {/* Quick Actions / Templates Banner */}
      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <p className="text-xs font-bold font-mono text-blue-900 uppercase tracking-wide">
            Recommended Starting Templates
          </p>
          <p className="text-xs text-blue-800">
            Launch instantly with pre-configured scope boundaries and payment milestones.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => startQuoteFromTemplate('tmpl-web-dev')}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg border border-blue-200 shadow-xs transition-colors cursor-pointer"
          >
            Web Dev & React ($1,550)
          </button>
          <button
            onClick={() => startQuoteFromTemplate('tmpl-uiux-design')}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg border border-blue-200 shadow-xs transition-colors cursor-pointer"
          >
            UI/UX Design System ($2,000)
          </button>
          <button
            onClick={() => navigateTo('templates')}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>All Templates</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* RECENT QUOTES TABLE */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-display text-neutral-900">
              Recent Quotes
            </h2>
            <p className="text-xs text-neutral-500">
              Active agreements, drafts, and recent client activity
            </p>
          </div>
          <button
            onClick={() => navigateTo('quotes')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All ({quotes.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                <th className="py-3 px-6">Quote & Project</th>
                <th className="py-3 px-6">Client</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Updated</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {recentQuotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-neutral-50/60 transition-colors group cursor-pointer"
                  onClick={() => openPreview(quote)}
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {quote.title}
                    </div>
                    <div className="text-xs font-mono text-neutral-400 mt-0.5">
                      {quote.quoteNumber}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-neutral-800">
                      {quote.clientName}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {quote.clientCompany}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono font-semibold text-neutral-900 tabular-nums">
                    {formatCurrency(quote.total, quote.currency)}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(quote.status)}
                  </td>
                  <td className="py-4 px-6 text-xs text-neutral-500 font-mono tabular-nums">
                    {formatDate(quote.updatedAt)}
                  </td>
                  <td
                    className="py-4 px-6 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openPreview(quote)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                        title="Preview Proposal"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuoteId(quote.id);
                          navigateTo('edit-quote', quote.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                        title="Edit Quote"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateQuote(quote.id)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                        title="Duplicate Quote"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-neutral-100">
          {recentQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 space-y-3 hover:bg-neutral-50"
              onClick={() => openPreview(quote)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {quote.quoteNumber}
                  </span>
                  <h3 className="font-semibold text-neutral-900 text-sm">
                    {quote.title}
                  </h3>
                  <p className="text-xs text-neutral-500">{quote.clientCompany}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                    {formatCurrency(quote.total, quote.currency)}
                  </span>
                  <div className="mt-1">{getStatusBadge(quote.status)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100">
                <span>Updated {formatDate(quote.updatedAt)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview(quote);
                  }}
                  className="text-blue-600 font-semibold flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
