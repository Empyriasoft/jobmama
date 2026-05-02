import { createContext, useContext, useState, ReactNode } from "react";
import { en } from "@/translations/en";
import { bg } from "@/translations/bg";
import type { Translations } from "@/translations/en";

type Language = "en" | "bg";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("jobmama-lang") as Language;
      return stored === "en" || stored === "bg" ? stored : "bg";
    } catch {
      return "bg";
    }
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "bg" : "en";
      try {
        localStorage.setItem("jobmama-lang", next);
      } catch {}
      return next;
    });
  };

  const t = language === "en" ? en : bg;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
