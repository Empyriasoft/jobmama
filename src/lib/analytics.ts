// Thin wrapper over the GTM dataLayer. Components never touch dataLayer
// directly — they call pushEvent so GTM has consistent, named triggers to
// build tags on. Works whether or not a GTM container id is configured
// (events simply queue on the array until a container consumes them).

export type AnalyticsEvent =
  | "book_call_click"
  | "outbound_social_click"
  | "faq_open"
  | "workshop_signup_click"
  | "lead_magnet_submit";

export function pushEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
