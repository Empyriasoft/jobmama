import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import logo from "@/assets/logo.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Home", "Our Services", "Our Approach"];

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
              key={item}
              href="#"
              className="text-[22px] font-light text-foreground transition-colors hover:text-muted-foreground"
              style={{ fontFamily: "'Zalando Sans', sans-serif" }}
            >
              {item}
            </a>
          ))}
          <Button variant="cta" size="cta" className="text-[22px] w-[181px] h-[66px] font-light" style={{ fontFamily: "'Zalando Sans', sans-serif" }}>
            Get in Touch
          </Button>
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
          <SheetContent side="right" className="w-full sm:w-[320px] p-0">
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
                    key={item}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="text-[20px] font-light text-foreground transition-colors hover:text-muted-foreground py-2"
                    style={{ fontFamily: "'Zalando Sans', sans-serif" }}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="p-5 border-t border-border">
                <Button 
                  variant="cta" 
                  size="cta" 
                  className="w-full text-[18px] h-[56px] font-light" 
                  style={{ fontFamily: "'Zalando Sans', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
