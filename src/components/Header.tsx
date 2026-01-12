import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "#services" },
    { label: "Our Approach", href: "#approach" },
  ];

  return (
    <header className="w-full px-8 py-6 md:px-16 lg:pl-24 lg:pr-[119px]">
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
              className="text-[22px] font-light text-foreground transition-colors hover:text-muted-foreground"
              style={{ fontFamily: "'Zalando Sans', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
          <Button variant="cta" size="cta" className="text-[22px] w-[181px] h-[66px] font-light" style={{ fontFamily: "'Zalando Sans', sans-serif" }}>
            Get in Touch
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
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
          )}
        </Button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <nav className="md:hidden mt-6 flex flex-col gap-4 pb-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-light text-foreground transition-colors hover:text-muted-foreground py-2"
              style={{ fontFamily: "'Zalando Sans', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
          <Button 
            variant="cta" 
            size="cta" 
            className="text-lg w-full h-[50px] font-light mt-2" 
            style={{ fontFamily: "'Zalando Sans', sans-serif" }}
          >
            Get in Touch
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
