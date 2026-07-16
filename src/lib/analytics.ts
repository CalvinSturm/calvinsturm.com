// First-party wrapper around Vercel Web Analytics (the site deploys on Vercel;
// no other analytics provider exists). Pageviews are collected automatically by
// the injected script once Web Analytics is enabled for the project in the
// Vercel dashboard; custom events go through trackEvent().
//
// Design constraints, in order:
// - Analytics must never break navigation: every call is wrapped and failures
//   are swallowed.
// - No cookies, no PII: only event names plus path/destination context.
// - Duplicate clicks (double-fire from re-renders or rapid clicking) are
//   deduped within a short window.
//
// Event names and properties are documented in docs/analytics-events.md.
// Follow the `<product>_<action>` convention when adding events.

type EventProps = Record<string, string>;

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
    vaq?: unknown[];
  }
}

const SCRIPT_ID = 'va-insights';
const DEDUPE_WINDOW_MS = 1000;
const recentEvents = new Map<string, number>();

function ensureLoaded(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try {
    window.va =
      window.va ||
      function (...args: unknown[]) {
        (window.vaq = window.vaq || []).push(args);
      };
    // The insights endpoint only exists on Vercel deployments, so skip the
    // script tag on local hosts to avoid 404 noise. Events still queue
    // harmlessly.
    const isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(window.location.hostname);
    if (!isLocal && !document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.defer = true;
      script.src = '/_vercel/insights/script.js';
      document.head.appendChild(script);
    }
  } catch {
    // Analytics must never interfere with the page.
  }
}

/**
 * Record a custom event. Safe to call from any click handler or effect:
 * failures are swallowed and rapid duplicates are dropped.
 */
export function trackEvent(name: string, props: EventProps = {}): void {
  try {
    ensureLoaded();
    const key = name + JSON.stringify(props);
    const now = Date.now();
    const last = recentEvents.get(key);
    if (last !== undefined && now - last < DEDUPE_WINDOW_MS) return;
    recentEvents.set(key, now);
    window.va?.('event', { name, data: props });
  } catch {
    // Never let analytics break navigation or rendering.
  }
}

/** Shared helper for download/CTA clicks so property names stay consistent. */
export function trackCtaClick(
  product: string,
  action: string,
  ctaLocation: string,
  destination: string,
): void {
  trackEvent(`${product}_${action}`, {
    product,
    source_path: typeof location !== 'undefined' ? location.pathname : '',
    cta_location: ctaLocation,
    destination,
  });
}

// Load the pageview script as soon as any page imports this module.
ensureLoaded();
