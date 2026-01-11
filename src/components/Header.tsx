import { Button } from "@/components/ui/button";

const Header = () => {
  const navItems = ["Home", "Our Services", "Our Approach"];

  return (
    <header className="w-full px-8 py-6 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-tight text-foreground">
          Job<span className="font-normal italic">Mama</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              {item}
            </a>
          ))}
          <Button variant="cta" size="cta">
            Get in Touch
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
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
      </div>
    </header>
  );
};

export default Header;
