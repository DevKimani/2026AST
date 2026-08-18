export function quickExit() {
  try { window.open("https://www.google.com", "_newtab"); } catch { /* ignore */ }
  window.location.replace("https://www.bbc.com/weather");
}
