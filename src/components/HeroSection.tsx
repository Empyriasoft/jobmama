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
  return <section className="w-full px-8 pb-8 pt-[119px] md:px-16 lg:px-24">
      <div className="relative w-full overflow-hidden rounded-[81px]" style={{ aspectRatio: '1843 / 963' }}>
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        
        {/* Gradient Overlay - softer for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/30 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end pb-[65px] pl-8 md:pl-16 lg:pl-24">
          <div className="max-w-2xl">
            <h1 style={{
            fontFamily: "'Google Sans', sans-serif"
          }} className="mb-[48px] text-4xl font-bold leading-[1.1] tracking-tight text-hero md:text-5xl lg:text-8xl">
              Back to Work, Bold &<br />Confident
            </h1>
            
            <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500
          }} className="mb-[71px] max-w-md text-base leading-relaxed text-hero/80 font-light md:text-xl">
              Restart your career with one-to-one coaching, CV makeover, free workshops and more!
            </p>
            
            <Button variant="hero" size="hero">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;