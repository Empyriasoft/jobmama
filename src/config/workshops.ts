// Founder-editable. Announce the next live workshop on the homepage by filling
// in `nextWorkshop`. Set it back to `null` to hide the workshop section
// entirely (workshops are JobMama's primary top-of-funnel lead source).

export interface Workshop {
  /** ISO date, e.g. "2026-08-15". */
  dateISO: string;
  /** Optional time label appended after the date, e.g. "18:30". */
  time?: string;
  /** City / venue, e.g. "София". */
  location?: string;
  /** Event title (write it in the site's primary language — Bulgarian). */
  title: string;
  /** Registration link — e.g. a Calendly group event. */
  signupUrl: string;
}

// TODO(user): set the next workshop here (and create the Calendly group event
// for signupUrl). Leave as null when there's no upcoming date to announce.
export const nextWorkshop: Workshop | null = null;
