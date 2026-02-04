import logo from "@/assets/logo.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const isMobile = useIsMobile();

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X (Twitter)", href: "https://twitter.com" },
  ];

  const contactInfo = [
    { label: "hello@jobmama.com", href: "mailto:hello@jobmama.com" },
    { label: "©2025", href: null },
  ];

  if (isMobile) {
    return (
      <footer className="relative w-full bg-background overflow-hidden">
        {/* Content */}
        <div className="px-5 pt-16 pb-32 relative z-10">
          {/* Logo */}
          <img src={logo} alt="JobMama" className="h-8 w-auto mb-2" />
          
          {/* Tagline */}
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-foreground text-base tracking-[-0.6px] mb-10"
          >
            Europe based.
          </p>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {/* Navigation */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
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

            {/* Social */}
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
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

            {/* Contact */}
            <div className="flex flex-col gap-2 col-span-2">
              {contactInfo.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={item.label}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-foreground text-base tracking-[-0.6px]"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Decorative curved shape */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[200px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 200"
            fill="none"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="600"
              cy="300"
              rx="700"
              ry="250"
              fill="hsl(var(--foreground))"
            />
          </svg>
        </div>
      </footer>
    );
  }

  // Desktop layout
  return (
    <footer className="relative w-full bg-background overflow-hidden">
      {/* Content */}
      <div className="px-8 lg:px-[100px] pt-20 lg:pt-24 pb-48 lg:pb-64 relative z-10">
        <div className="flex justify-between items-start">
          {/* Left side - Logo and tagline */}
          <div>
            <img src={logo} alt="JobMama" className="h-10 lg:h-[42px] w-auto mb-3" />
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-foreground text-lg lg:text-xl tracking-[-0.6px]"
            >
              Europe based.
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex gap-16 lg:gap-24">
            {/* Navigation */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
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

            {/* Social */}
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
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

            {/* Contact */}
            <div className="flex flex-col gap-2">
              {contactInfo.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={item.label}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-foreground text-lg lg:text-xl tracking-[-0.6px]"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative curved shape */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[300px] lg:h-[400px]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          fill="none"
          preserveAspectRatio="none"
        >
          <ellipse
            cx="600"
            cy="500"
            rx="800"
            ry="400"
            fill="hsl(var(--foreground))"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
