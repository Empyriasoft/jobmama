import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      
      {/* Our Process Heading */}
      <div className="w-full px-5 md:px-8 lg:px-[100px] mt-[100px] md:mt-[180px] lg:mt-[250px] mb-[40px] md:mb-[60px] lg:mb-[80px] relative z-10 flex justify-center">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[40px] md:text-[72px] lg:text-[100px] xl:text-[128.7px] font-medium text-center break-words"
        >
          {t.process.sectionTitle}
        </h2>
      </div>
      
      <ProcessSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
