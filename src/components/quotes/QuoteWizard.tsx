import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Quote,
  QuoteItem,
  PaymentMilestone,
  ScopeBoundary,
  PricingType,
  Client,
} from '../../types';
import { QuoteDocumentPreview } from './QuoteDocumentPreview';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  Calendar,
  DollarSign,
  User,
  Briefcase,
  Layers,
  FileCheck,
  ShieldAlert,
  Save,
  Send,
  Printer,
  Sparkles,
  HelpCircle,
  Clock,
  ChevronDown,
} from 'lucide-react';

interface QuoteWizardProps {
  initialQuoteId?: string | null;
  onDone?: () => void;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  initialQuoteId,
  onDone,
}) => {
  const {
    quotes,
    clients,
    templates,
    packages,
    settings,
    addQuote,
    updateQuote,
    addClient,
    activeQuoteDraft,
    setActiveQuoteDraft,
    navigateTo,
    showToast,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Step 2: Project
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [pricingType, setPricingType] = useState<PricingType>('fixed');

  // Step 3: Services / Line Items
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 'item-1',
      name: 'Website Design & Art Direction',
      description: 'Custom responsive design system and high-fidelity mockups.',
      quantity: 1,
      unit: 'project',
      rate: 450,
      total: 450,
    },
    {
      id: 'item-2',
      name: 'Frontend Development & Interactions',
      description: 'Clean responsive implementation with micro-interactions.',
      quantity: 1,
      unit: 'project',
      rate: 650,
      total: 650,
    },
  ]);

  // Step 4: Pricing
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(settings.defaultTaxRate || 0);

  // Step 5: Payment Terms
  const [paymentTermType, setPaymentTermType] = useState<'50_50' | '30_70' | '33_33_34' | '100_upfront' | 'custom'>('50_50');
  const [customMilestones, setCustomMilestones] = useState<PaymentMilestone[]>([
    {
      id: 'm-1',
      title: 'Initial Kickoff Deposit',
      percentage: 50,
      amount: 0,
      dueWhen: 'Due upon signing proposal',
    },
    {
      id: 'm-2',
      title: 'Final Handover & Launch',
      percentage: 50,
      amount: 0,
      dueWhen: 'Due upon domain handover',
    },
  ]);

  // Step 6: Scope Boundaries
  const [includedItems, setIncludedItems] = useState<string[]>([
    'Responsive layouts for desktop, tablet, and mobile',
    'Handover of Figma design source files and component library',
    'Technical SEO metadata and OpenGraph tag setup',
    '14 days post-launch warranty support',
  ]);
  const [notIncludedItems, setNotIncludedItems] = useState<string[]>([
    'Third-party hosting subscription fees and domain costs',
    'Copywriting for blog posts beyond core website pages',
    'On-site photo shoots or video production',
  ]);
  const [revisionsCount, setRevisionsCount] = useState<number>(2);
  const [revisionPolicy, setRevisionPolicy] = useState<string>(
    settings.defaultRevisionPolicy || '2 rounds of structured revisions included. Additional revisions billed at standard rate.'
  );
  const [clientResponsibilities, setClientResponsibilities] = useState<string[]>([
    'Provide high-res logos, photography, and brand assets within 5 days',
    'Designate a single consolidated decision maker for approvals',
  ]);
  const [newIncludedInput, setNewIncludedInput] = useState('');
  const [newNotIncludedInput, setNewNotIncludedInput] = useState('');
  const [newRespInput, setNewRespInput] = useState('');

  // Editing existing quote or template draft init
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(initialQuoteId || null);

  useEffect(() => {
    // If editing existing quote
    if (initialQuoteId) {
      const q = quotes.find((quote) => quote.id === initialQuoteId);
      if (q) {
        setEditingQuoteId(q.id);
        setSelectedClientId(q.clientId);
        setClientName(q.clientName);
        setClientCompany(q.clientCompany);
        setClientEmail(q.clientEmail);
        setClientPhone(q.clientPhone);
        setProjectName(q.title);
        setProjectDescription(q.description);
        setStartDate(q.startDate);
        setEstimatedCompletionDate(q.estimatedCompletionDate);
        setPricingType(q.pricingType);
        setItems(q.items);
        setDiscountType(q.discountType);
        setDiscountValue(q.discountValue);
        setTaxRate(q.taxRate);
        setPaymentTermType(q.paymentTermType);
        if (q.paymentMilestones && q.paymentMilestones.length > 0) {
          setCustomMilestones(q.paymentMilestones);
        }
        if (q.scope) {
          setIncludedItems(q.scope.included || []);
          setNotIncludedItems(q.scope.notIncluded || []);
          setRevisionPolicy(q.scope.revisionPolicy || '');
          setRevisionsCount(q.scope.revisionsCount || 2);
          setClientResponsibilities(q.scope.clientResponsibilities || []);
        }
        return;
      }
    }

    // If starting from active draft (e.g. from template or package)
    if (activeQuoteDraft) {
      if (activeQuoteDraft.clientName) setClientName(activeQuoteDraft.clientName);
      if (activeQuoteDraft.clientCompany) setClientCompany(activeQuoteDraft.clientCompany);
      if (activeQuoteDraft.clientEmail) setClientEmail(activeQuoteDraft.clientEmail);
      if (activeQuoteDraft.clientPhone) setClientPhone(activeQuoteDraft.clientPhone);
      if (activeQuoteDraft.clientId) setSelectedClientId(activeQuoteDraft.clientId);
      if (activeQuoteDraft.title) setProjectName(activeQuoteDraft.title);
      if (activeQuoteDraft.description) setProjectDescription(activeQuoteDraft.description);
      if (activeQuoteDraft.items) setItems(activeQuoteDraft.items);
      if (activeQuoteDraft.paymentTermType) setPaymentTermType(activeQuoteDraft.paymentTermType);
      if (activeQuoteDraft.paymentMilestones) setCustomMilestones(activeQuoteDraft.paymentMilestones);
      if (activeQuoteDraft.scope) {
        setIncludedItems(activeQuoteDraft.scope.included || []);
        setNotIncludedItems(activeQuoteDraft.scope.notIncluded || []);
        setRevisionPolicy(activeQuoteDraft.scope.revisionPolicy || '');
        setRevisionsCount(activeQuoteDraft.scope.revisionsCount || 2);
        setClientResponsibilities(activeQuoteDraft.scope.clientResponsibilities || []);
      }
    } else if (clients.length > 0 && !selectedClientId) {
      // Default to first client for quick experience
      handleSelectClient(clients[0].id);
    }
  }, [initialQuoteId, activeQuoteDraft]);

  // Handle client selection
  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    if (!clientId) return;
    const c = clients.find((client) => client.id === clientId);
    if (c) {
      setClientName(c.name);
      setClientCompany(c.company);
      setClientEmail(c.email);
      setClientPhone(c.phone);
    }
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const discountAmount =
    discountType === 'percentage'
      ? Math.round((subtotal * discountValue) / 100)
      : Math.min(subtotal, discountValue);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * taxRate) / 100);
  const total = Math.max(0, taxableAmount + taxAmount);

  // Auto update milestones whenever total or paymentTermType changes
  const computedMilestones: PaymentMilestone[] = React.useMemo(() => {
    if (paymentTermType === '50_50') {
      const half = Math.round(total * 0.5);
      return [
        {
          id: 'm-1',
          title: 'Initial Deposit (50%)',
          percentage: 50,
          amount: half,
          dueWhen: 'Due upon signing proposal',
        },
        {
          id: 'm-2',
          title: 'Final Handover & Launch (50%)',
          percentage: 50,
          amount: total - half,
          dueWhen: 'Due prior to domain deployment',
        },
      ];
    } else if (paymentTermType === '30_70') {
      const p1 = Math.round(total * 0.3);
      return [
        {
          id: 'm-1',
          title: 'Discovery & Kickoff (30%)',
          percentage: 30,
          amount: p1,
          dueWhen: 'Due upon signing proposal',
        },
        {
          id: 'm-2',
          title: 'Final Delivery & Sign-off (70%)',
          percentage: 70,
          amount: total - p1,
          dueWhen: 'Due upon delivery of final assets',
        },
      ];
    } else if (paymentTermType === '33_33_34') {
      const p1 = Math.round(total * 0.33);
      const p2 = Math.round(total * 0.33);
      return [
        {
          id: 'm-1',
          title: 'Phase 1 Deposit (33%)',
          percentage: 33,
          amount: p1,
          dueWhen: 'Due upon signing proposal',
        },
        {
          id: 'm-2',
          title: 'Phase 2 Midpoint Review (33%)',
          percentage: 33,
          amount: p2,
          dueWhen: 'Due upon completion of prototype review',
        },
        {
          id: 'm-3',
          title: 'Phase 3 Final Delivery (34%)',
          percentage: 34,
          amount: total - (p1 + p2),
          dueWhen: 'Due upon final handover',
        },
      ];
    } else if (paymentTermType === '100_upfront') {
      return [
        {
          id: 'm-1',
          title: 'Full Upfront Retainer (100%)',
          percentage: 100,
          amount: total,
          dueWhen: 'Due in full before sprint Day 1',
        },
      ];
    } else {
      // Custom milestones - recalculate amounts based on percentages
      return customMilestones.map((m) => ({
        ...m,
        amount: Math.round((total * m.percentage) / 100),
      }));
    }
  }, [total, paymentTermType, customMilestones]);

  // Calculate timeline duration in days
  const startD = new Date(startDate);
  const endD = new Date(estimatedCompletionDate);
  const timelineDays = Math.max(1, Math.round((endD.getTime() - startD.getTime()) / (1000 * 3600 * 24)));

  // Line item manipulation
  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: 'item-' + Date.now(),
      name: 'Additional Deliverable',
      description: 'Scope details and deliverables',
      quantity: 1,
      unit: pricingType === 'hourly' ? 'hrs' : 'item',
      rate: 150,
      total: 150,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<QuoteItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          const qty = Number(updated.quantity) || 0;
          const r = Number(updated.rate) || 0;
          updated.total = qty * r;
          return updated;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      showToast('Minimum item', 'A proposal must have at least one line item.', 'info');
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Preset items adder
  const handleAddPreset = (presetName: string, desc: string, rate: number, unit = 'project') => {
    const newItem: QuoteItem = {
      id: 'item-' + Date.now() + Math.random().toString(36).substring(2, 5),
      name: presetName,
      description: desc,
      quantity: 1,
      unit,
      rate,
      total: rate,
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Service added', `Added ${presetName} ($${rate})`, 'info');
  };

  // Scope handlers
  const handleAddIncluded = () => {
    if (!newIncludedInput.trim()) return;
    setIncludedItems((prev) => [...prev, newIncludedInput.trim()]);
    setNewIncludedInput('');
  };

  const handleRemoveIncluded = (idx: number) => {
    setIncludedItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddNotIncluded = () => {
    if (!newNotIncludedInput.trim()) return;
    setNotIncludedItems((prev) => [...prev, newNotIncludedInput.trim()]);
    setNewNotIncludedInput('');
  };

  const handleRemoveNotIncluded = (idx: number) => {
    setNotIncludedItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddResp = () => {
    if (!newRespInput.trim()) return;
    setClientResponsibilities((prev) => [...prev, newRespInput.trim()]);
    setNewRespInput('');
  };

  const handleRemoveResp = (idx: number) => {
    setClientResponsibilities((prev) => prev.filter((_, i) => i !== idx));
  };

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!clientName.trim()) newErrors.clientName = 'Client name is required';
      if (!clientCompany.trim()) newErrors.clientCompany = 'Company name is required';
      if (clientEmail && !clientEmail.includes('@')) newErrors.clientEmail = 'Invalid email address';
    }

    if (step === 2) {
      if (!projectName.trim()) newErrors.projectName = 'Project name is required';
      if (!startDate) newErrors.startDate = 'Start date is required';
      if (!estimatedCompletionDate) newErrors.estimatedCompletionDate = 'Completion date is required';
      if (new Date(estimatedCompletionDate) < new Date(startDate)) {
        newErrors.estimatedCompletionDate = 'Completion date cannot be before start date';
      }
    }

    if (step === 3) {
      if (items.length === 0) newErrors.items = 'Please add at least one line item';
      const hasInvalid = items.some((i) => !i.name.trim() || i.rate < 0 || i.quantity <= 0);
      if (hasInvalid) newErrors.items = 'Line items must have a name, positive quantity, and non-negative rate';
    }

    if (step === 4) {
      if (total < 0) newErrors.pricing = 'Total amount cannot be negative';
      if (discountValue < 0) newErrors.discount = 'Discount cannot be negative';
      if (taxRate < 0) newErrors.tax = 'Tax rate cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(7, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Validation notice', 'Please check the required fields before continuing.', 'error');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build the complete Quote object
  const buildCurrentQuote = (status: 'draft' | 'sent' = 'draft'): Partial<Quote> => {
    return {
      title: projectName,
      description: projectDescription,
      clientId: selectedClientId,
      clientName,
      clientCompany,
      clientEmail,
      clientPhone,
      pricingType,
      items,
      subtotal,
      discountType,
      discountValue,
      discountAmount,
      taxRate,
      taxAmount,
      total,
      currency: settings.currency,
      currencyCode: settings.currencyCode,
      startDate,
      estimatedCompletionDate,
      timelineDays,
      paymentTermType,
      paymentMilestones: computedMilestones,
      scope: {
        included: includedItems,
        notIncluded: notIncludedItems,
        revisionPolicy,
        revisionsCount,
        clientResponsibilities,
      },
      deliverables: items.map((i) => i.name),
      status,
    };
  };

  const handleSaveDraft = () => {
    if (!validateStep(1) || !validateStep(2)) {
      showToast('Incomplete', 'Please fill in client and project information to save draft.', 'error');
      return;
    }

    const payload = buildCurrentQuote('draft');

    if (editingQuoteId) {
      updateQuote(editingQuoteId, payload);
      showToast('Draft updated', 'Proposal draft saved successfully.', 'success');
      navigateTo('quotes');
    } else {
      const created = addQuote(payload);
      setActiveQuoteDraft(null);
      navigateTo('quotes');
    }
  };

  const handleSendProposal = () => {
    if (!validateStep(currentStep)) return;

    const payload = buildCurrentQuote('sent');
    if (editingQuoteId) {
      updateQuote(editingQuoteId, payload);
      showToast('Proposal sent', 'Proposal marked as sent and ready for client sign-off.', 'success');
      navigateTo('quotes');
    } else {
      const created = addQuote(payload);
      setActiveQuoteDraft(null);
      showToast('Proposal created', `${created.quoteNumber} marked as sent!`, 'success');
      navigateTo('quotes');
    }
  };

  // Generate preview object for Step 7
  const currentPreviewQuote: Quote = {
    id: editingQuoteId || 'preview-quote',
    quoteNumber: editingQuoteId ? quotes.find((q) => q.id === editingQuoteId)?.quoteNumber || 'QP-2026-NEW' : 'QP-2026-NEW',
    title: projectName || 'Untitled Project',
    description: projectDescription,
    clientId: selectedClientId,
    clientName: clientName || 'Client Name',
    clientCompany: clientCompany || 'Client Company',
    clientEmail,
    clientPhone,
    pricingType,
    items,
    subtotal,
    discountType,
    discountValue,
    discountAmount,
    taxRate,
    taxAmount,
    total,
    currency: settings.currency,
    currencyCode: settings.currencyCode,
    startDate,
    estimatedCompletionDate,
    timelineDays,
    paymentTermType,
    paymentMilestones: computedMilestones,
    scope: {
      included: includedItems,
      notIncluded: notIncludedItems,
      revisionPolicy,
      revisionsCount,
      clientResponsibilities,
    },
    deliverables: items.map((i) => i.name),
    nextSteps: 'Please review terms and sign below to officially accept this agreement.',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  };

  const stepsList = [
    { num: 1, title: 'Client' },
    { num: 2, title: 'Project' },
    { num: 3, title: 'Services' },
    { num: 4, title: 'Pricing' },
    { num: 5, title: 'Payment Terms' },
    { num: 6, title: 'Scope' },
    { num: 7, title: 'Review' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header & Step Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
              QUOTE BUILDER · STEP {currentStep} OF 7
            </span>
            <h1 className="text-2xl font-bold font-display text-neutral-900 tracking-tight mt-0.5">
              {stepsList[currentStep - 1].title} Details
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => navigateTo('quotes')}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 px-3 py-2 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {stepsList.map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => {
                  if (isDone || step.num < currentStep) {
                    setCurrentStep(step.num);
                  }
                }}
                className={`flex flex-col text-left border-t-2 pt-2 transition-colors cursor-pointer ${
                  isCurrent
                    ? 'border-blue-600 text-blue-600'
                    : isDone
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-neutral-200 text-neutral-400'
                }`}
              >
                <span className="text-[10px] font-mono font-bold leading-none">
                  0{step.num}
                </span>
                <span className="text-xs font-semibold truncate mt-0.5 hidden sm:inline">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CLIENT */}
      {currentStep === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-display">
                Client Information
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Select an existing client or enter new contact information.
              </p>
            </div>

            {/* Select existing client dropdown */}
            {clients.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Quick load:</span>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleSelectClient(e.target.value)}
                  aria-label="Select existing client"
                  className="text-xs font-medium bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Choose Existing Client --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.company})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Client Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (errors.clientName) setErrors((prev) => ({ ...prev, clientName: '' }));
                }}
                placeholder="e.g. Marcus Sterling"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.clientName ? 'border-rose-500 ring-rose-200' : 'border-neutral-300'
                }`}
              />
              {errors.clientName && (
                <p className="text-xs text-rose-500 mt-1">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Company / Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => {
                  setClientCompany(e.target.value);
                  if (errors.clientCompany) setErrors((prev) => ({ ...prev, clientCompany: '' }));
                }}
                placeholder="e.g. Acme Coffee Roasters"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.clientCompany ? 'border-rose-500 ring-rose-200' : 'border-neutral-300'
                }`}
              />
              {errors.clientCompany && (
                <p className="text-xs text-rose-500 mt-1">{errors.clientCompany}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => {
                  setClientEmail(e.target.value);
                  if (errors.clientEmail) setErrors((prev) => ({ ...prev, clientEmail: '' }));
                }}
                placeholder="marcus@acmecoffee.com"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.clientEmail ? 'border-rose-500 ring-rose-200' : 'border-neutral-300'
                }`}
              />
              {errors.clientEmail && (
                <p className="text-xs text-rose-500 mt-1">{errors.clientEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+1 (503) 244-1920"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PROJECT */}
      {currentStep === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 font-display">
              Project Specification
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Define the engagement title, background, and delivery timeframe.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  if (errors.projectName) setErrors((prev) => ({ ...prev, projectName: '' }));
                }}
                placeholder="e.g. Website Design & Headless E-Commerce"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.projectName ? 'border-rose-500 ring-rose-200' : 'border-neutral-300'
                }`}
              />
              {errors.projectName && (
                <p className="text-xs text-rose-500 mt-1">{errors.projectName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Project Description & Strategic Objectives
              </label>
              <textarea
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Summarize the client's core problem, business requirements, and what this engagement will accomplish."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Target Kickoff Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Estimated Completion Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={estimatedCompletionDate}
                  onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
                {errors.estimatedCompletionDate && (
                  <p className="text-xs text-rose-500 mt-1">{errors.estimatedCompletionDate}</p>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
              <span className="text-neutral-600">Calculated Project Duration:</span>
              <span className="font-mono font-bold text-neutral-900">{timelineDays} Days</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SERVICES */}
      {currentStep === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-display">
                Services & Deliverables
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Break down what the client is paying for with clear quantities and rates.
              </p>
            </div>

            {/* Pricing type toggle */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => setPricingType('fixed')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  pricingType === 'fixed'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Fixed Deliverables
              </button>
              <button
                type="button"
                onClick={() => setPricingType('hourly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  pricingType === 'hourly'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Hourly / Time Log
              </button>
            </div>
          </div>

          {/* Quick preset insert tags */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-neutral-400 block mb-2 font-mono uppercase">
              Quick Add Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAddPreset('Website Design & UI', 'Custom homepage and internal responsive pages in Figma', 450)}
                className="px-2.5 py-1 text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 transition-colors"
              >
                + Website Design ($450)
              </button>
              <button
                type="button"
                onClick={() => handleAddPreset('Responsive Frontend Implementation', 'Pixel-perfect React / Tailwind codebase', 650)}
                className="px-2.5 py-1 text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 transition-colors"
              >
                + Development ($650)
              </button>
              <button
                type="button"
                onClick={() => handleAddPreset('SEO & Performance Audit', 'Metadata, OpenGraph, sitemap, and 95+ Core Web Vitals', 150)}
                className="px-2.5 py-1 text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 transition-colors"
              >
                + SEO Setup ($150)
              </button>
              <button
                type="button"
                onClick={() => handleAddPreset('Brand Identity & Logo Suite', 'Typography, vector logo marks, and visual guide', 500)}
                className="px-2.5 py-1 text-xs font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 transition-colors"
              >
                + Brand Identity ($500)
              </button>
            </div>
          </div>

          {/* Line items list */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                      placeholder="Service / Deliverable name"
                      className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Specific breakdown of what this service covers..."
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-neutral-200/60 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-500">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, { quantity: Number(e.target.value) })}
                        className="w-16 px-2 py-1 bg-white border border-neutral-300 rounded font-mono text-center tabular-nums"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-500">Unit:</span>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleUpdateItem(item.id, { unit: e.target.value })}
                        placeholder="hrs/proj"
                        className="w-20 px-2 py-1 bg-white border border-neutral-300 rounded text-center"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-500">Rate ({settings.currency}):</span>
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(e) => handleUpdateItem(item.id, { rate: Number(e.target.value) })}
                        className="w-24 px-2 py-1 bg-white border border-neutral-300 rounded font-mono text-right tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-neutral-500 text-[11px] block">Line Total:</span>
                    <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                      {settings.currency}{item.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="w-full py-3 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-950 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service Line Item</span>
          </button>
        </div>
      )}

      {/* STEP 4: PRICING */}
      {currentStep === 4 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 font-display">
              Pricing & Investment Summary
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review your subtotal, apply optional client discounts, and add applicable tax.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left adjustment inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Discount
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    aria-label="Discount Type"
                    className="text-xs bg-white border border-neutral-300 rounded-lg px-2.5 py-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ({settings.currency})</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg font-mono tabular-nums text-right"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Tax Rate (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg font-mono tabular-nums text-right"
                    placeholder="0"
                  />
                  <span className="text-xs font-semibold text-neutral-500">%</span>
                </div>
              </div>
            </div>

            {/* Right breakdown card */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-3 flex flex-col justify-between">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500 block">
                Calculated Breakdown
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums font-semibold text-neutral-900">
                    {settings.currency}{subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountType === 'percentage' ? `${discountValue}%` : 'Fixed'}):</span>
                    <span className="font-mono tabular-nums">
                      -{settings.currency}{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                {taxAmount > 0 && (
                  <div className="flex justify-between text-neutral-600">
                    <span>Tax ({taxRate}%):</span>
                    <span className="font-mono tabular-nums">
                      +{settings.currency}{taxAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900">Total Investment:</span>
                  <span className="text-2xl font-extrabold font-mono text-neutral-950 tabular-nums">
                    {settings.currency}{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 pt-2">
                This amount will be split into scheduled milestones in the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: PAYMENT TERMS */}
      {currentStep === 5 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 font-display">
              Payment Terms & Milestones
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Select standard freelance billing terms or configure custom deliverable milestones.
            </p>
          </div>

          {/* Preset term selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: '50_50',
                title: '50% / 50%',
                sub: 'Deposit + Final Launch',
              },
              {
                id: '30_70',
                title: '30% / 70%',
                sub: 'Discovery + Delivery',
              },
              {
                id: '33_33_34',
                title: 'Three Milestones',
                sub: '33% / 33% / 34%',
              },
              {
                id: '100_upfront',
                title: '100% Retainer',
                sub: 'Paid upfront',
              },
            ].map((term) => (
              <button
                key={term.id}
                type="button"
                onClick={() => setPaymentTermType(term.id as any)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  paymentTermType === term.id
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-800'
                }`}
              >
                <span className="text-xs font-bold block font-mono">
                  {term.title}
                </span>
                <span className={`text-[11px] block mt-0.5 ${paymentTermType === term.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {term.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Active Milestones preview */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-neutral-700 block">
              Scheduled Payments ({computedMilestones.length} Milestones):
            </span>
            <div className="space-y-2">
              {computedMilestones.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-neutral-900 block">
                      {m.title}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      {m.dueWhen}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                    {settings.currency}{m.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: SCOPE BOUNDARIES */}
      {currentStep === 6 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 font-display">
              Scope Boundaries & Revision Policy
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Protect your business by defining clear boundaries. Prevent scope creep before it starts.
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider font-mono">
              What&apos;s Included In This Agreement
            </label>
            <div className="space-y-2">
              {includedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIncluded(idx)}
                    className="text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newIncludedInput}
                onChange={(e) => setNewIncludedInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIncluded()}
                placeholder="Add included deliverable..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddIncluded}
                className="px-3.5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* What's Not Included */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider font-mono">
              What&apos;s Not Included (Out of Scope)
            </label>
            <div className="space-y-2">
              {notIncludedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs"
                >
                  <div className="flex items-center gap-2 text-neutral-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveNotIncluded(idx)}
                    className="text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newNotIncludedInput}
                onChange={(e) => setNewNotIncludedInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNotIncluded()}
                placeholder="Add exclusion (e.g. hosting fees, ongoing maintenance)..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddNotIncluded}
                className="px-3.5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Revision Policy */}
          <div className="pt-2 space-y-3">
            <label className="block text-xs font-semibold text-neutral-700">
              Revision Terms
            </label>
            <input
              type="text"
              value={revisionPolicy}
              onChange={(e) => setRevisionPolicy(e.target.value)}
              placeholder="e.g. 2 rounds of consolidated revisions included."
              className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg"
            />
          </div>

          {/* Client Responsibilities */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-neutral-700">
              Client Responsibilities (Asset Deadlines, Approvals)
            </label>
            <div className="space-y-2">
              {clientResponsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs"
                >
                  <span className="text-neutral-700">{resp}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveResp(idx)}
                    className="text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newRespInput}
                onChange={(e) => setNewRespInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddResp()}
                placeholder="e.g. Provide copy within 5 business days..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddResp}
                className="px-3.5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: REVIEW */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-display">
                Final Review
              </h2>
              <p className="text-xs text-neutral-500">
                This is how your client will view this proposal.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSendProposal}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Finalize & Mark as Sent</span>
              </button>
            </div>
          </div>

          {/* Render the actual live document preview */}
          <QuoteDocumentPreview
            quote={currentPreviewQuote}
            isClientView={false}
            onEdit={() => setCurrentStep(1)}
          />
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
            currentStep === 1
              ? 'opacity-0 pointer-events-none'
              : 'text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 hover:bg-neutral-50 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Continue to {stepsList[currentStep].title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendProposal}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Complete & Mark as Sent</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
