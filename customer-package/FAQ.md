# Frequently Asked Questions (FAQ)

Everything you need to know about QuotePilot's features, data storage, licensing, and workflow.

---

### Q1: Is QuotePilot a monthly subscription?
**No.** QuotePilot is sold as a **one-time purchase**. You own the application, with no recurring monthly fees, no tiered plan limits, and no feature paywalls.

---

### Q2: Where is my proposal and client data stored? Is it saved on your servers?
**Your data is stored 100% locally on your own computer**, specifically inside your browser’s secure `localStorage` database. 
- There are **no remote database servers**.
- We never see, track, transmit, or store your clients’ contact details, confidential project briefs, or pricing information.
- You have complete data sovereignty and total privacy.

---

### Q3: What happens if I clear my browser cache or history?
Clearing regular cache and cookies will usually leave `localStorage` intact in modern browsers, but selecting "Clear site data / storage" can reset your browser's local database.
- **Best Practice:** Regularly use the **Export JSON Backup** button located in **Studio Settings**.
- If your data is ever cleared, simply click **Import JSON** in Settings, select your backup file, and your entire workspace will be restored instantly.

---

### Q4: How do I move my proposals and clients to a new computer or different browser?
Because your data is local to your browser, moving devices is simple:
1. On your current computer, open QuotePilot, go to **Settings**, and click **Export JSON Backup**.
2. Save the downloaded `.json` file to a USB drive, cloud drive, or email it to yourself.
3. Open QuotePilot on your new computer or in a different browser.
4. Go to **Settings**, click **Import JSON**, and select the file. All your proposals, clients, packages, and custom settings will immediately load.

---

### Q5: Does QuotePilot automatically send emails to my clients?
**No, and this is by design.** QuotePilot is engineered to give you complete control over your client communications. Rather than sending automated, impersonal emails from an unfamiliar software domain that often land in spam filters, QuotePilot produces:
1. **A pristine, print-styled PDF:** You can attach this directly to your personalized email, Slack thread, or client portal.
2. **A Digital Proposal Link:** You can copy the link and share it directly with your client for review.

---

### Q6: Can I accept credit card payments directly inside QuotePilot?
QuotePilot is an executive **proposal and quotation studio**, not a payment merchant gateway (like Stripe, PayPal, or Square). 
- In **Step 5 (Payment Terms)**, you define the exact payment structure (e.g., 50% deposit upon kickoff, 50% upon final handover) and invoice due dates.
- When your client accepts the proposal, you issue your invoice or payment link using your existing invoicing tool or bank transfer information as specified in your agreement.

---

### Q7: How do clients sign and accept proposals?
Clients can approve proposals in two ways:
1. **Digital In-Browser Sign-off:** In the proposal document viewer, there is a dedicated **Accept Proposal** section. The client types their full legal name and clicks **Confirm & Accept**. The document is instantly marked with an official timestamped **ACCEPTED & SIGNED** seal.
2. **PDF Signature:** You can export the clean PDF document and send it via your existing signature service (DocuSign, Adobe Sign, HelloSign) or have them reply with written email confirmation.

---

### Q8: Can I use different currencies and tax rates?
**Yes.** QuotePilot supports international freelancers:
- **Currency Symbols:** Choose from `$`, `€`, `£`, `¥`, `CHF`, or specify custom currency codes.
- **Currency ISO Codes:** Set standard ISO 4217 codes (e.g., `USD`, `EUR`, `GBP`, `CAD`, `AUD`).
- **Tax Rates (%):** Set a global default tax or VAT rate in **Settings**, or customize the tax percentage on each individual proposal.

---

### Q9: Can I use QuotePilot completely offline?
**Yes.** Because QuotePilot runs entirely in the browser using client-side JavaScript, it does not require an active internet connection to create, calculate, edit, or print proposals once loaded.

---

### Q10: What web browsers are supported?
QuotePilot works on all modern, standards-compliant browsers:
- Google Chrome (macOS, Windows, Linux)
- Apple Safari (macOS, iOS, iPadOS)
- Mozilla Firefox (macOS, Windows, Linux)
- Microsoft Edge (macOS, Windows)
- Brave, Arc, Opera, and Vivaldi

---

### Q11: Can I deploy QuotePilot to my own custom domain?
**Yes.** If you prefer to access QuotePilot online from anywhere, you can deploy the included codebase to any static web hosting provider (such as **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**) with a single command:
```bash
npm run build
```
Upload the resulting `dist` folder to your host or connect your repository.

---

### Q12: Can I customize the source code or design?
**Yes.** You receive the full, clean TypeScript + React 19 source code styled with Tailwind CSS. You are free to modify layouts, colors, fonts, or default templates to match your personal agency branding.
*(Note: Please review `LICENSE.md` regarding restrictions on reselling the source code itself).*

---

### Q13: How does the "Reset Demo Data" feature work?
In **Settings**, there is a "Reset Demo Data" button. Clicking this clears custom edits and repopulates the application with the original set of realistic client samples, templates, and packages. We recommend exporting a JSON backup before using this feature.
