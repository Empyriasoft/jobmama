import { useState, useEffect } from "react";
import { Check, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ServiceFeature } from "@/components/ServicesSection";

interface ServiceCardProps {
  title: string;
  price?: string;
  period?: string;
  features: ServiceFeature[];
  isPopular?: boolean;
  bookingUrl?: string;
}

interface FeatureItemProps {
  feature: ServiceFeature;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const FeatureItem = ({ feature, isExpanded = false, onToggle }: FeatureItemProps) => {
  const isMobile = useIsMobile();
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  
  // Close tooltip on scroll (desktop only)
  useEffect(() => {
    if (!isHoverOpen || isMobile) return;
    
    const handleScroll = () => setIsHoverOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHoverOpen, isMobile]);

  // Mobile: inline expand/collapse
  if (isMobile) {
    return (
      <div className="flex-1">
        <button
          onClick={onToggle}
          style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
          className="text-sm cursor-pointer inline-flex items-center gap-1.5 text-left"
        >
          {feature.heading}
          <ChevronDown 
            className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <p 
            style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
            className="text-sm leading-relaxed opacity-80 pl-0"
          >
            {feature.description}
          </p>
        </div>
      </div>
    );
  }

  // Desktop: hover card tooltip
  const triggerContent = (
    <span 
      style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
      className="text-sm md:text-base cursor-pointer hover:underline underline-offset-2 inline-flex items-center gap-1.5"
    >
      {feature.heading}
      <Info className="w-3.5 h-3.5 opacity-60" />
    </span>
  );

  return (
    <HoverCard open={isHoverOpen} onOpenChange={setIsHoverOpen} openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        {triggerContent}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-72 p-4 rounded-2xl border-0 shadow-lg"
        style={{ backgroundColor: '#ececec', color: '#0D141C' }}
        side="top"
        sideOffset={8}
      >
        <p 
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-sm leading-relaxed"
        >
          {feature.description}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

const ServiceCard = ({ title, price, period, features, isPopular = false, bookingUrl }: ServiceCardProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleFeature = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
      {/* Title */}
      <h3 
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-xl md:text-2xl font-medium mb-6"
      >
        {title}
      </h3>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D141C' }} />
            <FeatureItem 
              feature={feature} 
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggleFeature(index)}
            />
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
        Schedule Call
      </Button>
    </div>
  );
};

export default ServiceCard;
