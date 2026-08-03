import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { X, Menu } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToHash } from "@/lib/scroll";
import { pushEvent } from "@/lib/analytics";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // On the homepage, smooth-scroll to the section. Off it (e.g. /contact),
  // route back home carrying the hash — Index scrolls to it on mount.
  const goToHash = (href: string) => {
    if (location.pathname === "/") {
      scrollToHash(href);
    } else {
      navigate("/" + href);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => goToHash(href), 350);
    } else {
      goToHash(href);
    }
  };

  const handleBookClick = () => {
    pushEvent("book_call_click", { placement: "sticky_header" });
    goToHash("#contact");
  };

  const LanguageToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1 text-foreground font-medium transition-opacity hover:opacity-70 min-h-[44px] ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <span className={language === "bg" ? "opacity-100" : "opacity-40"}>BG</span>
      <span className="opacity-40">|</span>
      <span className={language === "en" ? "opacity-100" : "opacity-40"}>EN</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md px-5 py-4 sm:px-6 md:px-12 md:py-5 lg:px-[100px]">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="JobMama">
          <img src={logo} alt="JobMama" className="h-8" />
        </a>

        {/* Right side: Language toggle (hidden on mobile) + CTA + Hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden sm:flex">
            <LanguageToggle className="text-sm md:text-base lg:text-lg" />
          </span>

          <Button
            variant="cta"
            onClick={handleBookClick}
            className="h-9 px-4 text-sm md:h-11 md:px-6 md:text-base bg-foreground text-background hover:bg-foreground/90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.header.cta}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label={language === "bg" ? "Отвори менюто" : "Open menu"} className="p-2 min-w-[44px] min-h-[44px] md:min-w-[52px] md:min-h-[52px]">
                <Menu className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[320px] p-0" hideCloseButton>
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <img src={logo} alt="JobMama" className="h-8" />
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" aria-label={language === "bg" ? "Затвори менюто" : "Close menu"} className="p-2 min-w-[44px] min-h-[44px]">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-5 gap-6 flex-1">
                  {t.header.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-[20px] font-light text-foreground transition-colors hover:text-muted-foreground py-2"
                      style={{ fontFamily: "'Zalando Sans', sans-serif" }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Language toggle in menu */}
                <div className="p-5 border-t border-border">
                  <LanguageToggle className="text-base" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
