import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuoteStatus, Quote } from '../../types';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Copy,
  Trash2,
  Share2,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const QuotesListView: React.FC = () => {
  const {
    quotes,
    settings,
    navigateTo,
    openPreview,
    duplicateQuote,
    deleteQuote,
    updateQuoteStatus,
    setSelectedQuoteId,
    setActiveQuoteDraft,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | QuoteStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: 'all' | QuoteStatus; label: string }[] = [
    { id: 'all', label: 'All Quotes' },
    { id: 'draft', label: 'Draft' },
    { id: 'sent', label: 'Sent' },
    { id: 'viewed', label: 'Viewed' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Declined' },
    { id: 'expired', label: 'Expired' },
  ];

  // Filter & Search Logic
  const filteredQuotes = quotes.filter((q) => {
    const matchesFilter = activeFilter === 'all' || q.status === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      q.title.toLowerCase().includes(query) ||
      q.clientName.toLowerCase().includes(query) ||
      q.clientCompany.toLowerCase().includes(query) ||
      q.quoteNumber.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const formatCurrency = (val: number, cur: string = '$') => {
    return `${cur}${val.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

  const handleCreateNew = () => {
    setActiveQuoteDraft(null);
    setSelectedQuoteId(null);
    navigateTo('new-quote');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            Quotes & Proposals
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage your pipeline, reuse existing proposals, and monitor client acceptances.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Quote</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 p-1 bg-neutral-100/90 rounded-xl">
          {filterTabs.map((tab) => {
            const count =
              tab.id === 'all'
                ? quotes.length
                : quotes.filter((q) => q.status === tab.id).length;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono text-neutral-400 tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by client, project, quote #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Quotes Content */}
      {filteredQuotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center max-w-md mx-auto space-y-4 my-8">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 font-display">
              No proposals found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {searchQuery || activeFilter !== 'all'
                ? 'No quotes match your current filter or search criteria.'
                : 'Your next client request can become your next project.'}
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create your first quote</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-neutral-50/60 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  <th className="py-3 px-6">Quote & Project</th>
                  <th className="py-3 px-6">Client & Company</th>
                  <th className="py-3 px-6 text-right">Investment</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Last Updated</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-neutral-50/50 transition-colors group cursor-pointer"
                    onClick={() => openPreview(quote)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {quote.title}
                      </div>
                      <div className="text-xs font-mono text-neutral-400 mt-0.5 flex items-center gap-2">
                        <span>{quote.quoteNumber}</span>
                        <span>·</span>
                        <span>{quote.timelineDays} days</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-neutral-900">
                        {quote.clientName}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {quote.clientCompany}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right font-mono font-bold text-neutral-900 tabular-nums">
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
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openPreview(quote)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuoteId(quote.id);
                            navigateTo('edit-quote', quote.id);
                          }}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                          title="Edit Proposal"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateQuote(quote.id)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                          title="Duplicate Proposal"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete Proposal"
                        >
                          <Trash2 className="w-4 h-4" />
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
            {filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                className="p-4 space-y-3 hover:bg-neutral-50/60"
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

                <div
                  className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-mono tabular-nums">
                    Updated {formatDate(quote.updatedAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openPreview(quote)}
                      className="text-blue-600 font-semibold px-2 py-1"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => duplicateQuote(quote.id)}
                      className="text-neutral-600 px-2 py-1"
                    >
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
