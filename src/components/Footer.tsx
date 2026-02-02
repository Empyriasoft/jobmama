import logo from "@/assets/logo.svg";

const Footer = () => {
  const navLinks = ["Projects", "Pricing", "About"];
  const socialLinks = ["Instagram", "LinkedIn", "X"];

  return (
    <footer className="w-full bg-background overflow-hidden">
      {/* Top Section */}
      <div className="w-full px-5 md:px-8 lg:px-[100px] pt-16 md:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <img src={logo} alt="JobMama" className="h-6 w-auto self-start" />
            <p className="text-sm font-light text-foreground">Europe based.</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-light text-foreground hover:text-muted-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-light text-foreground hover:text-muted-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 4: Contact & Copyright */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@jobmama.com"
              className="text-sm font-light text-foreground hover:text-muted-foreground transition-colors"
            >
              hello@jobmama.com
            </a>
            <p className="text-sm font-light text-foreground">©2025</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Large Decorative Text */}
      <div className="w-full mt-12 md:mt-16 lg:mt-20 relative h-[120px] md:h-[180px] lg:h-[280px]">
        <p 
          className="absolute bottom-0 left-0 right-0 text-center text-[150px] md:text-[250px] lg:text-[400px] font-bold text-foreground leading-[0.7] translate-y-[35%]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          bMar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
