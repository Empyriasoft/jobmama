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
      <div className="w-full px-5 md:px-8 lg:px-[100px] -mb-8 md:-mb-12 lg:-mb-16 relative z-10">
        <img 
          src={ourProcessHeading} 
          alt="Our Process" 
          className="w-full max-w-[800px] lg:max-w-[1200px] h-auto"
        />
      </div>
      
      <ProcessSection />
    </div>
  );
};

export default Index;
