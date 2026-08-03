import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCalendlyEmbedUrl } from "@/lib/calendly";
import DirectContact from "@/components/DirectContact";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

const Contact = () => {
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
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        path="/contact"
        title={
          language === "bg"
            ? "Контакти — JobMama | Резервирай безплатна 15-минутна среща"
            : "Contact — JobMama | Book a free 15-minute call"
        }
        description={
          language === "bg"
            ? "Резервирай безплатна 15-минутна онлайн среща с JobMama или ни пиши на hello@jobmama.com."
            : "Book a free 15-minute online intro call with JobMama or email us at hello@jobmama.com."
        }
      />
      <Header />
      <main className="flex-1 px-5 sm:px-6 md:px-12 lg:px-[100px] py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1
            style={{ fontFamily: "'Google Sans', sans-serif", color: "#0D141C" }}
            className="text-3xl md:text-5xl font-medium text-center break-words mb-4"
          >
            {copy.title}
          </h1>
          <p className="text-center text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-10">
            {copy.intro}
          </p>

          <div
            className="calendly-inline-widget rounded-xl overflow-hidden"
            data-url={getCalendlyEmbedUrl()}
            style={{ minWidth: "320px", height: "700px" }}
          />

          <p className="text-center text-sm md:text-base text-foreground/70 mt-8">
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
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
