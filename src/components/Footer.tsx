import logo from "@/assets/logo.svg";
import footerLogo from "@/assets/footer-logo.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { openConsentBanner } from "@/lib/consent";

const Footer = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  if (isMobile) {
    return (
      <footer className="relative w-full bg-background mt-[150px]">
        <div className="px-5 pt-12 pb-8 relative z-10">
          <img src={logo} alt="JobMama" className="h-8 w-auto mb-2" />
          
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-foreground text-base tracking-[-0.6px] mb-10"
          >
            {t.footer.tagline}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            <div className="flex flex-col gap-2">
              {t.footer.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {t.footer.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <a
                href={`mailto:${t.footer.email}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity"
              >
                {t.footer.email}
              </a>
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-base tracking-[-0.6px]"
              >
                {t.footer.copyright}
              </span>
              <button
                onClick={openConsentBanner}
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity text-left"
              >
                Бисквитки
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mt-[100px]">
          <img src={footerLogo} alt="" className="w-full h-auto object-cover" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative w-full bg-background mt-[120px] lg:mt-[160px]">
      <div className="px-5 sm:px-6 md:px-12 lg:px-[100px] pt-20 lg:pt-24 pb-12 lg:pb-16 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <img src={logo} alt="JobMama" className="h-10 lg:h-[42px] w-auto mb-3" />
          </div>

          <div className="flex gap-16 lg:gap-24">
            <div className="flex flex-col gap-2">
              {t.footer.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {t.footer.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${t.footer.email}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity"
              >
                {t.footer.email}
              </a>
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-lg lg:text-xl tracking-[-0.6px]"
              >
                {t.footer.copyright}
              </span>
              <button
                onClick={openConsentBanner}
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity text-left"
              >
                Бисквитки
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[450px]">
        <img src={footerLogo} alt="" className="w-full h-auto object-cover" />
      </div>
    </footer>
  );
};

export default Footer;
