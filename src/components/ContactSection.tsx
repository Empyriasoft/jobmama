import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCalendlyEmbedUrl } from "@/lib/calendly";
import DirectContact from "@/components/DirectContact";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

const ContactSection = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const copy =
    language === "bg"
      ? {
          title: "Имаш въпрос? Резервирай безплатна 15-минутна среща",
          intro:
            "Кратък разговор, в който да се опознаем, да чуя какво ти трябва и да предложа най-подходящия следващ ход.",
          fallback: "Или ми пиши директно:",
        }
      : {
          title: "Have a question? Book a free 15-minute call",
          intro:
            "A short conversation so we can get to know each other, hear what you need, and decide the best next step together.",
          fallback: "Or email me directly:",
        };

  return (
    <section
      id="contact"
      className="w-full px-5 sm:px-6 md:px-12 lg:px-[100px] mt-[100px] md:mt-[150px] lg:mt-[200px] scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: "#0D141C" }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-center break-words mb-4"
        >
          {copy.title}
        </h2>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-center text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-10"
        >
          {copy.intro}
        </p>

        <div
          className="calendly-inline-widget rounded-xl"
          data-url={getCalendlyEmbedUrl()}
          data-resize="true"
          style={{ minWidth: "320px", width: "100%", height: "1100px" }}
        />

        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-center text-sm md:text-base text-foreground/70 mt-8"
        >
          {copy.fallback}{" "}
          <a
            href="mailto:hello@jobmama.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            hello@jobmama.com
          </a>
        </p>

        <DirectContact />
      </div>
    </section>
  );
};

export default ContactSection;
