# Privacy & Security Disclosure

**QuotePilot: Private by Design, Local-First by Architecture**

*Last updated: 2026*

---

## 1. Our Core Privacy Philosophy

Most modern SaaS tools require you to create an account, upload sensitive client names, store confidential contract terms on remote third-party databases, and expose your business financials to external cloud systems.

**QuotePilot is built on an entirely different architecture.**

We believe that your freelance proposals, financial rates, client contact lists, and contractual terms should belong solely to you. QuotePilot operates as a **local-first web application**.

---

## 2. Where Your Data Is Stored

- **Browser Storage Only:** 100% of your data (quotes, client records, custom templates, packages, and studio profile settings) is stored exclusively within your own browser's `localStorage` engine.
- **Zero Remote Databases:** There are no backend database servers, no Firebase clusters, no Supabase instances, and no cloud relays connected to this application.
- **Client Confidentiality:** When you draft a proposal containing proprietary client deliverables, non-disclosure requirements, or custom pricing, that data never transmits across the public internet to our servers.

---

## 3. Telemetry, Tracking & Analytics

- **No Third-Party Analytics:** QuotePilot does not load Google Analytics, Mixpanel, Hotjar, Facebook Pixels, or any behavioral tracking scripts.
- **No Telemetry:** We collect zero metrics on how many proposals you create, how much you charge, or which templates you use.
- **No Advertising Trackers:** The software is completely free of advertisements, tracking pixels, and affiliate beacons.

---

## 4. Third-Party Integrations & Network Requests

- **Fonts & Icons:** The application uses Google Fonts and standard Lucide SVG icons. In local builds or offline mode, no external network requests are executed during proposal creation or document rendering.
- **Print & PDF Generation:** All PDF rendering is executed natively via your browser’s local print rendering engine (`window.print()`). Your documents are never sent to an external PDF conversion API.

---

## 5. Your Data Rights & Portability

Because your data is stored locally, you maintain total sovereignty:
- **Instant Export:** You can download a complete, unencrypted, machine-readable JSON archive of your entire workspace at any time (**Settings** > **Export JSON Backup**).
- **Instant Deletion:** You can completely wipe all stored data by clearing your browser’s site data or by clicking **Reset Demo Data** in Settings.
- **Zero Lock-In:** You will never be locked out of your proposal history by an expired subscription or unpaid account tier.
