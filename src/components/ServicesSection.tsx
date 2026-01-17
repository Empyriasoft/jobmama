import ServiceCard from "@/components/ServiceCard";

interface ServiceTier {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  bookingUrl: string;
}

const serviceTiers: ServiceTier[] = [
  {
    title: "Basic",
    price: "$49",
    period: "/month",
    features: [
      "Resume review & feedback",
      "Access to job board",
      "Email support",
      "Career resource library",
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min",
  },
  {
    title: "Standard",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Basic",
      "2 coaching sessions/month",
      "Interview preparation",
      "LinkedIn profile optimization",
      "Priority email support",
    ],
    isPopular: true,
    bookingUrl: "https://calendly.com/a-novakov89/30min",
  },
  {
    title: "Premium",
    price: "$199",
    period: "/month",
    features: [
      "Everything in Standard",
      "Unlimited coaching sessions",
      "Personalized job search strategy",
      "Salary negotiation support",
      "Direct recruiter connections",
      "1-on-1 mentorship",
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min",
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Everything in Premium",
      "Dedicated account manager",
      "Custom integrations",
      "Team onboarding",
      "Priority 24/7 support",
      "Bulk hiring solutions",
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-[100px] lg:pt-[150px] lg:pb-[100px]">
      {/* Section Title */}
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[40px] md:text-[72px] lg:text-[128.7px] mb-10 md:mb-16 lg:mb-24 font-medium text-center"
      >
        Services & Products
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1600px] mx-auto">
        {serviceTiers.map((tier) => (
          <ServiceCard
            key={tier.title}
            title={tier.title}
            price={tier.price}
            period={tier.period}
            features={tier.features}
            isPopular={tier.isPopular}
            bookingUrl={tier.bookingUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
