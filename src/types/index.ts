export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';

export type PricingType = 'fixed' | 'hourly';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  lastActivity: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

export interface PaymentMilestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  dueWhen: string;
}

export interface ScopeBoundary {
  included: string[];
  notIncluded: string[];
  revisionPolicy: string;
  revisionsCount: number;
  clientResponsibilities: string[];
}

export interface Quote {
  id: string;
  quoteNumber: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  pricingType: PricingType;
  items: QuoteItem[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  currencyCode: string;
  startDate: string;
  estimatedCompletionDate: string;
  timelineDays: number;
  paymentTermType: '50_50' | '30_70' | '33_33_34' | '100_upfront' | 'custom';
  paymentMilestones: PaymentMilestone[];
  scope: ScopeBoundary;
  deliverables: string[];
  nextSteps: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  acceptedAt?: string;
  validUntil: string;
  templateId?: string;
  clientNotes?: string;
}

export interface Template {
  id: string;
  name: string;
  title?: string;
  category: 'Web Development' | 'UI/UX Design' | 'Marketing' | 'Copywriting' | 'Video Production' | 'Consulting' | string;
  description: string;
  estimatedTimeline: string;
  timelineDays: number;
  items: Omit<QuoteItem, 'id'>[];
  scope: ScopeBoundary;
  deliverables: string[];
  paymentTermType: '50_50' | '30_70' | '33_33_34' | '100_upfront' | 'custom';
  paymentMilestones: Omit<PaymentMilestone, 'id'>[];
}

export interface PricingPackage {
  id: string;
  tier: string;
  name: string;
  tagline: string;
  description?: string;
  price: number;
  turnaround: string;
  timelineDays?: number;
  features: string[];
  revisions: string;
  popular?: boolean;
}

export interface UserSettings {
  freelancerName: string;
  businessName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  currency: string;
  currencyCode: string;
  defaultTaxRate: number;
  defaultPaymentTerm: '50_50' | '30_70' | '33_33_34' | '100_upfront' | 'custom';
  defaultRevisionPolicy: string;
  defaultNextSteps?: string;
  brandAccent: string;
  logoText: string;
}

export type ActiveView = 
  | 'landing' 
  | 'dashboard' 
  | 'quotes' 
  | 'new-quote' 
  | 'edit-quote' 
  | 'clients' 
  | 'templates' 
  | 'packages' 
  | 'settings'
  | 'proposal-preview';
