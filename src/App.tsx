/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { AppSidebar } from './components/layout/AppSidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { QuotesListView } from './components/quotes/QuotesListView';
import { QuoteWizard } from './components/quotes/QuoteWizard';
import { QuoteDocumentPreview } from './components/quotes/QuoteDocumentPreview';
import { ClientsView } from './components/clients/ClientsView';
import { TemplatesView } from './components/templates/TemplatesView';
import { PackagesView } from './components/packages/PackagesView';
import { SettingsView } from './components/settings/SettingsView';
import { ToastContainer } from './components/common/Toast';

const AppContent: React.FC = () => {
  const {
    activeView,
    previewQuoteModal,
    isClientShareView,
    closePreview,
    navigateTo,
    selectedQuoteId,
  } = useApp();

  // If user is on landing page and not previewing a quote
  if (activeView === 'landing' && !previewQuoteModal) {
    return <LandingPage />;
  }

  // Standard in-app layout with sticky Sidebar and Main Content
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col lg:flex-row text-[#18181B] selection:bg-blue-100 selection:text-blue-900">
      <AppSidebar />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'quotes' && <QuotesListView />}
        {activeView === 'new-quote' && <QuoteWizard />}
        {activeView === 'edit-quote' && <QuoteWizard initialQuoteId={selectedQuoteId} />}
        {activeView === 'clients' && <ClientsView />}
        {activeView === 'templates' && <TemplatesView />}
        {activeView === 'packages' && <PackagesView />}
        {activeView === 'settings' && <SettingsView />}
      </main>

      {/* Modal Proposal Document Viewer */}
      {previewQuoteModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
          <div className="w-full max-w-5xl my-auto">
            <QuoteDocumentPreview
              quote={previewQuoteModal}
              isClientView={isClientShareView}
              onBack={() => closePreview()}
              onEdit={() => {
                const id = previewQuoteModal.id;
                closePreview();
                navigateTo('edit-quote', id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <ToastContainer />
    </AppProvider>
  );
}
