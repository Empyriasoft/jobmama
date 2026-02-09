import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import logo from "@/assets/logo.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Our Approach", href: "#our-approach" },
  ];

  const smoothScrollTo = (targetY: number, duration = 800) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToTarget = (href: string) => {
    if (href === "#home") {
      smoothScrollTo(0);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(top);
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => scrollToTarget(href), 350);
    } else {
      scrollToTarget(href);
    }
  };

  return (
    <header className="w-full px-5 py-6 md:px-8 lg:px-[100px]">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <a href="/">
          <img src={logo} alt="JobMama" className="h-8" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[22px] font-light text-foreground transition-colors hover:text-muted-foreground"
              style={{ fontFamily: "'Zalando Sans', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden p-2 min-w-[44px] min-h-[44px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[320px] p-0" hideCloseButton>
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <img src={logo} alt="JobMama" className="h-8" />
                <SheetClose asChild>
                  <Button variant="ghost" size="sm" className="p-2 min-w-[44px] min-h-[44px]">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-5 gap-6 flex-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-[20px] font-light text-foreground transition-colors hover:text-muted-foreground py-2"
                    style={{ fontFamily: "'Zalando Sans', sans-serif" }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
