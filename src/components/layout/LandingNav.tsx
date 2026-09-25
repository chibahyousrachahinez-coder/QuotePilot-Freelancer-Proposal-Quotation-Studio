import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, ArrowRight } from 'lucide-react';

interface LandingNavProps {
  onScrollToSection?: (sectionId: string) => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onScrollToSection }) => {
  const { navigateTo } = useApp();

  const handleNav = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-left focus-visible:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-display font-bold text-sm tracking-tighter group-hover:bg-blue-600 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900 font-display">
            QuotePilot
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => handleNav('how-it-works')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            onClick={() => handleNav('features')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNav('for-freelancers')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            For Freelancers
          </button>
          <button
            onClick={() => handleNav('pricing-packages')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Pricing Architecture
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 transition-colors whitespace-nowrap"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigateTo('new-quote');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span>+ New Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
