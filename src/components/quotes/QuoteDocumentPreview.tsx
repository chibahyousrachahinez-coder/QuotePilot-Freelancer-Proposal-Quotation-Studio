import React, { useState } from 'react';
import { Quote } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Printer,
  CheckCircle2,
  Copy,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Download,
  ShieldCheck,
  Edit,
  ExternalLink,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface QuoteDocumentPreviewProps {
  quote: Quote;
  isClientView?: boolean;
  onEdit?: () => void;
  onBack?: () => void;
}

export const QuoteDocumentPreview: React.FC<QuoteDocumentPreviewProps> = ({
  quote,
  isClientView = false,
  onEdit,
  onBack,
}) => {
  const { settings, acceptQuoteAsClient, updateQuoteStatus, showToast } = useApp();
  const [signerName, setSignerName] = useState(quote.clientName || '');
  const [isSigning, setIsSigning] = useState(false);
  const [acceptedSuccess, setAcceptedSuccess] = useState(quote.status === 'accepted');

  const formatMoney = (val: number) => {
    return `${quote.currency}${val.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied', 'Client proposal link copied to clipboard.', 'success');
  };

  const handleAcceptProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      showToast('Name required', 'Please enter your full name to sign this agreement.', 'error');
      return;
    }
    acceptQuoteAsClient(quote.id, signerName);
    setAcceptedSuccess(true);
    setIsSigning(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar (Hidden when printing via .no-print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-neutral-500">
              {quote.quoteNumber}
            </span>
            <span className="text-neutral-300">·</span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                quote.status === 'accepted'
                  ? 'text-emerald-600'
                  : quote.status === 'sent'
                  ? 'text-blue-600'
                  : 'text-neutral-500'
              }`}
            >
              Status: {quote.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Proposal</span>
            </button>
          )}

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            title="Copy digital proposal link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print PDF</span>
          </button>

          {quote.status === 'draft' && (
            <button
              onClick={() => updateQuoteStatus(quote.id, 'sent')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <span>Mark as Sent</span>
            </button>
          )}
        </div>
      </div>

      {/* Acceptance Banner if already accepted */}
      {quote.status === 'accepted' && (
        <div className="no-print p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-950">
                Proposal Formally Accepted
              </p>
              <p className="text-xs text-emerald-800">
                {quote.clientNotes || `Confirmed on ${formatDate(quote.acceptedAt || quote.updatedAt)}`}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-white px-3 py-1 rounded-md border border-emerald-200">
            Locked & Active
          </span>
        </div>
      )}

      {/* PRINTABLE / VIEWABLE PROPOSAL DOCUMENT */}
      <div className="proposal-print-container max-w-4xl mx-auto bg-white rounded-2xl border border-neutral-200/90 shadow-xl shadow-neutral-900/4 p-8 sm:p-12 text-[#18181B] space-y-12">
        
        {/* DOCUMENT HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded bg-neutral-900 text-white flex items-center justify-center font-bold text-xs font-display">
                {settings.logoText || 'QP'}
              </span>
              <span className="text-base font-bold font-display tracking-tight text-neutral-900">
                {settings.businessName}
              </span>
            </div>
            <p className="text-xs text-neutral-500">{settings.title}</p>
            <p className="text-xs text-neutral-500">{settings.email} · {settings.phone}</p>
            {settings.website && (
              <p className="text-xs text-neutral-500">{settings.website}</p>
            )}
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
              PROJECT PROPOSAL
            </span>
            <div className="text-sm font-mono font-bold text-neutral-900">
              {quote.quoteNumber}
            </div>
            <div className="text-xs text-neutral-500">
              Date: {formatDate(quote.createdAt)}
            </div>
            <div className="text-xs text-neutral-500">
              Valid until: {formatDate(quote.validUntil)}
            </div>
          </div>
        </div>

        {/* PROPOSAL TITLE & PREPARED FOR */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 py-2">
          <div className="sm:col-span-7 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold block">
              Project Name
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-neutral-950 tracking-tight leading-tight">
              {quote.title}
            </h1>
          </div>

          <div className="sm:col-span-5 bg-neutral-50/80 p-5 rounded-xl border border-neutral-200/80 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
              Prepared For
            </span>
            <p className="text-sm font-bold text-neutral-900 leading-snug">
              {quote.clientName}
            </p>
            <p className="text-xs font-medium text-neutral-700">
              {quote.clientCompany}
            </p>
            {quote.clientEmail && (
              <p className="text-xs text-neutral-500">{quote.clientEmail}</p>
            )}
            {quote.clientPhone && (
              <p className="text-xs text-neutral-500">{quote.clientPhone}</p>
            )}
            <p className="text-[11px] text-neutral-400 pt-2">
              Prepared by: <span className="text-neutral-700 font-medium">{settings.freelancerName}</span>
            </p>
          </div>
        </div>

        {/* PROJECT OVERVIEW */}
        {quote.description && (
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Project Overview
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl whitespace-pre-line">
              {quote.description}
            </p>
          </div>
        )}

        {/* SCOPE OF WORK & SERVICES (TABLE) */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Scope of Work & Services
          </h2>

          <div className="border border-neutral-200/80 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200/80 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-4">Service & Description</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Rate</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {quote.items.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/30">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-neutral-500 mt-0.5 max-w-lg">
                          {item.description}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-neutral-600 text-xs tabular-nums">
                      {item.quantity} {item.unit || ''}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-neutral-700 text-xs tabular-nums">
                      {formatMoney(item.rate)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900 text-sm tabular-nums">
                      {formatMoney(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DELIVERABLES & TIMELINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Deliverables */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Key Deliverables
            </h2>
            <ul className="space-y-2">
              {quote.deliverables && quote.deliverables.length > 0 ? (
                quote.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-400">All agreed project deliverables per scope specifications.</li>
              )}
            </ul>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Project Timeline
            </h2>
            <div className="p-4 bg-neutral-50/70 rounded-xl border border-neutral-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Estimated Duration:</span>
                <span className="font-bold font-mono text-neutral-900">
                  {quote.timelineDays} Days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Target Kickoff:</span>
                <span className="font-medium font-mono text-neutral-800">
                  {formatDate(quote.startDate)}
                </span>
              </div>
              {quote.estimatedCompletionDate && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Completion Target:</span>
                  <span className="font-medium font-mono text-neutral-800">
                    {formatDate(quote.estimatedCompletionDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* INVESTMENT BREAKDOWN */}
        <div className="p-6 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
              TOTAL INVESTMENT
            </span>
            <p className="text-xs text-neutral-300 mt-1 max-w-sm">
              All deliverables, scoped requirements, and technical handovers included.
            </p>
          </div>

          <div className="w-full sm:w-auto space-y-1.5 min-w-[240px] text-right">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-neutral-200">
                {formatMoney(quote.subtotal)}
              </span>
            </div>

            {quote.discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Discount</span>
                <span className="font-mono tabular-nums">
                  -{formatMoney(quote.discountAmount)}
                </span>
              </div>
            )}

            {quote.taxAmount > 0 && (
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Tax ({quote.taxRate}%)</span>
                <span className="font-mono tabular-nums text-neutral-200">
                  +{formatMoney(quote.taxAmount)}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
              <span className="text-sm font-semibold text-white">Final Amount</span>
              <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                {formatMoney(quote.total)}
              </span>
            </div>
          </div>
        </div>

        {/* PAYMENT TERMS & MILESTONES */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Payment Terms & Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quote.paymentMilestones && quote.paymentMilestones.length > 0 ? (
              quote.paymentMilestones.map((milestone, idx) => (
                <div
                  key={milestone.id || idx}
                  className="p-4 bg-neutral-50/70 rounded-xl border border-neutral-200/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">
                      {milestone.title} ({milestone.percentage}%)
                    </span>
                    <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                      {formatMoney(milestone.amount)}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {milestone.dueWhen || 'Upon milestone delivery'}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-neutral-50/70 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                50% deposit upon kickoff, 50% upon project completion.
              </div>
            )}
          </div>
        </div>

        {/* WHAT'S INCLUDED / NOT INCLUDED / REVISIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Included */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1.5">
              <span>What&apos;s Included</span>
            </h2>
            <ul className="space-y-2">
              {quote.scope?.included && quote.scope.included.length > 0 ? (
                quote.scope.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-500">All deliverables listed in the scope of work.</li>
              )}
            </ul>
          </div>

          {/* Not Included */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-1.5">
              <span>What&apos;s Not Included</span>
            </h2>
            <ul className="space-y-2">
              {quote.scope?.notIncluded && quote.scope.notIncluded.length > 0 ? (
                quote.scope.notIncluded.map((notInc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                    <X className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{notInc}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-500">Additional deliverables requested outside the agreement.</li>
              )}
            </ul>
          </div>
        </div>

        {/* REVISIONS & CLIENT RESPONSIBILITIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-neutral-100">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Revisions Policy
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {quote.scope?.revisionPolicy ||
                `${quote.scope?.revisionsCount || 2} rounds of consolidated revisions are included.`}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Client Responsibilities
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-600">
              {quote.scope?.clientResponsibilities && quote.scope.clientResponsibilities.length > 0 ? (
                quote.scope.clientResponsibilities.map((resp, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>{resp}</span>
                  </li>
                ))
              ) : (
                <li>Timely delivery of assets and single point-of-contact for approvals.</li>
              )}
            </ul>
          </div>
        </div>

        {/* NEXT STEPS & SIGN OFF */}
        <div className="pt-6 border-t border-neutral-200 space-y-6">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
              Next Steps
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {quote.nextSteps ||
                'To accept this proposal, please sign below to confirm agreement and reserve your delivery dates.'}
            </p>
          </div>

          {/* SIGNATURE / ACCEPT PROPOSAL BLOCK */}
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-900 block">
                Formal Acceptance & Sign-off
              </span>
              <p className="text-xs text-neutral-500 max-w-sm">
                Signing confirms agreement to the deliverables, investment, timeline, and terms described above.
              </p>
            </div>

            {quote.status === 'accepted' ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Accepted & Signed</span>
              </div>
            ) : isSigning ? (
              <form onSubmit={handleAcceptProposal} className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  Confirm & Accept
                </button>
                <button
                  type="button"
                  onClick={() => setIsSigning(false)}
                  className="px-3 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-800"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSigning(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Accept Proposal ({formatMoney(quote.total)})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
