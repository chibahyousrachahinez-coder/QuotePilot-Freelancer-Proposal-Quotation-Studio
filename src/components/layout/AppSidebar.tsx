import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';
import {
  LayoutDashboard,
  FileText,
  Users,
  Layers,
  Package,
  Settings,
  Plus,
  Compass,
  ArrowUpRight,
  Menu,
  X,
  Download,
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    quotes,
    clients,
    templates,
    settings,
    exportDataJson,
    setActiveQuoteDraft,
    setSelectedQuoteId,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: {
    view: ActiveView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'quotes', label: 'Quotes', icon: FileText, count: quotes.length },
    { view: 'clients', label: 'Clients', icon: Users, count: clients.length },
    { view: 'templates', label: 'Templates', icon: Layers, count: templates.length },
    { view: 'packages', label: 'Packages', icon: Package },
    { view: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleStartNewQuote = () => {
    setActiveQuoteDraft(null);
    setSelectedQuoteId(null);
    navigateTo('new-quote');
    setMobileMenuOpen(false);
  };

  const handleNav = (view: ActiveView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#FAF9F6] border-b border-neutral-200">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-md bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-base text-neutral-900">
            QuotePilot
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStartNewQuote}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Quote</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-neutral-900/30 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-neutral-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top brand & navigation */}
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 group text-left"
              title="Return to QuotePilot Landing Page"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-display font-bold text-sm tracking-tighter group-hover:bg-blue-600 transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-neutral-900 font-display block leading-none">
                  QuotePilot
                </span>
                <span className="text-[11px] text-neutral-500 font-normal mt-0.5 block">
                  Proposal Studio
                </span>
              </div>
            </button>
            <button
              onClick={() => navigateTo('landing')}
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded transition-colors"
              title="Visit Landing Page"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={handleStartNewQuote}
            className="w-full mb-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer group"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
            <span>New Quote</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-blue-600' : 'text-neutral-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs font-mono text-neutral-400 tabular-nums">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & studio profile */}
        <div className="p-4 border-t border-neutral-200/80 bg-neutral-50/50">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {settings.businessName}
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                {settings.freelancerName}
              </p>
            </div>
            <button
              onClick={exportDataJson}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-white rounded-md border border-transparent hover:border-neutral-200 transition-colors shrink-0"
              title="Export JSON Backup"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
