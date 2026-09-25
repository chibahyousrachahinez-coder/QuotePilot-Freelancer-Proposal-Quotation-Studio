import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserSettings } from '../../types';
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Check,
  Shield,
  Building,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportDataJson,
    importDataJson,
    resetToDemoData,
    showToast,
  } = useApp();

  const [formData, setFormData] = useState<UserSettings>({ ...settings });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (field: keyof UserSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    showToast('Settings saved', 'Your business profile and defaults have been updated.', 'success');
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJson(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            Studio Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Configure your proposal branding, tax defaults, and backup data.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Business & Freelancer Profile */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-base font-bold font-display text-neutral-900">
              Freelancer & Studio Profile
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              These details are automatically printed on the header of every proposal you send.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Freelancer Full Name
              </label>
              <input
                type="text"
                value={formData.freelancerName}
                onChange={(e) => handleChange('freelancerName', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Senior Frontend Architect & UI Designer"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Studio / Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Logo Monogram Mark (1-3 Letters)
              </label>
              <input
                type="text"
                maxLength={4}
                value={formData.logoText || ''}
                onChange={(e) => handleChange('logoText', e.target.value)}
                placeholder="QP"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Portfolio / Website
              </label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://elena-rostova.design"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Financial & Defaults */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-base font-bold font-display text-neutral-900">
              Financial & Billing Defaults
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Standard currency and tax rates automatically pre-filled when creating new quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Currency Symbol
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              >
                <option value="$">$ (USD / CAD / AUD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="¥">¥ (JPY)</option>
                <option value="CHF">CHF (Swiss Franc)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Currency ISO Code
              </label>
              <input
                type="text"
                value={formData.currencyCode}
                onChange={(e) => handleChange('currencyCode', e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Default Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.defaultTaxRate}
                onChange={(e) => handleChange('defaultTaxRate', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Standard Terms & Scope Policies */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-base font-bold font-display text-neutral-900">
              Standard Scope & Revision Policies
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Default terms inserted when starting new proposals from scratch.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Default Revision Policy Copy
              </label>
              <input
                type="text"
                value={formData.defaultRevisionPolicy || ''}
                onChange={(e) => handleChange('defaultRevisionPolicy', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Default Proposal Next Steps
              </label>
              <textarea
                rows={3}
                value={formData.defaultNextSteps || ''}
                onChange={(e) => handleChange('defaultNextSteps', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Data Persistence, Backup & Reset */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-base font-bold font-display text-neutral-900">
              Data Management & Backup
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              QuotePilot persists all quotes, clients, and templates securely in your browser&apos;s localStorage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={exportDataJson}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON Backup</span>
              </button>

              <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              {showResetConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-600 font-semibold">Reset to demo?</span>
                  <button
                    type="button"
                    onClick={() => {
                      resetToDemoData();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2 py-1.5 text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
