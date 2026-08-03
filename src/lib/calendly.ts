// Single source of truth for the Calendly booking link.
//
// TODO(user): the copy promises a *free 15-minute* intro call, but this points
// at the generic "30 Minute Meeting" event. Create a branded 15-minute event
// (Bulgarian name, description, photo) and swap the URL here — it's the only
// place it lives, so it's a one-line change.
import { appendUtmParams } from "@/lib/utm";

export const CALENDLY_URL = "https://calendly.com/hellojobmama/30min";

// Cleaner inline embed: hide Calendly's own cookie banner (we handle consent)
// and the redundant event-details column.
const EMBED_PARAMS = "hide_gdpr_banner=1&hide_event_type_details=1";

/**
 * URL for the inline embed widget, with campaign attribution appended so the
 * booking is traceable to the ad that drove it. Read at render time.
 */
export function getCalendlyEmbedUrl(): string {
  return appendUtmParams(`${CALENDLY_URL}?${EMBED_PARAMS}`);
}
