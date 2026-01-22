import ServiceCard from "@/components/ServiceCard";
interface ServiceTier {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  bookingUrl: string;
}
const serviceTiers: ServiceTier[] = [{
  title: "01. Essential Starter",
  price: "",
  period: "",
  features: [
    "1-on-1 coaching session: To define your goals, uncover your unique strengths, and address your concerns.",
    "Personalized action plan: A clear, step-by-step guide tailored to your successful journey back to being a working mom.",
    "Complete resume overhaul: Modern formatting and a fresh perspective on your professional experience.",
    "Optimized CV: Industry-specific keywords to ensure your expertise is immediately visible to employers."
  ],
  bookingUrl: "https://calendly.com/a-novakov89/30min"
}, {
  title: "02. Signature 4-Step Transformation Package",
  price: "",
  period: "",
  features: [
    "Career Mapping & Goal Setting: Align Your Expertise with Your Current Life Goals.",
    "High-Impact CV Overhaul: A total resume transformation that bridges career gaps and showcases your potential to recruiters.",
    "LinkedIn Profile Booster: A full digital makeover and headline optimization.",
    "Strategic Market Navigation: Master the hunt by learning how to find the right companies."
  ],
  isPopular: true,
  bookingUrl: "https://calendly.com/a-novakov89/30min"
}, {
  title: "03. Success Package: Total Confidence",
  price: "",
  period: "",
  features: [
    "Interview Mastery: A 1-on-1 mock interview to practice key questions and refine your professional pitch. Learn what to watch for during the meeting and how to spot \"green\" and \"red\" flags in a future employer.",
    "Maternity Gap Strategy: Learn how to address your career break with poise and confidence.",
    "Job Offer Evaluation: Expert help to review your contract or offer, identifying essential flexibility needs and terms.",
    "Salary & Benefit Negotiation: A personalized strategy to help you state and negotiate your desired compensation and the social benefits."
  ],
  bookingUrl: "https://calendly.com/a-novakov89/30min"
}, {
  title: "04. Corporate Solutions & HR Partnerships",
  price: "",
  period: "",
  features: [
    "Integration Workshops: A collaborative session gathering returning employees and their team leads to align on business duties and the current state of work. We facilitate updates on business activities and assess the evolving skillset of the returner to ensure a productive re-entry.",
    "Parental Return-to-Work Coaching: A series of 5 structured online sessions focusing on the emotional and professional transition of the employee. We cover HR policies, business updates, and consult on the employee's motivation and specific needs during their return.",
    "Targeted Talent Acquisition: Promote your company's culture by posting \"mom-friendly\" job advertisements directly in our dedicated Facebook and LinkedIn community groups to reach qualified, resilient professionals."
  ],
  bookingUrl: "https://calendly.com/a-novakov89/30min"
}];
const ServicesSection = () => {
  return <section className="w-full px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-[100px] lg:pt-[150px] lg:pb-[100px]">
      {/* Section Title */}
      <h2 style={{
      fontFamily: "'Google Sans', sans-serif",
      color: '#0D141C'
    }} className="text-[40px] md:text-[72px] lg:text-[128.7px] mb-10 md:mb-16 lg:mb-24 font-medium text-center">Services</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {serviceTiers.map(tier => <ServiceCard key={tier.title} title={tier.title} price={tier.price} period={tier.period} features={tier.features} isPopular={tier.isPopular} bookingUrl={tier.bookingUrl} />)}
      </div>
    </section>;
};
export default ServicesSection;