import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Template } from '../../types';
import {
  Layers,
  Code,
  Palette,
  FileEdit,
  Video,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Search,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const { templates, startQuoteFromTemplate, settings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'design', label: 'UI/UX Design', icon: Palette },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'consulting', label: 'Consulting', icon: Briefcase },
    { id: 'content', label: 'Content & Copy', icon: FileEdit },
    { id: 'video', label: 'Video & Media', icon: Video },
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const getEstimatedValue = (tmpl: Template) => {
    return tmpl.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            Proposal Templates
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Turn client briefs into polished offers in seconds using pre-built scope boundaries and milestones.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-xl pb-2 md:pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const estimatedValue = getEstimatedValue(template);

          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{template.timelineDays} days</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Scope highlights */}
                <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block font-mono">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {template.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                    Starting Value
                  </span>
                  <span className="font-mono font-bold text-neutral-900 text-base tabular-nums">
                    {settings.currency}{estimatedValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="View Template Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startQuoteFromTemplate(template.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TEMPLATE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold">
                  {previewTemplate.category.toUpperCase()} TEMPLATE
                </span>
                <h2 className="text-xl font-bold font-display text-neutral-900 mt-0.5">
                  {previewTemplate.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Estimated duration: {previewTemplate.timelineDays} days
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              {previewTemplate.description}
            </p>

            {/* Line items included */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block">
                Pre-configured Line Items
              </span>
              <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-100 text-xs">
                {previewTemplate.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-neutral-500 mt-0.5">{item.description}</p>
                    </div>
                    <span className="font-mono font-bold text-neutral-900 shrink-0 tabular-nums">
                      {settings.currency}{item.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope inclusions / exclusions */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                <span className="font-semibold text-emerald-800 block">Inclusions</span>
                <ul className="space-y-1 text-neutral-700">
                  {previewTemplate.scope.included.map((inc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <span className="font-semibold text-neutral-700 block">Exclusions</span>
                <ul className="space-y-1 text-neutral-500">
                  {previewTemplate.scope.notIncluded.map((notInc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>{notInc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = previewTemplate.id;
                  setPreviewTemplate(null);
                  startQuoteFromTemplate(id);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Create Quote with this Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
