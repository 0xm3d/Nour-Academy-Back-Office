// today's date written like 2026-10-28
export function today() {
  // "en-CA" is the language that writes dates as year-month-day
  return new Date().toLocaleDateString("en-CA");
}
