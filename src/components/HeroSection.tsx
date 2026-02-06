import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mother-child.jpg";

const HeroSection = () => {
  useEffect(() => {
    const googleSansLink = document.createElement("link");
    googleSansLink.href = "https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap";
    googleSansLink.rel = "stylesheet";
    document.head.appendChild(googleSansLink);
    const interLink = document.createElement("link");
    interLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    interLink.rel = "stylesheet";
    document.head.appendChild(interLink);
    return () => {
      document.head.removeChild(googleSansLink);
      document.head.removeChild(interLink);
    };
  }, []);

  return (
    <section className="w-full px-5 pb-4 pt-8 sm:px-6 sm:pb-6 sm:pt-12 md:px-12 md:pb-8 md:pt-[119px] lg:px-[100px]">
      <div 
        className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[40px] md:rounded-[60px] lg:rounded-[81px] aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[1843/963]"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${heroImage})` }} 
        />
        
        {/* Gradient Overlay - stronger on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent sm:from-foreground/50 sm:via-foreground/30" />
        
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-6 md:pb-[65px] md:pl-16 lg:pl-24">
          <div className="max-w-2xl">
            <h1 
              style={{ fontFamily: "'Google Sans', sans-serif" }} 
              className="mb-4 text-2xl font-bold leading-[1.1] tracking-tight text-hero sm:mb-6 sm:text-3xl md:mb-[48px] md:text-5xl lg:text-8xl"
            >
              Back to Work, Bold &<br />Confident
            </h1>
            
            <p 
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }} 
              className="mb-6 max-w-xs text-sm leading-relaxed text-hero/80 font-light sm:mb-8 sm:max-w-sm sm:text-base md:mb-[71px] md:max-w-md md:text-xl"
            >
              Restart your career with one-to-one coaching, CV makeover, free workshops and more!
            </p>
            
            <Button 
              variant="hero" 
              size="hero" 
              className="text-sm px-4 py-2 sm:text-base sm:px-6 sm:py-3 md:text-lg md:px-8 md:py-4"
              onClick={() => window.open('https://calendly.com/a-novakov89/30min', '_blank', 'noopener,noreferrer')}
            >
              Book a Free Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
