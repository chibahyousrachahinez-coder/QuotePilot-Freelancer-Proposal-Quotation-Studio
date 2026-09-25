import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingNav } from '../layout/LandingNav';
import {
  ArrowRight,
  Check,
  Shield,
  Layers,
  Sparkles,
  DollarSign,
  Clock,
  Calendar,
  ChevronRight,
  Eye,
  FileCheck,
  Code,
  Palette,
  TrendingUp,
  Briefcase,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const { navigateTo, startQuoteFromTemplate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'milestones'>('overview');
  const [selectedRole, setSelectedRole] = useState<'developers' | 'designers' | 'marketers' | 'consultants' | 'creators'>('developers');

  const roleDetails = {
    developers: {
      title: 'Full-Stack & Web Developers',
      description: 'Quote hourly rates or sprint milestones, specify tech stacks, and explicitly exclude continuous out-of-scope maintenance.',
      exampleProject: 'Headless E-Commerce Store & Custom API',
      typicalInvestment: '$1,850 - $4,200',
      timeline: '14 - 21 Days',
      keyInclusions: ['Responsive layout & headless CMS', 'API rate limiting & webhook tests', '14 days deployment warranty'],
      templateId: 'tmpl-web-dev',
    },
    designers: {
      title: 'UI/UX & Brand Designers',
      description: 'Lock in revision rounds, deliver Figma design systems, and set clear client asset handoff deadlines.',
      exampleProject: 'Mobile App Wireframing & Design System',
      typicalInvestment: '$1,400 - $3,000',
      timeline: '18 - 25 Days',
      keyInclusions: ['Master Figma component file', 'Interactive clickable prototype', '2 structured revision cycles'],
      templateId: 'tmpl-uiux-design',
    },
    marketers: {
      title: 'Growth Marketers & Strategists',
      description: 'Frame your work by business outcomes, conversion funnel audits, and lifecycle email sequences.',
      exampleProject: 'Conversion Funnel Audit & Email Nurture',
      typicalInvestment: '$950 - $2,400',
      timeline: '10 - 14 Days',
      keyInclusions: ['Funnel drop-off heuristic report', '5 automated nurture emails', 'A/B testing sprint roadmap'],
      templateId: 'tmpl-marketing',
    },
    consultants: {
      title: 'Technical & Business Consultants',
      description: 'Structure monthly advisory retainers and automation roadmaps with 100% upfront milestone certainty.',
      exampleProject: 'Automated Operations & Webhook Architecture',
      typicalInvestment: '$1,200 - $3,500',
      timeline: '14 - 30 Days',
      keyInclusions: ['System architecture Mermaid diagrams', 'Zapier/Make resilient sync bridges', 'Executive sprint memo'],
      templateId: 'tmpl-consulting',
    },
    creators: {
      title: 'Video Editors & Motion Creators',
      description: 'Provide clear asset delivery requirements, music licensing rights, and discrete ratio exports.',
      exampleProject: 'Commercial 4K Video Promo & Social Cutdowns',
      typicalInvestment: '$850 - $2,200',
      timeline: '7 - 14 Days',
      keyInclusions: ['4K ProRes & web MP4 masters', '3 social cutdowns (9:16 & 1:1)', 'Commercial music licensing clearance'],
      templateId: 'tmpl-video',
    },
  };

  const currentRole = roleDetails[selectedRole];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#18181B] selection:bg-blue-100 selection:text-blue-900">
      <LandingNav />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 px-3 py-1 rounded-md border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Proposal & Quotation Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 font-display leading-[1.08] text-balance">
                Turn client requests into professional proposals.
              </h1>

              <p className="text-lg text-neutral-600 font-normal leading-relaxed max-w-xl text-balance">
                Create polished quotes, define your scope, calculate pricing, and send a professional proposal without starting from a blank document.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('new-quote')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-600/10 transition-all cursor-pointer group"
                >
                  <span>Create your first quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-150" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl transition-colors cursor-pointer"
                >
                  See how it works
                </button>
              </div>

              {/* Social proof proof points */}
              <div className="pt-4 flex items-center gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No blank documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Client-ready PDF & link</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Defined scope boundaries</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Interactive Live Proposal Preview */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative border frame */}
                <div className="bg-white rounded-2xl border border-neutral-300/80 shadow-2xl shadow-neutral-900/8 overflow-hidden">
                  
                  {/* Proposal Document Header */}
                  <div className="bg-neutral-900 text-white px-6 py-5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 block">
                        PROJECT PROPOSAL · QP-2026-001
                      </span>
                      <h2 className="text-lg font-bold font-display tracking-tight text-white mt-0.5">
                        Website Design & Development
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 block">Total Investment</span>
                      <span className="text-xl font-bold font-mono text-white tabular-nums">
                        $1,250
                      </span>
                    </div>
                  </div>

                  {/* Document Meta Row */}
                  <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200/80 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-y-2">
                    <div>
                      <span className="text-neutral-400">Prepared for: </span>
                      <span className="font-semibold text-neutral-800">Acme Coffee</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono tabular-nums">
                      <span>Timeline: <strong>14 days</strong></span>
                      <span className="text-neutral-300">|</span>
                      <span>Payment: <strong>50% / 50%</strong></span>
                    </div>
                  </div>

                  {/* Interactive Tab Switcher in the proposal */}
                  <div className="px-6 pt-4 border-b border-neutral-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'overview'
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                      }`}
                    >
                      Line Items
                    </button>
                    <button
                      onClick={() => setActiveTab('scope')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'scope'
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                      }`}
                    >
                      Scope Boundaries
                    </button>
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'milestones'
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                      }`}
                    >
                      Payment Terms
                    </button>
                  </div>

                  {/* Proposal Document Body Content */}
                  <div className="p-6 min-h-[260px] bg-white">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3.5"
                      >
                        <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                          <div>
                            <p className="text-xs font-semibold text-neutral-900">Website Design & Art Direction</p>
                            <p className="text-[11px] text-neutral-500">Custom homepage, product catalog & mobile layouts</p>
                          </div>
                          <span className="text-xs font-mono font-medium text-neutral-900 tabular-nums">1 × $450</span>
                        </div>
                        <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                          <div>
                            <p className="text-xs font-semibold text-neutral-900">Responsive Frontend Development</p>
                            <p className="text-[11px] text-neutral-500">Lightweight React implementation & roast selector</p>
                          </div>
                          <span className="text-xs font-mono font-medium text-neutral-900 tabular-nums">1 × $650</span>
                        </div>
                        <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                          <div>
                            <p className="text-xs font-semibold text-neutral-900">SEO & Core Vitals Setup</p>
                            <p className="text-[11px] text-neutral-500">Technical meta tags, open graph & sitemap structure</p>
                          </div>
                          <span className="text-xs font-mono font-medium text-neutral-900 tabular-nums">1 × $150</span>
                        </div>

                        {/* Summary totals */}
                        <div className="pt-2 flex justify-between items-center text-xs text-neutral-600">
                          <span>Subtotal</span>
                          <span className="font-mono tabular-nums font-semibold text-neutral-900">$1,250</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'scope' && (
                      <motion.div
                        key="scope"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div>
                          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                            Included in Scope
                          </span>
                          <ul className="text-xs text-neutral-700 space-y-1">
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Custom interactive roast intensity selector</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>2 rounds of structured revisions</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Figma design system source files handover</span>
                            </li>
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-neutral-100">
                          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                            Out of Scope
                          </span>
                          <p className="text-xs text-neutral-500">
                            Custom product photography (assets provided by client) & ongoing hosting fees.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'milestones' && (
                      <motion.div
                        key="milestones"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 text-xs"
                      >
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">Milestone 1: Kickoff Deposit (50%)</p>
                            <p className="text-[11px] text-neutral-500">Due prior to sprint kickoff</p>
                          </div>
                          <span className="font-mono font-bold text-neutral-900 tabular-nums">$625</span>
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">Milestone 2: Final Handover & Launch (50%)</p>
                            <p className="text-[11px] text-neutral-500">Due upon sign-off and domain transfer</p>
                          </div>
                          <span className="font-mono font-bold text-neutral-900 tabular-nums">$625</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Proposal Footer Action Bar */}
                  <div className="px-6 py-4 bg-neutral-50/80 border-t border-neutral-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-neutral-600">Client Ready</span>
                    </div>
                    <button
                      onClick={() => navigateTo('quotes')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Proposal View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 3 STEPS WORKFLOW */}
      <section id="how-it-works" className="py-20 lg:py-28 border-b border-neutral-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Fast, Structured Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display text-balance">
              From client request to ready-to-send proposal.
            </h2>
            <p className="text-base text-neutral-600 mt-3 text-balance">
              Never start from a blank Google Doc or struggle to calculate project margins again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 hover:border-neutral-300 transition-colors relative">
              <div className="text-4xl font-bold font-mono text-neutral-300 mb-4">01</div>
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                Add project details
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Capture client requirements, assign realistic start dates, calculate delivery deadlines, and select existing clients in one click.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 hover:border-neutral-300 transition-colors relative">
              <div className="text-4xl font-bold font-mono text-blue-400 mb-4">02</div>
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                Build your offer
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Add line items with quantity and hourly or fixed rates. Apply preset packages, tax, discount calculations, and payment milestones.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 hover:border-neutral-300 transition-colors relative">
              <div className="text-4xl font-bold font-mono text-neutral-300 mb-4">03</div>
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                Send a professional proposal
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Review a client-ready document with clear boundaries, print crisp PDF exports, or share a live digital sign-off link with zero friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY QUOTE PILOT - FEATURES GRID */}
      <section id="features" className="py-20 lg:py-28 border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Why QuotePilot
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display text-balance">
              Designed specifically for high-craft independent service providers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Smart pricing structure
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Toggle seamlessly between fixed-rate deliverables and hourly estimates with automatic discount and tax calculations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Professional proposals
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Clean, editorial typography and structured sections that reassure clients and justify premium rates without fluff.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Reusable templates
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Save time with pre-built templates for web engineering, UI design, copywriting, video, and advisory consulting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Clear project scope
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Explicitly define what is included, what is out-of-scope, and maximum revision limits to prevent costly scope creep.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Payment terms & milestones
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Split agreements into 50/50 deposits, 30/70 phases, or custom milestones tied to real deliverables and due dates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 mb-1.5">
                Client-ready presentation
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Share a live digital client proposal with one-click digital acceptance or print clean, print-styled PDF proposals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREELANCER CATEGORIES SECTION */}
      <section id="for-freelancers" className="py-20 lg:py-28 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Role Tailored
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display text-balance">
              Built for independent professionals.
            </h2>
            <p className="text-base text-neutral-600 mt-2">
              Select your specialty to see how QuotePilot adapts to your specific billing models and contracts.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'developers', label: 'Developers', icon: Code },
              { id: 'designers', label: 'Designers', icon: Palette },
              { id: 'marketers', label: 'Marketers', icon: TrendingUp },
              { id: 'consultants', label: 'Consultants', icon: Briefcase },
              { id: 'creators', label: 'Creators', icon: Video },
            ].map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role Card Feature */}
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold font-display text-neutral-900">
                  {currentRole.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {currentRole.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-neutral-900 block mb-2">
                    Standard Scope Safeguards:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {currentRole.keyInclusions.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                <div>
                  <span className="text-[11px] text-neutral-400 font-mono block uppercase">Sample Proposal</span>
                  <p className="text-sm font-bold text-neutral-900">{currentRole.exampleProject}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100 font-mono tabular-nums">
                  <span className="text-neutral-500">Typical Range:</span>
                  <span className="font-semibold text-neutral-900">{currentRole.typicalInvestment}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="text-neutral-500">Average Duration:</span>
                  <span className="font-medium text-neutral-900">{currentRole.timeline}</span>
                </div>

                <button
                  onClick={() => startQuoteFromTemplate(currentRole.templateId)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Use this template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PACKAGES OVERVIEW SECTION */}
      <section id="pricing-packages" className="py-20 lg:py-28 border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-block mb-3">
              Package Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display text-balance">
              Offer tiered packages with clear value boundaries.
            </h2>
            <p className="text-base text-neutral-600 mt-2">
              Empower clients to choose their ideal tier while keeping your margins healthy and expectations clear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                    BASIC
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">5-7 Days</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-1">
                  Quick Launch Sprint
                </h3>
                <div className="my-6">
                  <span className="text-4xl font-bold font-mono text-neutral-900 tabular-nums">$500</span>
                  <span className="text-xs text-neutral-500 block mt-1">Fixed investment</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Single high-converting landing page</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Responsive mobile & tablet design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>1 structured revision round</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Contact form integration</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigateTo('new-quote')}
                className="w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Quote this tier
              </button>
            </div>

            {/* Standard - Featured */}
            <div className="p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-900 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                Most Popular
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                    STANDARD
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">10-14 Days</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-1">
                  Growth Professional
                </h3>
                <div className="my-6">
                  <span className="text-4xl font-bold font-mono text-white tabular-nums">$900</span>
                  <span className="text-xs text-neutral-400 block mt-1">Fixed investment</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Up to 5 custom responsive pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Technical SEO setup & metadata</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>3 structured revision rounds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Headless CMS integration</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigateTo('new-quote')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer"
              >
                Quote this tier
              </button>
            </div>

            {/* Premium */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                    PREMIUM
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">18-24 Days</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-900 mb-1">
                  Enterprise Bespoke
                </h3>
                <div className="my-6">
                  <span className="text-4xl font-bold font-mono text-neutral-900 tabular-nums">$1,500</span>
                  <span className="text-xs text-neutral-500 block mt-1">Fixed investment</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Up to 10 custom pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Advanced animations & 3D visualizer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Full Figma token system handover</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unlimited revisions during build</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigateTo('new-quote')}
                className="w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Quote this tier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-28 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display text-balance">
            Stop starting proposals from a blank page.
          </h2>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto font-normal text-balance">
            Create your next quote in minutes. Define terms, protect your scope, and get proposals accepted faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('new-quote')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-600/15 transition-all cursor-pointer group"
            >
              <span>Create your first quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-150" />
            </button>
            <button
              onClick={() => navigateTo('templates')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl transition-colors cursor-pointer"
            >
              Explore Templates
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold font-display text-neutral-900">QuotePilot</span>
            <span>·</span>
            <span>Turn client requests into professional proposals.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('dashboard')} className="hover:text-neutral-900">
              Dashboard
            </button>
            <button onClick={() => navigateTo('quotes')} className="hover:text-neutral-900">
              Quotes
            </button>
            <button onClick={() => navigateTo('templates')} className="hover:text-neutral-900">
              Templates
            </button>
            <button onClick={() => navigateTo('settings')} className="hover:text-neutral-900">
              Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
