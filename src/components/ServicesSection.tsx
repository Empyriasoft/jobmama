import ServiceCard from "@/components/ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ServiceFeature {
  heading: string;
  description: string;
}

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="w-full px-5 sm:px-6 pt-16 pb-16 md:px-12 md:pt-24 md:pb-20 lg:px-[100px] lg:pt-[150px] lg:pb-[100px]">
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[40px] md:text-[72px] lg:text-[100px] xl:text-[128.7px] mb-10 md:mb-16 lg:mb-24 font-medium text-center break-words"
      >
        {t.services.sectionTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-6">
        {t.services.tiers.map((tier) => (
          <ServiceCard
            key={tier.title}
            title={tier.title}
            features={tier.features}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
