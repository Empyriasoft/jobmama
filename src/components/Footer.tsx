import logo from "@/assets/logo.svg";
import footerLogo from "@/assets/footer-logo.png";
import { useIsMobile } from "@/hooks/use-mobile";
const Footer = () => {
  const isMobile = useIsMobile();
  const navLinks = [{
    label: "Projects",
    href: "#projects"
  }, {
    label: "Pricing",
    href: "#pricing"
  }, {
    label: "About",
    href: "#about"
  }];
  const socialLinks = [{
    label: "Instagram",
    href: "https://instagram.com"
  }, {
    label: "LinkedIn",
    href: "https://linkedin.com"
  }, {
    label: "X (Twitter)",
    href: "https://twitter.com"
  }];
  const contactInfo = [{
    label: "hello@jobmama.com",
    href: "mailto:hello@jobmama.com"
  }, {
    label: "©2025",
    href: null
  }];
  if (isMobile) {
    return <footer className="relative w-full bg-background mt-[250px]">
        {/* Content */}
        <div className="px-5 pt-16 pb-8 relative z-10">
          {/* Logo */}
          <img src={logo} alt="JobMama" className="h-8 w-auto mb-2" />
          
          {/* Tagline */}
          <p style={{
          fontFamily: "'Inter', sans-serif"
        }} className="text-foreground text-base tracking-[-0.6px] mb-10">
            Europe based.
          </p>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {/* Navigation */}
            <div className="flex flex-col gap-2">
              {navLinks.map(link => <a key={link.label} href={link.href} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity">
                  {link.label}
                </a>)}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-2">
              {socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity">
                  {link.label}
                </a>)}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 col-span-2">
              {contactInfo.map(item => item.href ? <a key={item.label} href={item.href} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-base tracking-[-0.6px] hover:opacity-70 transition-opacity">
                    {item.label}
                  </a> : <span key={item.label} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-base tracking-[-0.6px]">
                    {item.label}
                  </span>)}
            </div>
          </div>
        </div>

        {/* Footer logo - edge to edge */}
        <div className="w-full mt-[250px]">
          <img src={footerLogo} alt="" className="w-full h-auto object-cover" />
        </div>
      </footer>;
  }

  // Desktop layout
  return <footer className="relative w-full bg-background mt-[500px]">
      {/* Content */}
      <div className="px-8 lg:px-[100px] pt-20 lg:pt-24 pb-12 lg:pb-16 relative z-10">
        <div className="flex justify-between items-start">
          {/* Left side - Logo and tagline */}
          <div>
            <img src={logo} alt="JobMama" className="h-10 lg:h-[42px] w-auto mb-3" />
            
          </div>

          {/* Right side - Links */}
          <div className="flex gap-16 lg:gap-24">
            {/* Navigation */}
            <div className="flex flex-col gap-2">
              {navLinks.map(link => <a key={link.label} href={link.href} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity">
                  {link.label}
                </a>)}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-2">
              {socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity">
                  {link.label}
                </a>)}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              {contactInfo.map(item => item.href ? <a key={item.label} href={item.href} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-lg lg:text-xl tracking-[-0.6px] hover:opacity-70 transition-opacity">
                    {item.label}
                  </a> : <span key={item.label} style={{
              fontFamily: "'Inter', sans-serif"
            }} className="text-foreground text-lg lg:text-xl tracking-[-0.6px]">
                    {item.label}
                  </span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer logo - edge to edge */}
      <div className="w-full mt-[500px]">
        <img src={footerLogo} alt="" className="w-full h-auto object-cover" />
      </div>
    </footer>;
};
export default Footer;