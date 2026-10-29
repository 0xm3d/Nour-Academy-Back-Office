import { inscriptions as demoInscriptions } from "./data/data.js";

const KEY = "nour_inscriptions";

// Put the demo registrations in localStorage the first time the page opens.
if (window.localStorage.getItem(KEY) === null) {
  window.localStorage.setItem(KEY, JSON.stringify(demoInscriptions));
}

// Read the saved registrations from localStorage.
export function loadInscriptions() {
  return JSON.parse(window.localStorage.getItem(KEY));
}

// Save the updated registrations to localStorage.
export function saveInscriptions(registrations) {
  window.localStorage.setItem(KEY, JSON.stringify(registrations));
}

// Restore the demo registrations when Reset demo data is clicked.
export function resetDemoData() {
  saveInscriptions(demoInscriptions);
  return demoInscriptions;
}
