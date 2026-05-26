// GDPR consent helpers — Consent Mode v2.
// We never read or write gtag/dataLayer from components; only this module does.

export type ConsentCategories = {
  analytics_storage: boolean;
  ad_storage: boolean;
  ad_user_data: boolean;
  ad_personalization: boolean;
  functionality_storage: boolean;
  personalization_storage: boolean;
};

export type ConsentState = {
  categories: ConsentCategories;
  timestamp: number; // ms epoch when the user made the choice
  version: number;
};

const STORAGE_KEY = "jm_consent_v1";
const CONSENT_VERSION = 1;
const TWELVE_MONTHS_MS = 12 * 30 * 24 * 60 * 60 * 1000;

export const REOPEN_EVENT = "jm:open-consent";

export const DENIED_ALL: ConsentCategories = {
  analytics_storage: false,
  ad_storage: false,
  ad_user_data: false,
  ad_personalization: false,
  functionality_storage: false,
  personalization_storage: false,
};

export const GRANTED_ALL: ConsentCategories = {
  analytics_storage: true,
  ad_storage: true,
  ad_user_data: true,
  ad_personalization: true,
  functionality_storage: true,
  personalization_storage: true,
};

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (Date.now() - parsed.timestamp > TWELVE_MONTHS_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(categories: ConsentCategories): void {
  const state: ConsentState = {
    categories,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  pushConsentUpdate(categories);
}

export function pushConsentUpdate(c: ConsentCategories): void {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: c.analytics_storage ? "granted" : "denied",
      ad_storage: c.ad_storage ? "granted" : "denied",
      ad_user_data: c.ad_user_data ? "granted" : "denied",
      ad_personalization: c.ad_personalization ? "granted" : "denied",
      functionality_storage: c.functionality_storage ? "granted" : "denied",
      personalization_storage: c.personalization_storage ? "granted" : "denied",
    });
  }
  // Also push a dataLayer signal for GTM triggers.
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "consent_updated", consent: c });
}

export function openConsentBanner(): void {
  window.dispatchEvent(new CustomEvent(REOPEN_EVENT));
}
