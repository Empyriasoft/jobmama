import { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ServiceFeature } from "@/components/ServicesSection";

interface ServiceCardProps {
  title: string;
  price: string;
  period: string;
  features: ServiceFeature[];
  isPopular?: boolean;
  bookingUrl?: string;
}

const FeatureItem = ({ feature }: { feature: ServiceFeature }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close tooltip on scroll
  useEffect(() => {
    if (!isOpen) return;
    
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);
  
  const triggerContent = (
    <span 
      style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
      className="text-sm md:text-base cursor-pointer hover:underline underline-offset-2 inline-flex items-center gap-1.5"
    >
      {feature.heading}
      <Info className="w-3.5 h-3.5 opacity-60" />
    </span>
  );

  const popoverContent = (
    <p 
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="text-sm leading-relaxed"
    >
      {feature.description}
    </p>
  );

  if (isMobile) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {triggerContent}
        </PopoverTrigger>
        <PopoverContent 
          className="w-72 p-4 rounded-2xl border-0 shadow-lg"
          style={{ backgroundColor: '#ececec', color: '#0D141C' }}
          side="top"
          sideOffset={8}
        >
          {popoverContent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen} openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        {triggerContent}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-72 p-4 rounded-2xl border-0 shadow-lg"
        style={{ backgroundColor: '#ececec', color: '#0D141C' }}
        side="top"
        sideOffset={8}
      >
        {popoverContent}
      </HoverCardContent>
    </HoverCard>
  );
};

const ServiceCard = ({ title, price, period, features, isPopular = false, bookingUrl }: ServiceCardProps) => {
  const handleBookClick = () => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="relative flex flex-col p-6 md:p-8 rounded-[40px] transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: '#00CEFF' }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: '#ececec', 
            color: '#0D141C',
            fontFamily: "'Google Sans', sans-serif"
          }}
        >
          Popular
        </div>
      )}

      {/* Title */}
      <h3 
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-xl md:text-2xl font-medium mb-4"
      >
        {title}
      </h3>

      {/* Price */}
      {(price || period) && (
        <div className="mb-6">
          <span 
            style={{ fontFamily: "'Google Sans', sans-serif", color: '#6B7280' }}
            className="text-3xl md:text-4xl font-medium"
          >
            {price}
          </span>
          <span 
            style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
            className="text-sm md:text-base opacity-70 ml-1"
          >
            {period}
          </span>
        </div>
      )}

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#6B7280' }} />
            <FeatureItem feature={feature} />
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        onClick={handleBookClick}
        className="w-full rounded-full py-3 text-base font-medium transition-colors duration-200"
        style={{ 
          backgroundColor: '#FFFFFF', 
          color: '#0D141C',
          fontFamily: "'Google Sans', sans-serif"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ececec';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
        }}
      >
        Book
      </Button>
    </div>
  );
};

export default ServiceCard;
