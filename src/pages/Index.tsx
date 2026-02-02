import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ourProcessHeading from "@/assets/our-process-heading.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      
      {/* Our Process Heading - positioned between services and process section */}
      <div className="w-full px-5 md:px-8 lg:px-[100px] mt-[100px] md:mt-[180px] lg:mt-[250px] mb-[40px] md:mb-[60px] lg:mb-[80px] relative z-10">
        <img 
          src={ourProcessHeading} 
          alt="Our Process" 
          className="h-[40px] md:h-[72px] lg:h-[128px] w-auto"
        />
      </div>
      
      <ProcessSection />
    </div>
  );
};

export default Index;
