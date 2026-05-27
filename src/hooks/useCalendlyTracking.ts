import { useEffect } from "react";

/**
 * Listens for Calendly's postMessage events and pushes a single
 * `calendly_booking_completed` event to the GTM dataLayer when a
 * booking is scheduled. Mount once at the app root.
 */
export function useCalendlyTracking() {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as { event?: string } | undefined;
      if (data?.event === "calendly.event_scheduled") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "calendly_booking_completed" });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
}
