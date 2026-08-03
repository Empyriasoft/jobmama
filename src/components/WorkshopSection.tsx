import { useLanguage } from "@/contexts/LanguageContext";
import { pushEvent } from "@/lib/analytics";
import { nextWorkshop } from "@/config/workshops";

const WorkshopSection = () => {
  const { t, language } = useLanguage();

  // No upcoming workshop configured → render nothing.
  if (!nextWorkshop) return null;
  const workshop = nextWorkshop;

  const locale = language === "bg" ? "bg-BG" : "en-GB";
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(workshop.dateISO));

  const meta = [
    formattedDate + (workshop.time ? `, ${workshop.time}` : ""),
    workshop.location,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      id="workshop"
      className="w-full px-5 sm:px-6 md:px-12 lg:px-[100px] mt-[100px] md:mt-[140px] lg:mt-[160px] scroll-mt-24"
    >
      <div
        className="max-w-4xl mx-auto rounded-[32px] md:rounded-[40px] p-8 md:p-12 text-center"
        style={{ backgroundColor: "#EAFBFF" }}
      >
        <p
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: "'Inter', sans-serif", color: "#0B7A94" }}
        >
          {t.workshop.eyebrow}
        </p>

        <h2
          className="mt-3 text-2xl md:text-4xl font-medium break-words"
          style={{ fontFamily: "'Google Sans', sans-serif", color: "#0D141C" }}
        >
          {workshop.title}
        </h2>

        <p
          className="mt-3 text-base md:text-lg font-medium"
          style={{ fontFamily: "'Inter', sans-serif", color: "#0D141C" }}
        >
          {meta}
        </p>

        <p
          className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t.workshop.description}
        </p>

        <a
          href={workshop.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushEvent("workshop_signup_click", { workshop: workshop.title })}
          className="inline-block mt-8 rounded-full bg-foreground text-background px-8 py-3 text-base font-medium transition-opacity hover:opacity-90"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t.workshop.cta}
        </a>
      </div>
    </section>
  );
};

export default WorkshopSection;
