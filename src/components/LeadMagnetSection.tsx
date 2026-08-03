import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { pushEvent } from "@/lib/analytics";

// Provider-agnostic endpoint (e.g. a MailerLite form action URL). When it's
// not configured, the whole section is hidden — nothing half-wired ships.
const FORM_ACTION = import.meta.env.VITE_NEWSLETTER_FORM_ACTION as
  | string
  | undefined;

const LeadMagnetSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!FORM_ACTION) return null;
  const copy = t.leadMagnet;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !consent || submitting) return;
    setSubmitting(true);
    try {
      // no-cors: most embeddable form endpoints accept the POST but don't send
      // CORS headers, so we submit optimistically and can't read the response.
      // TODO(user): the field name ("email") may need to match your provider.
      const body = new FormData();
      body.append("email", email);
      body.append("consent", "true");
      await fetch(FORM_ACTION, { method: "POST", body, mode: "no-cors" });
      pushEvent("lead_magnet_submit");
      toast.success(copy.success);
      setEmail("");
      setConsent(false);
    } catch {
      toast.error(copy.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="lead-magnet"
      className="w-full px-5 sm:px-6 md:px-12 lg:px-[100px] mt-[100px] md:mt-[140px] lg:mt-[160px] scroll-mt-24"
    >
      <div
        className="max-w-xl mx-auto rounded-[32px] md:rounded-[40px] p-8 md:p-12 text-center"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <h2
          className="text-2xl md:text-4xl font-medium break-words"
          style={{ fontFamily: "'Google Sans', sans-serif", color: "#0D141C" }}
        >
          {copy.title}
        </h2>
        <p
          className="mt-4 text-base md:text-lg text-foreground/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {copy.description}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            aria-label={copy.emailPlaceholder}
            className="h-12 rounded-full px-5 bg-background"
          />

          <label
            className="flex items-start gap-3 text-sm text-foreground/70 cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Checkbox
              checked={consent}
              onCheckedChange={(c) => setConsent(c === true)}
              className="mt-0.5 shrink-0"
            />
            <span>{copy.consent}</span>
          </label>

          <Button
            type="submit"
            disabled={submitting || !consent}
            className="h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {copy.cta}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
