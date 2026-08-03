// Campaign attribution: capture utm_* (and click ids) on first load and
// replay them into outbound booking URLs. Calendly stores utm_* per booking
// natively, so this makes a booking traceable back to the ad that drove it.

const STORAGE_KEY = "jm_utm";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

type TrackedParam = (typeof TRACKED_PARAMS)[number];
type UtmParams = Partial<Record<TrackedParam, string>>;

/**
 * Read attribution params from the current URL and persist them for the
 * session. Call once, as early as possible (before first render), so embed
 * URLs computed during render already carry the params.
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  try {
    const search = new URLSearchParams(window.location.search);
    const found: UtmParams = {};
    for (const key of TRACKED_PARAMS) {
      const value = search.get(key);
      if (value) found[key] = value;
    }
    // Only persist when this visit actually carries attribution — never
    // overwrite an earlier capture with an empty one (e.g. later navigation).
    if (Object.keys(found).length === 0) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage unavailable (private mode) — attribution is best-effort.
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

/**
 * Append stored attribution params to a URL without clobbering any params it
 * already has. No-op when nothing was captured.
 */
export function appendUtmParams(url: string): string {
  const stored = getStoredUtmParams();
  const entries = Object.entries(stored) as [TrackedParam, string][];
  if (entries.length === 0) return url;
  try {
    const parsed = new URL(url);
    for (const [key, value] of entries) {
      if (!parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, value);
      }
    }
    return parsed.toString();
  } catch {
    // Relative or malformed URL — return unchanged rather than throwing.
    return url;
  }
}
