import ServiceCard from "@/components/ServiceCard";

export interface ServiceFeature {
  heading: string;
  description: string;
}

interface ServiceTier {
  title: string;
  price: string;
  period: string;
  features: ServiceFeature[];
  isPopular?: boolean;
  bookingUrl: string;
}

const serviceTiers: ServiceTier[] = [
  {
    title: "Essential Starter",
    price: "€199",
    period: "one-time",
    features: [
      {
        heading: "1-on-1 coaching session",
        description: "To define your goals, uncover your unique strengths, and address your concerns."
      },
      {
        heading: "Personalized action plan",
        description: "A clear, step-by-step guide tailored to your successful journey back to being a working mom."
      },
      {
        heading: "Complete resume overhaul",
        description: "Modern formatting and a fresh perspective on your professional experience."
      },
      {
        heading: "Optimized CV",
        description: "Industry-specific keywords to ensure your expertise is immediately visible to employers."
      }
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min"
  },
  {
    title: "Signature 4-Step Transformation Package",
    price: "€399",
    period: "one-time",
    features: [
      {
        heading: "Career Mapping & Goal Setting",
        description: "Align Your Expertise with Your Current Life Goals."
      },
      {
        heading: "High-Impact CV Overhaul",
        description: "A total resume transformation that bridges career gaps and showcases your potential to recruiters."
      },
      {
        heading: "LinkedIn Profile Booster",
        description: "A full digital makeover and headline optimization."
      },
      {
        heading: "Strategic Market Navigation",
        description: "Master the hunt by learning how to find the right companies."
      }
    ],
    isPopular: true,
    bookingUrl: "https://calendly.com/a-novakov89/30min"
  },
  {
    title: "Success Package: Total Confidence",
    price: "€599",
    period: "one-time",
    features: [
      {
        heading: "Interview Mastery",
        description: "A 1-on-1 mock interview to practice key questions and refine your professional pitch. Learn what to watch for during the meeting and how to spot \"green\" and \"red\" flags in a future employer."
      },
      {
        heading: "Maternity Gap Strategy",
        description: "Learn how to address your career break with poise and confidence."
      },
      {
        heading: "Job Offer Evaluation",
        description: "Expert help to review your contract or offer, identifying essential flexibility needs and terms."
      },
      {
        heading: "Salary & Benefit Negotiation",
        description: "A personalized strategy to help you state and negotiate your desired compensation and the social benefits."
      }
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min"
  },
  {
    title: "Corporate Solutions & HR Partnerships",
    price: "Custom",
    period: "contact us",
    features: [
      {
        heading: "Integration Workshops",
        description: "A collaborative session gathering returning employees and their team leads to align on business duties and the current state of work. We facilitate updates on business activities and assess the evolving skillset of the returner to ensure a productive re-entry."
      },
      {
        heading: "Parental Return-to-Work Coaching",
        description: "A series of 5 structured online sessions focusing on the emotional and professional transition of the employee. We cover HR policies, business updates, and consult on the employee's motivation and specific needs during their return."
      },
      {
        heading: "Targeted Talent Acquisition",
        description: "Promote your company's culture by posting \"mom-friendly\" job advertisements directly in our dedicated Facebook and LinkedIn community groups to reach qualified, resilient professionals."
      }
    ],
    bookingUrl: "https://calendly.com/a-novakov89/30min"
  }
];

const ServicesSection = () => {
  return (
    <section className="w-full px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-[100px] lg:pt-[150px] lg:pb-[100px]">
      {/* Section Title */}
      <h2
        style={{
          fontFamily: "'Google Sans', sans-serif",
          color: '#0D141C'
        }}
        className="text-[40px] md:text-[72px] lg:text-[128.7px] mb-10 md:mb-16 lg:mb-24 font-medium text-center"
      >
        Services
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
