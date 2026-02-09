import { useState } from "react";
import aboutHeartImage from "@/assets/about-heart-image.png";
import aboutPurposeImage from "@/assets/about-purpose-image.png";
import aboutMissionVisionImage from "@/assets/about-mission-vision.png";
import aboutSolutionImage from "@/assets/about-solution-image.png";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

type ValueKey = "empathy" | "determination" | "change" | "confidence";

const valueKeys: ValueKey[] = ["empathy", "determination", "change", "confidence"];

const valueImages: Record<ValueKey, string> = {
  empathy: aboutHeartImage,
  determination: aboutPurposeImage,
  change: aboutMissionVisionImage,
  confidence: aboutSolutionImage,
};

// Mobile Card Component
const MobileAboutCard = ({ valueKey }: { valueKey: ValueKey }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const content = t.about.values[valueKey];
  
  return (
    <div 
      className="relative overflow-hidden rounded-[24px] w-full flex flex-col"
      style={{ backgroundColor: '#ececec' }}
    >
      <div className="p-5 pb-0">
        <img 
          src={valueImages[valueKey]}
          alt=""
          className="w-[180px] h-[102px] object-contain"
        />
      </div>

      <div className="p-5 pt-4 flex flex-col gap-3">
        <h3
          style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em' }}
          className="text-[24px] font-medium leading-[1.1] text-foreground"
        >
          {content.title}
        </h3>
        
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className={`text-[14px] leading-[1.5] font-light text-foreground/90 whitespace-pre-line ${
            expanded ? '' : 'line-clamp-5'
          }`}
        >
          {content.description}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-foreground font-medium text-[14px] mt-2 self-start hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {expanded ? t.about.showLess : t.about.readMore} 
          <span className="text-lg">{expanded ? '\u2191' : '\u2192'}</span>
        </button>
      </div>
    </div>
  );
};

// Desktop Card Component — flex layout to prevent text/image overlap
const DesktopAboutCard = ({ activeValue }: { activeValue: ValueKey }) => {
  const { t } = useLanguage();
  const content = t.about.values[activeValue];

  return (
    <div 
      className="overflow-hidden rounded-[40px] lg:rounded-[80px] min-h-[500px] md:min-h-[700px] lg:min-h-[800px] w-full flex flex-col"
      style={{ backgroundColor: '#ececec' }}
    >
      {/* Image area */}
      <div className="p-8 md:p-10 lg:px-[95px] lg:pt-[49px] lg:pb-0 shrink-0">
        <img 
          src={valueImages[activeValue]}
          alt=""
          className="w-[300px] h-[170px] md:w-[350px] md:h-[198px] lg:w-[671px] lg:h-[379px] object-contain"
        />
      </div>

      {/* Text area — grows to fill remaining space */}
      <div 
        key={activeValue}
        className="flex-1 flex flex-col justify-end p-8 md:p-10 lg:px-[95px] lg:pb-[108px] gap-4 lg:gap-[36px] animate-fade-in"
      >
        <h3
          style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
          className="text-[36px] md:text-[42px] lg:text-[75.88px] font-medium leading-[1.1]"
        >
          {content.title}
        </h3>
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
          className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5] lg:leading-[1.6] font-light opacity-90 whitespace-pre-line"
        >
          {content.description}
        </p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [activeValue, setActiveValue] = useState<ValueKey>("empathy");
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { t } = useLanguage();

  const values = valueKeys.map(key => ({ key, label: t.about.values[key].label }));

  // Mobile: Carousel Layout
  if (isMobile) {
    return (
      <section id="about" className="w-full pl-4 pr-0 pt-16 pb-12 overflow-hidden">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[36px] mb-8 font-medium text-center"
        >
          {t.about.sectionTitle}
        </h2>

        <Carousel
          opts={{ align: "start", containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent>
            {valueKeys.map((key) => (
              <CarouselItem key={key} className="basis-[85%]">
                <MobileAboutCard valueKey={key} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  // Tablet: Horizontal tabs above card
  if (isTablet) {
    return (
      <section id="about" className="w-full px-5 pt-20 pb-16 md:px-12 md:pt-[100px] md:pb-16">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[56px] mb-12 font-medium text-center"
        >
          {t.about.sectionTitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {values.map((value) => {
            const isActive = activeValue === value.key;
            return (
              <button
                key={value.key}
                onClick={() => setActiveValue(value.key)}
                className={`px-4 py-2 rounded-full text-[16px] font-medium transition-all min-h-[44px] ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                {value.label}
              </button>
            );
          })}
        </div>

        <DesktopAboutCard activeValue={activeValue} />
      </section>
    );
  }

  // Desktop
  return (
    <section id="about" className="w-full px-5 pt-20 pb-16 md:px-8 md:pt-[150px] md:pb-20 lg:px-[100px] lg:pt-[251px] lg:pb-[100px]">
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[40px] md:text-[72px] lg:text-[100px] xl:text-[128.7px] mb-12 md:mb-[100px] lg:mb-[196px] font-medium text-center break-words"
      >
        {t.about.sectionTitle}
      </h2>

      <div className="flex flex-col lg:flex-row lg:gap-16">
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:w-[400px] lg:shrink-0">
          {values.map((value, index) => {
            const isActive = activeValue === value.key;
            const isLast = index === values.length - 1;
            
            return (
              <div key={value.key} className="flex flex-col items-start">
                <button
                  onClick={() => setActiveValue(value.key)}
                  className="group relative text-left"
                >
                  <span
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                    className={`text-[32px] font-normal leading-[1.2] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    }`}
                  >
                    {value.label}
                  </span>
                </button>
                
                {isActive && (
                  <div className="h-[3px] w-[60px] bg-primary transition-all duration-300 mt-[80px] mb-[80px]" />
                )}
                
                {!isActive && !isLast && (
                  <div style={{ height: '80px' }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex-1">
          <DesktopAboutCard activeValue={activeValue} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
