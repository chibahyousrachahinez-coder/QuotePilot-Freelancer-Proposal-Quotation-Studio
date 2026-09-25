import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Client,
  Quote,
  Template,
  PricingPackage,
  UserSettings,
  ActiveView,
  QuoteStatus,
} from '../types';
import {
  initialClients,
  initialQuotes,
  initialTemplates,
  initialPackages,
  initialSettings,
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  navigateTo: (view: ActiveView, quoteId?: string) => void;
  
  quotes: Quote[];
  clients: Client[];
  templates: Template[];
  packages: PricingPackage[];
  settings: UserSettings;
  
  selectedQuoteId: string | null;
  setSelectedQuoteId: (id: string | null) => void;
  activeQuoteDraft: Partial<Quote> | null;
  setActiveQuoteDraft: (draft: Partial<Quote> | null) => void;
  
  clientDetailId: string | null;
  setClientDetailId: (id: string | null) => void;
  
  previewQuoteModal: Quote | null;
  isClientShareView: boolean;
  openPreview: (quote: Quote, asClient?: boolean) => void;
  closePreview: () => void;
  
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Quote operations
  addQuote: (quoteData: Partial<Quote>) => Quote;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  duplicateQuote: (id: string) => Quote;
  updateQuoteStatus: (id: string, status: QuoteStatus) => void;
  acceptQuoteAsClient: (id: string, signerName?: string) => void;
  
  // Client operations
  addClient: (clientData: Omit<Client, 'id' | 'createdAt' | 'lastActivity'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Template operations
  addTemplate: (templateData: Omit<Template, 'id'>) => Template;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => Template;
  startQuoteFromTemplate: (templateId: string, clientId?: string) => void;
  
  // Package operations
  startQuoteFromPackage: (pkgId: string) => void;
  updatePackage: (id: string, updates: Partial<PricingPackage>) => void;
  addPackage: (pkg: Omit<PricingPackage, 'id'>) => void;
  deletePackage: (id: string) => void;
  
  // Settings & Storage operations
  updateSettings: (updates: Partial<UserSettings>) => void;
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
  resetToDemoData: () => void;
  
  // Computed Metrics
  stats: {
    totalQuoteValue: number;
    quotesSent: number;
    quotesAccepted: number;
    acceptanceRate: number;
    quotesPending: number;
    draftQuotes: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  QUOTES: 'quotepilot_quotes_v1',
  CLIENTS: 'quotepilot_clients_v1',
  TEMPLATES: 'quotepilot_templates_v1',
  PACKAGES: 'quotepilot_packages_v1',
  SETTINGS: 'quotepilot_settings_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [activeQuoteDraft, setActiveQuoteDraft] = useState<Partial<Quote> | null>(null);
  const [clientDetailId, setClientDetailId] = useState<string | null>(null);
  const [previewQuoteModal, setPreviewQuoteModal] = useState<Quote | null>(null);
  const [isClientShareView, setIsClientShareView] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse quotes from storage', e);
      }
    }
    return initialQuotes;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse clients from storage', e);
      }
    }
    return initialClients;
  });

  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse templates from storage', e);
      }
    }
    return initialTemplates;
  });

  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse packages from storage', e);
      }
    }
    return initialPackages;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings from storage', e);
      }
    }
    return initialSettings;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Toast notifications
  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (view: ActiveView, quoteId?: string) => {
    if (quoteId) {
      setSelectedQuoteId(quoteId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPreview = (quote: Quote, asClient: boolean = false) => {
    setPreviewQuoteModal(quote);
    setIsClientShareView(asClient);
  };

  const closePreview = () => {
    setPreviewQuoteModal(null);
    setIsClientShareView(false);
  };

  // Quote operations
  const addQuote = (quoteData: Partial<Quote>): Quote => {
    const nextIndex = quotes.length + 1;
    const padIndex = String(nextIndex).padStart(3, '0');
    const quoteNumber = quoteData.quoteNumber || `QP-2026-${padIndex}`;
    const id = 'quote-' + Date.now();
    const now = new Date().toISOString();

    const newQuote: Quote = {
      id,
      quoteNumber,
      title: quoteData.title || 'Untitled Proposal',
      description: quoteData.description || '',
      clientId: quoteData.clientId || '',
      clientName: quoteData.clientName || 'Client Name',
      clientCompany: quoteData.clientCompany || 'Company',
      clientEmail: quoteData.clientEmail || '',
      clientPhone: quoteData.clientPhone || '',
      pricingType: quoteData.pricingType || 'fixed',
      items: quoteData.items || [],
      subtotal: quoteData.subtotal || 0,
      discountType: quoteData.discountType || 'percentage',
      discountValue: quoteData.discountValue || 0,
      discountAmount: quoteData.discountAmount || 0,
      taxRate: quoteData.taxRate || settings.defaultTaxRate || 0,
      taxAmount: quoteData.taxAmount || 0,
      total: quoteData.total || 0,
      currency: quoteData.currency || settings.currency,
      currencyCode: quoteData.currencyCode || settings.currencyCode,
      startDate: quoteData.startDate || new Date().toISOString().split('T')[0],
      estimatedCompletionDate: quoteData.estimatedCompletionDate || '',
      timelineDays: quoteData.timelineDays || 14,
      paymentTermType: quoteData.paymentTermType || '50_50',
      paymentMilestones: quoteData.paymentMilestones || [],
      scope: quoteData.scope || {
        included: [],
        notIncluded: [],
        revisionPolicy: settings.defaultRevisionPolicy,
        revisionsCount: 2,
        clientResponsibilities: [],
      },
      deliverables: quoteData.deliverables || [],
      nextSteps: quoteData.nextSteps || 'Please review and accept this proposal to reserve kickoff dates.',
      status: quoteData.status || 'draft',
      createdAt: now,
      updatedAt: now,
      validUntil: quoteData.validUntil || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      templateId: quoteData.templateId,
      clientNotes: quoteData.clientNotes,
    };

    setQuotes((prev) => [newQuote, ...prev]);

    // Update client's last activity if attached
    if (newQuote.clientId) {
      updateClient(newQuote.clientId, { lastActivity: now });
    }

    showToast('Quote created', `Proposal ${newQuote.quoteNumber} has been saved.`, 'success');
    return newQuote;
  };

  const updateQuote = (id: string, updates: Partial<Quote>) => {
    const now = new Date().toISOString();
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const updated = { ...q, ...updates, updatedAt: now };
          return updated;
        }
        return q;
      })
    );
    // Also update preview modal if open
    if (previewQuoteModal && previewQuoteModal.id === id) {
      setPreviewQuoteModal((prev) => (prev ? { ...prev, ...updates, updatedAt: now } : null));
    }
  };

  const deleteQuote = (id: string) => {
    const target = quotes.find((q) => q.id === id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    if (selectedQuoteId === id) {
      setSelectedQuoteId(null);
    }
    if (previewQuoteModal?.id === id) {
      closePreview();
    }
    showToast('Quote removed', target ? `${target.quoteNumber} was deleted.` : 'Proposal was removed.', 'info');
  };

  const duplicateQuote = (id: string): Quote => {
    const source = quotes.find((q) => q.id === id);
    if (!source) {
      throw new Error('Quote not found');
    }
    const nextIndex = quotes.length + 1;
    const padIndex = String(nextIndex).padStart(3, '0');
    const newQuoteNumber = `QP-2026-${padIndex}`;
    const now = new Date().toISOString();

    const duplicated: Quote = {
      ...source,
      id: 'quote-' + Date.now(),
      quoteNumber: newQuoteNumber,
      title: `${source.title} (Copy)`,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      sentAt: undefined,
      acceptedAt: undefined,
      items: source.items.map((item) => ({ ...item, id: 'item-' + Math.random().toString(36).substring(2, 8) })),
      paymentMilestones: source.paymentMilestones.map((m) => ({ ...m, id: 'm-' + Math.random().toString(36).substring(2, 8) })),
    };

    setQuotes((prev) => [duplicated, ...prev]);
    showToast('Proposal duplicated', `Created ${duplicated.quoteNumber} from ${source.quoteNumber}`, 'success');
    return duplicated;
  };

  const updateQuoteStatus = (id: string, status: QuoteStatus) => {
    const now = new Date().toISOString();
    const updates: Partial<Quote> = { status, updatedAt: now };
    if (status === 'sent') {
      updates.sentAt = now;
    } else if (status === 'accepted') {
      updates.acceptedAt = now;
    }
    updateQuote(id, updates);
    showToast('Status updated', `Proposal status set to ${status.toUpperCase()}.`, 'info');
  };

  const acceptQuoteAsClient = (id: string, signerName?: string) => {
    const now = new Date().toISOString();
    updateQuote(id, {
      status: 'accepted',
      acceptedAt: now,
      clientNotes: signerName ? `Digitally confirmed by ${signerName} on ${new Date().toLocaleDateString()}` : undefined,
    });
    showToast('Proposal accepted!', 'The proposal is officially accepted and locked for project kickoff.', 'success');
  };

  // Client operations
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'lastActivity'>): Client => {
    const id = 'client-' + Date.now();
    const now = new Date().toISOString();
    const newClient: Client = {
      ...clientData,
      id,
      createdAt: now,
      lastActivity: now,
    };
    setClients((prev) => [newClient, ...prev]);
    showToast('Client added', `${newClient.name} (${newClient.company}) has been added.`, 'success');
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteClient = (id: string) => {
    const client = clients.find((c) => c.id === id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (clientDetailId === id) {
      setClientDetailId(null);
    }
    showToast('Client deleted', client ? `${client.name} was removed.` : 'Client removed.', 'info');
  };

  // Template operations
  const addTemplate = (templateData: Omit<Template, 'id'>): Template => {
    const id = 'tmpl-' + Date.now();
    const newTemplate: Template = { ...templateData, id };
    setTemplates((prev) => [...prev, newTemplate]);
    showToast('Template created', `${newTemplate.name} saved to your library.`, 'success');
    return newTemplate;
  };

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast('Template updated', 'Changes have been saved.', 'success');
  };

  const deleteTemplate = (id: string) => {
    const tmpl = templates.find((t) => t.id === id);
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    showToast('Template deleted', tmpl ? `${tmpl.name} was removed.` : 'Template removed.', 'info');
  };

  const duplicateTemplate = (id: string): Template => {
    const source = templates.find((t) => t.id === id);
    if (!source) throw new Error('Template not found');
    const newTmpl: Template = {
      ...source,
      id: 'tmpl-' + Date.now(),
      name: `${source.name} (Copy)`,
    };
    setTemplates((prev) => [...prev, newTmpl]);
    showToast('Template duplicated', `Created copy of ${source.name}`, 'success');
    return newTmpl;
  };

  const startQuoteFromTemplate = (templateId: string, clientId?: string) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (!tmpl) return;

    let targetClient: Client | undefined;
    if (clientId) {
      targetClient = clients.find((c) => c.id === clientId);
    } else if (clients.length > 0) {
      targetClient = clients[0];
    }

    const items = tmpl.items.map((item) => ({
      ...item,
      id: 'item-' + Math.random().toString(36).substring(2, 8),
    }));

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);

    const draft: Partial<Quote> = {
      title: tmpl.name,
      description: tmpl.description,
      clientId: targetClient?.id || '',
      clientName: targetClient?.name || '',
      clientCompany: targetClient?.company || '',
      clientEmail: targetClient?.email || '',
      clientPhone: targetClient?.phone || '',
      items,
      subtotal,
      discountType: 'percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: settings.defaultTaxRate || 0,
      taxAmount: 0,
      total: subtotal,
      timelineDays: tmpl.timelineDays || 14,
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletionDate: new Date(Date.now() + (tmpl.timelineDays || 14) * 86400000).toISOString().split('T')[0],
      paymentTermType: tmpl.paymentTermType,
      paymentMilestones: tmpl.paymentMilestones.map((m) => ({
        ...m,
        id: 'm-' + Math.random().toString(36).substring(2, 8),
        amount: Math.round((subtotal * m.percentage) / 100),
      })),
      scope: { ...tmpl.scope },
      deliverables: [...tmpl.deliverables],
      templateId: tmpl.id,
      status: 'draft',
    };

    setActiveQuoteDraft(draft);
    setSelectedQuoteId(null);
    setActiveView('new-quote');
    showToast('Template loaded', `Pre-filled proposal with ${tmpl.name}`, 'info');
  };

  const startQuoteFromPackage = (pkgId: string) => {
    const pkg = packages.find((p) => p.id === pkgId);
    if (!pkg) return;

    const targetClient = clients[0];
    const items = [
      {
        id: 'item-' + Math.random().toString(36).substring(2, 8),
        name: `${pkg.tier} Package: ${pkg.name}`,
        description: pkg.tagline + ' Includes: ' + pkg.features.slice(0, 3).join(', '),
        quantity: 1,
        unit: 'package',
        rate: pkg.price,
        total: pkg.price,
      },
    ];

    const draft: Partial<Quote> = {
      title: `${pkg.name} Proposal`,
      description: pkg.tagline,
      clientId: targetClient?.id || '',
      clientName: targetClient?.name || '',
      clientCompany: targetClient?.company || '',
      clientEmail: targetClient?.email || '',
      clientPhone: targetClient?.phone || '',
      items,
      subtotal: pkg.price,
      discountType: 'percentage',
      discountValue: 0,
      discountAmount: 0,
      taxRate: 0,
      taxAmount: 0,
      total: pkg.price,
      timelineDays: pkg.tier === 'Basic' ? 7 : pkg.tier === 'Standard' ? 14 : 21,
      paymentTermType: '50_50',
      paymentMilestones: [
        {
          id: 'm-1',
          title: 'Initial Deposit (50%)',
          percentage: 50,
          amount: Math.round(pkg.price * 0.5),
          dueWhen: 'Upon proposal signing',
        },
        {
          id: 'm-2',
          title: 'Final Handover (50%)',
          percentage: 50,
          amount: Math.round(pkg.price * 0.5),
          dueWhen: 'Upon completion',
        },
      ],
      scope: {
        included: [...pkg.features],
        notIncluded: ['Third party subscription fees or stock assets'],
        revisionPolicy: `Includes ${pkg.revisions}. Extra revisions charged separately.`,
        revisionsCount: pkg.tier === 'Basic' ? 1 : pkg.tier === 'Standard' ? 3 : 99,
        clientResponsibilities: ['Provide assets within 3 business days of kickoff'],
      },
      deliverables: pkg.features.slice(0, 4),
      status: 'draft',
    };

    setActiveQuoteDraft(draft);
    setSelectedQuoteId(null);
    setActiveView('new-quote');
    showToast('Package loaded', `Pre-filled proposal with ${pkg.name} ($${pkg.price})`, 'info');
  };

  // Package operations
  const updatePackage = (id: string, updates: Partial<PricingPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Package updated', 'Pricing package changes saved.', 'success');
  };

  const addPackage = (pkg: Omit<PricingPackage, 'id'>) => {
    const id = 'pkg-' + Date.now();
    setPackages((prev) => [...prev, { ...pkg, id }]);
    showToast('Package added', `${pkg.name} added to your packages.`, 'success');
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    showToast('Package removed', 'Package deleted.', 'info');
  };

  // Settings
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showToast('Settings saved', 'Your business profile and defaults were updated.', 'success');
  };

  // Export / Import
  const exportDataJson = () => {
    const data = {
      app: 'QuotePilot',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      quotes,
      clients,
      templates,
      packages,
      settings,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotepilot_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup downloaded', 'JSON export file created successfully.', 'success');
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.quotes && Array.isArray(parsed.quotes)) {
        setQuotes(parsed.quotes);
      }
      if (parsed.clients && Array.isArray(parsed.clients)) {
        setClients(parsed.clients);
      }
      if (parsed.templates && Array.isArray(parsed.templates)) {
        setTemplates(parsed.templates);
      }
      if (parsed.packages && Array.isArray(parsed.packages)) {
        setPackages(parsed.packages);
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        setSettings(parsed.settings);
      }
      showToast('Data imported', 'Your quotes and settings were restored successfully.', 'success');
      return true;
    } catch (e) {
      console.error('Invalid import data', e);
      showToast('Import failed', 'Invalid JSON backup format.', 'error');
      return false;
    }
  };

  const resetToDemoData = () => {
    setQuotes(initialQuotes);
    setClients(initialClients);
    setTemplates(initialTemplates);
    setPackages(initialPackages);
    setSettings(initialSettings);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.TEMPLATES);
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    showToast('Demo data restored', 'Application reset to initial realistic sample data.', 'info');
  };

  // Computed Metrics
  const totalQuoteValue = quotes.reduce((sum, q) => sum + (q.total || 0), 0);
  const quotesSent = quotes.filter((q) => q.status !== 'draft').length;
  const quotesAccepted = quotes.filter((q) => q.status === 'accepted').length;
  const quotesPending = quotes.filter((q) => q.status === 'sent' || q.status === 'viewed').length;
  const draftQuotes = quotes.filter((q) => q.status === 'draft').length;
  const acceptanceRate = quotesSent > 0 ? Math.round((quotesAccepted / quotesSent) * 100) : 0;

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        quotes,
        clients,
        templates,
        packages,
        settings,
        selectedQuoteId,
        setSelectedQuoteId,
        activeQuoteDraft,
        setActiveQuoteDraft,
        clientDetailId,
        setClientDetailId,
        previewQuoteModal,
        isClientShareView,
        openPreview,
        closePreview,
        toasts,
        showToast,
        removeToast,
        addQuote,
        updateQuote,
        deleteQuote,
        duplicateQuote,
        updateQuoteStatus,
        acceptQuoteAsClient,
        addClient,
        updateClient,
        deleteClient,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        duplicateTemplate,
        startQuoteFromTemplate,
        startQuoteFromPackage,
        updatePackage,
        addPackage,
        deletePackage,
        updateSettings,
        exportDataJson,
        importDataJson,
        resetToDemoData,
        stats: {
          totalQuoteValue,
          quotesSent,
          quotesAccepted,
          acceptanceRate,
          quotesPending,
          draftQuotes,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
