// bring the demo enrollments (the fake data)
import { inscriptions as demoInscriptions } from "./data/data.js";

// the name we use to save the list in the browser
const KEY = "nour_inscriptions";

// save the list
export function saveInscriptions(list) {
  // turn the list into text, then keep it in the browser
  localStorage.setItem(KEY, JSON.stringify(list));
}

// read the list
// if nothing is saved yet (first time), we save the demo list first
export function loadInscriptions() {
  // ask the browser for the saved text
  let savedText = localStorage.getItem(KEY);

  // getItem gives null when nothing is saved under this name
  if (savedText === null) {
    // first time: save the demo list
    saveInscriptions(demoInscriptions);
    // read it again, so we get a fresh copy and not the demo list itself
    savedText = localStorage.getItem(KEY);
  }

  // turn the text back into a list and give it back
  return JSON.parse(savedText);
}

// for the "Reset demo data" button: put the demo list back
export function resetDemoData() {
  saveInscriptions(demoInscriptions);
}