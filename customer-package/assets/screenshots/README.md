# QuotePilot Visual Asset & Workflow Guide

This folder contains visual reference blueprints and architecture guides illustrating QuotePilot's workflow, interface hierarchy, and proposal document layout.

---

## Included Visual Reference Blueprints

| Diagram File | Subject & Scope |
| :--- | :--- |
| **`workflow-architecture.svg`** | Full end-to-end freelancer workflow from client lead to signed proposal. |
| **`proposal-document-structure.svg`** | Visual anatomical breakdown of the executive proposal layout and print sections. |
| **`wizard-7-step-flow.svg`** | Step-by-step map of the 7-stage proposal builder wizard. |
| **`data-storage-backup-model.svg`** | Diagram illustrating local-first browser storage and JSON export/import. |

---

## Key Interface Highlights

### 1. The Executive Proposal Document View
- **Studio Header:** Dynamic business monogram seal, studio name, title, contact details, and proposal reference number (`QP-2026-XXX`).
- **Scope & Services Table:** Clean tabular layout with item descriptions, unit rates, quantities, and line totals.
- **Total Investment Container:** High-contrast charcoal card summarizing Subtotal, Discounts, Taxes, and the Final Investment Total in tabular numerals.
- **Scope Safeguards:** Side-by-side **What's Included** vs **What's Not Included** protection lists to eliminate scope creep.
- **Formal Sign-off Block:** Digital client acceptance field with live timestamped confirmation badge.

### 2. Print-to-PDF Configuration Checklist
When preparing a proposal for client presentation via **Export / Print PDF**:
- [x] Destination: **Save as PDF**
- [x] Layout: **Portrait**
- [x] Paper Size: **A4** or **US Letter**
- [x] Background Graphics: **ENABLED (Checked)** *(Crucial for rendering dark investment cards and status chips)*
- [x] Headers and Footers: **DISABLED (Unchecked)** *(Hides browser URL and date)*
- [x] Margins: **Default** or **None**
