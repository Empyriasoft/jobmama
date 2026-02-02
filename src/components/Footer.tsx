import logo from "@/assets/logo.svg";

const Footer = () => {
  const navigationLinks = [
    { name: "Projects", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "X", href: "#" },
  ];

  return (
    <footer className="w-full bg-background overflow-hidden">
      {/* Top Section */}
      <div className="w-full px-5 md:px-8 lg:px-[100px] pt-[60px] md:pt-[80px] lg:pt-[100px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <img src={logo} alt="JobMama" className="h-6 md:h-8 w-auto self-start" />
            <p 
              className="text-foreground text-sm md:text-base font-light"
              style={{ fontFamily: "'Zalando Sans', Inter, sans-serif" }}
            >
              Europe based.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground text-sm md:text-base font-light hover:text-muted-foreground transition-colors"
                style={{ fontFamily: "'Zalando Sans', Inter, sans-serif" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground text-sm md:text-base font-light hover:text-muted-foreground transition-colors"
                style={{ fontFamily: "'Zalando Sans', Inter, sans-serif" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 4: Contact & Copyright */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@jobmama.com"
              className="text-foreground text-sm md:text-base font-light hover:text-muted-foreground transition-colors"
              style={{ fontFamily: "'Zalando Sans', Inter, sans-serif" }}
            >
              hello@jobmama.com
            </a>
            <p 
              className="text-foreground text-sm md:text-base font-light"
              style={{ fontFamily: "'Zalando Sans', Inter, sans-serif" }}
            >
              ©2025
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Large Decorative Brand Text */}
      <div className="w-full relative mt-[40px] md:mt-[60px] lg:mt-[80px]">
        <div className="w-full overflow-hidden">
          <p
            className="text-[#0D141C] font-medium leading-none text-[150px] md:text-[250px] lg:text-[400px] tracking-[-0.04em] translate-y-[30%]"
            style={{ fontFamily: "'Google Sans', Inter, sans-serif" }}
          >
            bMama
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
