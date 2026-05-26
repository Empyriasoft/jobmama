import { useEffect, useState } from "react";
import {
  ConsentCategories,
  DENIED_ALL,
  GRANTED_ALL,
  REOPEN_EVENT,
  getConsent,
  setConsent,
} from "@/lib/consent";

const CATEGORY_LABELS: Array<{
  key: keyof ConsentCategories;
  title: string;
  description: string;
  locked?: boolean;
}> = [
  {
    key: "functionality_storage",
    title: "Необходими",
    description: "Нужни за основната работа на сайта. Не могат да бъдат изключени.",
    locked: true,
  },
  {
    key: "analytics_storage",
    title: "Анализ",
    description: "Помагат ни да разберем как се използва сайтът (Google Analytics).",
  },
  {
    key: "ad_storage",
    title: "Маркетинг",
    description: "Използват се за измерване и таргетиране на реклами.",
  },
  {
    key: "personalization_storage",
    title: "Предпочитания",
    description: "Запомнят твоите избори (например език).",
  },
];

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selection, setSelection] = useState<ConsentCategories>(DENIED_ALL);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setSelection(existing.categories);
    }
    const handler = () => {
      const cur = getConsent();
      if (cur) setSelection(cur.categories);
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener(REOPEN_EVENT, handler);
    return () => window.removeEventListener(REOPEN_EVENT, handler);
  }, []);

  const acceptAll = () => {
    setConsent(GRANTED_ALL);
    setOpen(false);
    setShowSettings(false);
  };
  const rejectAll = () => {
    setConsent({ ...DENIED_ALL, functionality_storage: true });
    setOpen(false);
    setShowSettings(false);
  };
  const savePrefs = () => {
    setConsent({ ...selection, functionality_storage: true });
    setOpen(false);
    setShowSettings(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Съгласие за бисквитки"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-foreground text-background shadow-2xl">
        <div className="p-5 sm:p-6">
          {!showSettings ? (
            <>
              <h2 className="text-lg font-semibold mb-2">Използваме бисквитки</h2>
              <p className="text-sm opacity-90 mb-4">
                Използваме бисквитки, за да подобрим работата на сайта, да анализираме
                трафика и да персонализираме съдържанието. Можеш да приемеш всички или
                да управляваш предпочитанията си.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 rounded-lg border border-background/30 text-sm hover:bg-background/10 transition"
                >
                  Настройки
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 rounded-lg border border-background/30 text-sm hover:bg-background/10 transition"
                >
                  Отказвам
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-lg bg-background text-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Приемам всички
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-3">Настройки на бисквитките</h2>
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {CATEGORY_LABELS.map((cat) => (
                  <label
                    key={cat.key}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/5"
                  >
                    <input
                      type="checkbox"
                      checked={cat.locked ? true : selection[cat.key]}
                      disabled={cat.locked}
                      onChange={(e) =>
                        setSelection((s) => ({ ...s, [cat.key]: e.target.checked }))
                      }
                      className="mt-1"
                    />
                    <div>
                      <div className="text-sm font-medium">{cat.title}</div>
                      <div className="text-xs opacity-80">{cat.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end mt-4">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 rounded-lg border border-background/30 text-sm hover:bg-background/10 transition"
                >
                  Отказвам всички
                </button>
                <button
                  onClick={savePrefs}
                  className="px-4 py-2 rounded-lg border border-background/30 text-sm hover:bg-background/10 transition"
                >
                  Запази избора
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-lg bg-background text-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Приемам всички
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
