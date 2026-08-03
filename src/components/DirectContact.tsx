import { useLanguage } from "@/contexts/LanguageContext";
import { pushEvent } from "@/lib/analytics";
import { contactChannels } from "@/config/contact";

// Lower-friction "message us" row for social visitors who aren't ready to book
// a call. Renders only the channels that are configured.
const DirectContact = () => {
  const { language } = useLanguage();

  const channels = [
    { key: "instagram", label: "Instagram", href: contactChannels.instagramDm },
    { key: "messenger", label: "Messenger", href: contactChannels.messenger },
    { key: "viber", label: "Viber", href: contactChannels.viber },
  ].filter((c): c is { key: string; label: string; href: string } => Boolean(c.href));

  if (channels.length === 0) return null;

  const label = language === "bg" ? "Предпочиташ съобщение?" : "Prefer a message?";

  return (
    <div className="mt-8 text-center">
      <p
        className="text-sm md:text-base text-foreground/70 mb-3"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {channels.map((c) => (
          <a
            key={c.key}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushEvent("outbound_social_click", { network: c.label, placement: "contact" })
            }
            className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {c.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DirectContact;
