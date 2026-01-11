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
    <section className="px-4 pb-8 md:px-8 lg:px-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Gradient Overlay - softer for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 via-foreground/30 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 flex min-h-[580px] flex-col justify-end px-8 py-16 md:min-h-[650px] md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <h1 
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-hero md:text-5xl lg:text-[3.5rem]"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Back to Work, Bold & Confident
            </h1>
            
            <p 
              className="mb-10 max-w-md text-base leading-relaxed text-hero/80 md:text-lg"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Restart your career with one-to-one coaching, CV makeover, free workshops and more!
            </p>
            
            <Button variant="hero" size="hero">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
