# Nour Academy — Back-Office

A back-office for the secretariat of Nour Academy's three tutoring centres, replacing Excel files. Everything runs in the browser and data survives closing the tab (`localStorage`). No server needed.

## Features

- **Parent portal** (`index.html`): course catalogue, filters, cart and enrolment form with live validation.
- **Registrations** (`dashboard.html`): list, add, edit, delete (with confirmation).
- **Search, filter, sort**: search by name or phone, filter by status, sort by name or date. They combine.
- **Pagination**: 10 rows per page.
- **Statistics**: total registrations, breakdown by status, revenue from paid registrations, occupancy per course (max 15).
- **Reset demo data** button. All data is fictional.

## Tech stack

Vite, Tailwind CSS, vanilla JavaScript (ES modules), Font Awesome (bundled locally, works offline).

## Getting started

Requires Node.js 18+.

```bash
git clone <repo-url>
cd Nour-Academy-Back-Office
npm install
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the build |

## Project structure

```text
index.html          Parent portal
dashboard.html      Back-office
statistics.html     Statistics page
styles/styles.css   Tailwind import and design tokens
src/
  main.js           Portal: catalogue and cart
  form.js           Portal: enrolment form and validation
  dashboard.js      Back-office: CRUD, search, filter, sort, pagination
  statistics.js     Statistics page
  storage.js        localStorage load, save, reset
  utils.js          Statistics calculation
  data/             Courses and demo registrations
  ui/table.js       Table rendering
```

Data flows one way: `data` → `storage` → controller (`dashboard.js`) → `ui/table.js` → page.

## Data model

Registrations are saved as a JSON array in `localStorage` under `nour_inscriptions`.

```json
{
  "id": 1,
  "dossier": "NA-2025-001",
  "student": "Youssef Amrani",
  "level": "Primary",
  "courseId": 1,
  "course": "Mathematics — Reinforcement",
  "phone": "0612345678",
  "status": "Paid",
  "date": "2025-09-12"
}
```

Status values: `Pending`, `Validated`, `Paid`.

## Status

| Item | State |
| --- | --- |
| List, edit, delete, statistics, reset, pagination | Done |
| Add registration | Done, but no duplicate or 15-student capacity check yet |
| Search and filter saved in `sessionStorage` | To do |
| CSV export, undo delete, URL navigation | To do |

## Team

| Member | Contribution |
| --- | --- |
| Mohamed Bouhadi | _to complete_ |
| _Teammate_ | _to complete_ |

## Workflow

Tickets on the board, branches named `feature/NOUR-<ticket>-<name>`, and `main` is protected: every change goes through a reviewed Pull Request.

## Data protection

This repository contains fictional data only (Law 09-08, CNDP). No data leaves the browser.

## Sources

Vite, Tailwind CSS and MDN documentation (Web Storage, `<dialog>`, Array methods).
