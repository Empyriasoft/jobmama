import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import CommunitySection from "@/components/CommunitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import howWeWorkHeading from "@/assets/how-we-work-heading.png";

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO path="/" />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      
      {/* Our Process Heading */}
      <div className="w-full px-5 md:px-8 lg:px-[100px] mt-[100px] md:mt-[180px] lg:mt-[250px] mb-[40px] md:mb-[60px] lg:mb-[80px] relative z-10 flex justify-center">
        {language === "bg" ? (
          <img src={howWeWorkHeading} alt={t.process.sectionTitle} className="h-[40px] md:h-[72px] lg:h-[100px] xl:h-[130px] w-auto" />
        ) : (
          <h2
            style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
            className="text-[40px] md:text-[72px] lg:text-[100px] xl:text-[128.7px] font-medium text-center break-words"
          >
            {t.process.sectionTitle}
          </h2>
        )}
      </div>
      
      <ProcessSection />
      <CommunitySection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
