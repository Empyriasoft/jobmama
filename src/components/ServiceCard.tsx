import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  bookingUrl?: string;
}

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
      <div className="mb-6">
        <span 
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
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

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div 
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: '#ececec' }}
            >
              <Check className="w-3 h-3" style={{ color: '#0D141C' }} />
            </div>
            <span 
              style={{ fontFamily: "'Inter', sans-serif", color: '#0D141C' }}
              className="text-sm md:text-base"
            >
              {feature}
            </span>
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
        Get Started
      </Button>
    </div>
  );
};

export default ServiceCard;
