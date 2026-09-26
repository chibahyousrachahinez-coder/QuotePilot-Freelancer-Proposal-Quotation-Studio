# QuotePilot Complete User Guide

**The Comprehensive Operating Manual for Freelancers & Independent Studios**

---

## Table of Contents
1. [System Overview & Design Philosophy](#1-system-overview--design-philosophy)
2. [Dashboard & Pipeline Analytics](#2-dashboard--pipeline-analytics)
3. [The 7-Step Proposal Wizard](#3-the-7-step-proposal-wizard)
   - [Step 1: Client Selection & Contact Details](#step-1-client-selection--contact-details)
   - [Step 2: Project Scope & Dates](#step-2-project-scope--dates)
   - [Step 3: Services & Line Items](#step-3-services--line-items)
   - [Step 4: Pricing, Discounts & Taxes](#step-4-pricing-discounts--taxes)
   - [Step 5: Payment Terms & Milestones](#step-5-payment-terms--milestones)
   - [Step 6: Scope Boundaries & Revision Rules](#step-6-scope-boundaries--revision-rules)
   - [Step 7: Final Review & Generation](#step-7-final-review--generation)
4. [Proposal Document Viewer & Actions](#4-proposal-document-viewer--actions)
   - [Print & PDF Export Engine](#print--pdf-export-engine)
   - [Digital Client Sign-Off & Acceptance](#digital-client-sign-off--acceptance)
   - [Proposal Status Transitions](#proposal-status-transitions)
5. [Proposal Repository & Management](#5-proposal-repository--management)
6. [Client Management (CRM)](#6-client-management-crm)
7. [Industry Templates Library](#7-industry-templates-library)
8. [Service Packages Matrix](#8-service-packages-matrix)
9. [Studio Settings & Customization](#9-studio-settings--customization)
10. [Data Sovereignty, Backups & Migration](#10-data-sovereignty-backups--migration)

---

## 1. System Overview & Design Philosophy

QuotePilot was built from the ground up to replace clunky word-processor proposals and expensive SaaS subscriptions. It uses an **editorial SaaS design system**:
- **Warm Neutral Foundation (`#FAF9F6`):** Easy on the eyes, professional, and elegant.
- **Deep Charcoal Typography (`#18181B`):** High legibility and contrast without harsh pure blacks.
- **Cobalt Blue Accent (`#2563EB`):** Dynamic, confident, and professional.
- **Tabular Figures & Monospaced Identifiers:** All financial calculations, dates, and reference numbers align cleanly for precision.
- **Local-First Architecture:** All data stays in your browser via `localStorage`. No logins, no passwords, no latency, and zero remote tracking.

---

## 2. Dashboard & Pipeline Analytics

When you enter QuotePilot, the **Dashboard** gives you an immediate financial pulse of your freelance business:

### Key Metrics
- **Total Pipeline Value:** The combined monetary value of all quotes across your workspace.
- **Proposals Sent:** Total number of proposals that have progressed beyond draft stage.
- **Proposals Accepted:** Deals marked as officially accepted or signed by the client.
- **Closing Rate (%):** Automatically calculated as `(Accepted / Sent) * 100`.
- **Active Drafts:** Unsent proposals currently in progress.

### Quick Actions Bar
- **New Proposal:** Directly launches Step 1 of the Proposal Wizard.
- **Add Client:** Opens the modal to store a new client record.
- **Browse Templates:** Jumps straight to the 6 specialized industry starter templates.

### Recent Proposals Table
Displays your latest quotes with status chips (`DRAFT`, `SENT`, `ACCEPTED`), date created, client name, and total amount. Clicking any proposal opens the full document preview.

---

## 3. The 7-Step Proposal Wizard

The proposal creator breaks down complex contracts into 7 bite-sized, logical steps.

### Step 1: Client Selection & Contact Details
- **Existing Client Dropdown:** Select any previously saved client from your directory. Choosing a client automatically fills in their name, company, email, and phone number.
- **Quick-Add Fields:** If dealing with a new client, type directly into the name, company, email, and phone fields.
- **"Save to Client Directory" Toggle:** Check this box to automatically store new contact details in your CRM for future use.

### Step 2: Project Scope & Dates
- **Project Name:** The public-facing proposal title (e.g., *SaaS Application Redesign & Design System*).
- **Executive Summary / Overview:** A 1–3 paragraph narrative outlining the client's current challenge, your strategic solution, and project goals.
- **Pricing Model:** Choose between:
  - *Fixed Price (Recommended for value-based pricing)*
  - *Hourly / Time & Materials*
  - *Milestone / Phased Delivery*
- **Timeline & Dates:**
  - *Start Date:* Kickoff target.
  - *Estimated Completion Date:* Target completion.
  - *Duration (Days):* Automatically calculated working duration.

### Step 3: Services & Line Items
Itemize your deliverables with high clarity:
- **Item Title:** Clear name of the deliverable (e.g., *High-Fidelity Component Library*).
- **Scope Description:** Detailed explanation of what is delivered within this item.
- **Quantity & Unit:** E.g., `1 project`, `40 hours`, `5 pages`, `3 revisions`.
- **Unit Rate:** Numeric price per unit.
- **Total:** Calculated dynamically (`Quantity * Rate`).
- **Actions:** Add unlimited line items or remove items with the trash icon.

### Step 4: Pricing, Discounts & Taxes
- **Subtotal:** Auto-calculated sum of all line items.
- **Discount Option:**
  - *Percentage (%):* E.g., 10% early-bird incentive.
  - *Fixed Amount ($):* E.g., $500 package credit.
- **Tax Rate (%):** Pre-populated with your studio default (configurable in Settings), but editable per quote.
- **Final Investment Amount:** The prominent total figure formatted with your active currency symbol.

### Step 5: Payment Terms & Milestones
Protect your cash flow by avoiding 100% post-delivery payments:
- **Preset Milestone Structures:**
  - *50% / 50%:* 50% deposit upon signing, 50% upon final delivery.
  - *30% / 70%:* 30% upfront commitment fee, 70% upon handover.
  - *33% / 33% / 34% (Phased):* Kickoff deposit, midpoint review, and final launch.
  - *100% Upfront:* For rapid sprints or small audits.
  - *Custom Milestones:* Define your own percentage splits, milestone titles, and trigger conditions (e.g., *Due upon Figma prototype sign-off*).
- **Auto-Calculated Milestone Values:** Dollar values for each milestone recalculate automatically based on the final investment total.

### Step 6: Scope Boundaries & Revision Rules
The most vital step for protecting freelance profitability:
- **What’s Included:** Bulleted checklist of explicit deliverables (e.g., *Full Figma source files, 14-day bug warranty, responsive desktop and mobile layouts*).
- **What’s NOT Included:** Explicit boundaries that prevent out-of-scope requests (e.g., *Paid font licenses, third-party hosting charges, ongoing content copywriting*).
- **Revisions Policy:** Number of included revision rounds (e.g., `2 rounds`) and clear rules on how revision requests must be consolidated.
- **Client Responsibilities:** Mandatory client obligations (e.g., *Consolidated feedback within 3 business days, single point-of-contact for sign-offs*).

### Step 7: Final Review & Generation
- Review the complete proposal summary, total investment, milestone schedule, and scope boundaries.
- **Save as Draft:** Keeps the proposal in your workspace for further editing.
- **Save & Preview Proposal:** Finalizes the quote and immediately opens the executive proposal document viewer.

---

## 4. Proposal Document Viewer & Actions

The Document Viewer renders your proposal as an executive presentation document suitable for high-value enterprise clients.

### Document Layout Sections
1. **Studio Header:** Displays your studio monogram mark, business name, professional title, and direct contact details.
2. **Metadata Header:** Proposal reference number (`QP-2026-XXX`), issue date, and validity expiration date.
3. **Prepared For Card:** Client name, company, email, and phone.
4. **Project Overview:** High-level narrative summary.
5. **Scope of Work & Services Table:** Clean itemized table with quantities, rates, and line totals.
6. **Key Deliverables Checklist:** Bulleted summary of final deliverables.
7. **Project Timeline:** Duration in days, kickoff date, and estimated completion.
8. **Total Investment Card:** High-contrast dark container displaying Subtotal, Discounts, Taxes, and the Final Investment Total in tabular numbers.
9. **Payment Terms & Schedule:** Milestone cards indicating percentage splits, amounts, and trigger conditions.
10. **Scope Boundaries:** Dual-column display highlighting **What's Included** (green checks) and **What's Not Included** (neutral boundaries).
11. **Revision Policy & Client Responsibilities:** Contractual safeguards.
12. **Next Steps & Formal Sign-off Block:** Digital acceptance interface.

### Print & PDF Export Engine
Clicking **Export / Print PDF** triggers your browser's native print engine with custom `@media print` styling:
- Top toolbars and modals are automatically hidden.
- Container padding and backgrounds are optimized for clean standard A4 / US Letter pages.
- **Best Print Settings:**
  - *Destination:* Save as PDF
  - *Layout:* Portrait
  - *Background Graphics:* **Must be checked (ON)** to preserve styled badges and cards.
  - *Margins:* Default or None.

### Digital Client Sign-Off & Acceptance
Clients or freelancers can execute the proposal directly in the browser:
1. Click **Accept Proposal**.
2. Type the signer's full legal name into the signature field.
3. Click **Confirm & Accept**.
4. The proposal status permanently transitions to **ACCEPTED**, displays an emerald verification badge, and locks the date and signer name into the document record.

### Proposal Status Transitions
- **Draft:** Work in progress, editable at any time.
- **Sent:** Marked as delivered to the client for review.
- **Accepted:** Formally agreed and approved.

---

## 5. Proposal Repository & Management

Navigate to **Proposals** in the sidebar to view your complete library:
- **Status Filter Tabs:** Switch between *All*, *Drafts*, *Sent*, and *Accepted*.
- **Live Search:** Instant search by project title, client name, or company.
- **Row Actions:**
  - *View (Eye icon):* Opens the document viewer.
  - *Edit (Pencil icon):* Re-opens the 7-step wizard.
  - *Duplicate (Copy icon):* Clones the proposal with all line items, milestones, and scope boundaries into a new draft proposal.
  - *Mark as Sent / Accepted:* Quick status changes.
  - *Delete (Trash icon):* Permanently removes the proposal after confirmation.

---

## 6. Client Management (CRM)

Navigate to **Clients** in the sidebar:
- **Searchable Client Rolodex:** Filter clients by name, company, or email.
- **Client Cards:** Display contact info, phone, website, and date added.
- **Financial Metrics per Client:**
  - Total Proposals Created
  - Total Lifetime Quoted Amount
  - Total Accepted Deal Value
- **Quick Action: "Create Proposal":** Clicking this on any client card immediately starts a new proposal with their contact details pre-filled.
- **Client Detail Modal:** View a client's complete proposal history in one consolidated window.

---

## 7. Industry Templates Library

QuotePilot includes **6 production-ready industry templates** pre-configured with industry-standard rates, deliverables, and scope boundaries:

1. **Full-Stack Web Development & Custom Web App:** Covers discovery, responsive UI engineering, API integrations, testing, and production deployment.
2. **UI/UX Design System & Product Prototype:** Covers user research, wireframing, Figma design tokens, and clickable interactive prototype.
3. **Conversion Copywriting & Landing Page Offer:** Covers audience research, headline angles, wireframed copy deck, and email nurture sequence.
4. **Motion Design & Commercial Video Production:** Covers storyboards, 4K rendering, sound design, and multi-format social exports.
5. **Strategic Growth Marketing & Funnel Build:** Covers funnel architecture, ad creatives, conversion tracking, and analytics dashboards.
6. **Automation & AI Workflow Systems:** Covers process mapping, n8n/Make automation pipelines, error-logging, and staff handover training.

### Template Features
- **Use Template:** 1-click launch into the Proposal Wizard with all line items, terms, and boundaries pre-filled.
- **Duplicate Template:** Clone an existing template to create your own customized studio variations.
- **Create New Template:** Build reusable proposal blueprints from scratch.

---

## 8. Service Packages Matrix

Navigate to **Packages** in the sidebar:
- Presents a classic **3-tier productized service comparison** (Basic Starter, Growth Pro, Enterprise Bespoke).
- Each tier highlights pricing, ideal turnaround days, revision allowances, and itemized feature checklists.
- **"Select Package" Button:** Instantly packages the selected tier into a new proposal draft with pricing, milestones, and scope pre-configured.
- **Customizable:** Add new packages or modify pricing and feature bullets directly in the package manager.

---

## 9. Studio Settings & Customization

Navigate to **Settings** in the sidebar to configure your business identity:
- **Freelancer Profile:** Full name, professional title, business/studio name, contact email, phone, and website URL.
- **Monogram Logo Mark:** 1 to 4 characters (e.g., `QP`, `AM`, `VGD`) dynamically stamped onto proposal document headers.
- **Financial Defaults:** Currency symbol (`$`, `€`, `£`, `¥`, `CHF`), ISO currency code (`USD`, `EUR`, `GBP`), and default tax rate (%).
- **Standard Scope Policies:** Default revision policy wording and proposal next steps instructions automatically applied to new proposals.

---

## 10. Data Sovereignty, Backups & Migration

QuotePilot is built on the principle of **zero cloud dependencies**:
- **Where Data Lives:** Stored inside your browser's private `localStorage` under the `quotepilot_*` schema.
- **Exporting a Backup:** Go to **Settings** > **Data Management** > Click **Export JSON Backup**. A timestamped `.json` file (`quotepilot_backup_YYYY-MM-DD.json`) is downloaded to your machine.
- **Restoring / Importing Data:** Click **Import JSON**, select your backup file, and QuotePilot immediately restores all quotes, clients, templates, and settings.
- **Transferring Between Devices:** To move your studio from your desktop to your laptop, simply export the JSON from your desktop and import it on your laptop.
- **Reset to Demo Data:** Want a clean slate or want to test features? Click **Reset Demo Data** in Settings to re-initialize sample proposals and templates.
