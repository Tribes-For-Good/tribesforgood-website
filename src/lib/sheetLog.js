/**
 * Mirrors form submissions into a Google Sheet via an Apps Script web app.
 *
 * This is an ADDITIONAL record, never the primary one. Brochure leads still go
 * to Firebase and contact messages are still emailed, so if the Sheet is
 * missing, misconfigured or down, nothing the user is doing breaks.
 *
 * Set NEXT_PUBLIC_SHEET_LOG_URL to the Apps Script /exec URL to switch it on.
 * See docs/google-sheet-setup.gs for the script and setup steps.
 */
// The Apps Script web app that appends rows to the TribesforGOOD lead Sheet.
// Kept in code on purpose: it is a write-only endpoint, not a credential, and
// hardcoding it means the Sheet keeps working without anyone needing access to
// the Vercel dashboard to manage environment variables.
// To point at a different Sheet, either change this URL or set
// NEXT_PUBLIC_SHEET_LOG_URL, which takes precedence.
const DEFAULT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz11_W6NXPrLf1odt11_4gRQn8NR7t7YEniLosRYaqioXdnqYUbE5I5GCCCcD2-dVYn/exec";

const ENDPOINT = process.env.NEXT_PUBLIC_SHEET_LOG_URL || DEFAULT_ENDPOINT;

export function logToSheet(payload) {
  if (!ENDPOINT) return false; // not configured, stay silent

  const body = JSON.stringify({
    ...payload,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });

  // sendBeacon is built for exactly this: a small write that must survive the
  // page being navigated away from or backgrounded. On iOS Safari a download
  // can unload the page, which was silently killing a plain fetch.
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
      if (navigator.sendBeacon(ENDPOINT, blob)) return true;
    }
  } catch (err) {
    // fall through to fetch
  }

  try {
    fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true, // let it finish even if the page goes away
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    }).catch(() => {});
    return true;
  } catch (err) {
    console.warn("Sheet logging failed (submission itself was unaffected):", err);
    return false;
  }
}
