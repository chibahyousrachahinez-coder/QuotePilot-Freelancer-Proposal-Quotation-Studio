import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Client, Quote } from '../../types';
import {
  Plus,
  Search,
  Users,
  Building,
  Mail,
  Phone,
  Globe,
  DollarSign,
  FileText,
  Clock,
  Trash2,
  Edit,
  ArrowRight,
  ExternalLink,
  X,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const ClientsView: React.FC = () => {
  const {
    clients,
    quotes,
    settings,
    addClient,
    updateClient,
    deleteClient,
    navigateTo,
    setActiveQuoteDraft,
    setSelectedQuoteId,
    openPreview,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [detailClient, setDetailClient] = useState<Client | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filter clients by search
  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  // Calculate client metrics
  const getClientMetrics = (clientId: string) => {
    const clientQuotes = quotes.filter((q) => q.clientId === clientId);
    const totalQuoted = clientQuotes.reduce((sum, q) => sum + (q.total || 0), 0);
    const acceptedQuotes = clientQuotes.filter((q) => q.status === 'accepted');
    const acceptedValue = acceptedQuotes.reduce((sum, q) => sum + (q.total || 0), 0);
    return {
      quoteCount: clientQuotes.length,
      totalQuoted,
      acceptedValue,
      clientQuotes,
    };
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormName('');
    setFormCompany('');
    setFormEmail('');
    setFormPhone('');
    setFormWebsite('');
    setFormNotes('');
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormCompany(client.company);
    setFormEmail(client.email);
    setFormPhone(client.phone);
    setFormWebsite(client.website || '');
    setFormNotes(client.notes || '');
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formName.trim()) errs.name = 'Name is required';
    if (!formCompany.trim()) errs.company = 'Company is required';
    if (formEmail && !formEmail.includes('@')) errs.email = 'Valid email is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, {
        name: formName.trim(),
        company: formCompany.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        website: formWebsite.trim(),
        notes: formNotes.trim(),
      });
      showToast('Client updated', `${formName} was updated.`, 'success');
    } else {
      addClient({
        name: formName.trim(),
        company: formCompany.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        website: formWebsite.trim(),
        notes: formNotes.trim(),
      });
    }

    setIsAddModalOpen(false);
  };

  const handleStartQuoteForClient = (client: Client) => {
    setActiveQuoteDraft({
      clientId: client.id,
      clientName: client.name,
      clientCompany: client.company,
      clientEmail: client.email,
      clientPhone: client.phone,
    });
    setSelectedQuoteId(null);
    navigateTo('new-quote');
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 tracking-tight">
            Client Directory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage contacts, lifetime proposal value, and quote history.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search clients by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <span className="text-xs text-neutral-500 font-mono tabular-nums">
          {filteredClients.length} clients
        </span>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => {
          const { quoteCount, totalQuoted, acceptedValue } = getClientMetrics(client.id);

          return (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Client header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 font-display font-bold text-sm flex items-center justify-center">
                      {client.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-medium">
                        {client.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(client)}
                      className="p-1 text-neutral-400 hover:text-neutral-800 rounded transition-colors"
                      title="Edit Client"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="p-1 text-neutral-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete Client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contact info list */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                  {client.email && (
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Total Quoted</span>
                    <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                      {settings.currency}{totalQuoted.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Accepted Value</span>
                    <span className="font-mono font-bold text-emerald-600 text-sm tabular-nums">
                      {settings.currency}{acceptedValue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {client.notes && (
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {client.notes}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setDetailClient(client)}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{quoteCount} {quoteCount === 1 ? 'Proposal' : 'Proposals'}</span>
                </button>

                <button
                  onClick={() => handleStartQuoteForClient(client)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Quote</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CLIENT DETAIL DRAWER / MODAL */}
      {detailClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Client Profile & Ledger
                </span>
                <h2 className="text-xl font-bold font-display text-neutral-900">
                  {detailClient.name}
                </h2>
                <p className="text-xs text-neutral-500">{detailClient.company}</p>
              </div>
              <button
                onClick={() => setDetailClient(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics */}
            {(() => {
              const { quoteCount, totalQuoted, acceptedValue, clientQuotes } = getClientMetrics(detailClient.id);
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                    <div>
                      <span className="text-neutral-500 block">Proposals</span>
                      <span className="text-lg font-bold font-mono text-neutral-900 tabular-nums">
                        {quoteCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Total Quoted</span>
                      <span className="text-lg font-bold font-mono text-neutral-900 tabular-nums">
                        {settings.currency}{totalQuoted.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Accepted Revenue</span>
                      <span className="text-lg font-bold font-mono text-emerald-600 tabular-nums">
                        {settings.currency}{acceptedValue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-neutral-800 block">Contact Information</span>
                    <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1.5 text-neutral-600">
                      <p><strong>Email:</strong> {detailClient.email || 'None'}</p>
                      <p><strong>Phone:</strong> {detailClient.phone || 'None'}</p>
                      {detailClient.website && (
                        <p><strong>Website:</strong> {detailClient.website}</p>
                      )}
                      {detailClient.notes && (
                        <p className="pt-2 text-neutral-500 italic">
                          &ldquo;{detailClient.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Proposal History */}
                  <div className="space-y-3">
                    <span className="font-semibold text-neutral-800 block text-xs">
                      Proposal History ({clientQuotes.length})
                    </span>
                    <div className="space-y-2">
                      {clientQuotes.map((q) => (
                        <div
                          key={q.id}
                          onClick={() => {
                            setDetailClient(null);
                            openPreview(q);
                          }}
                          className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 flex items-center justify-between text-xs cursor-pointer transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-neutral-900 block">
                              {q.title}
                            </span>
                            <span className="text-neutral-500 font-mono text-[11px]">
                              {q.quoteNumber} · {q.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold text-neutral-900 tabular-nums">
                              {settings.currency}{q.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  const client = detailClient;
                  setDetailClient(null);
                  handleStartQuoteForClient(client);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                + Create New Quote for {detailClient.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT CLIENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
          <form
            onSubmit={handleSaveClient}
            className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h2 className="text-lg font-bold font-display text-neutral-900">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. David Chen"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {formErrors.name && (
                  <p className="text-rose-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="e.g. Kinetix Robotics"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {formErrors.company && (
                  <p className="text-rose-500 mt-1">{formErrors.company}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="david@kinetix.io"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.email && (
                    <p className="text-rose-500 mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+1 (408) 555-9284"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formWebsite}
                  onChange={(e) => setFormWebsite(e.target.value)}
                  placeholder="https://kinetix.io"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Notes & Context
                </label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Notes on client preferences, billing terms, or previous conversations..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                {editingClient ? 'Save Changes' : 'Create Client'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
