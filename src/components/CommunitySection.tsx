import { useLanguage } from "@/contexts/LanguageContext";

const CommunitySection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background px-5 sm:px-6 md:px-12 lg:px-[100px] py-16 md:py-24">
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif" }}
        className="text-[32px] md:text-[48px] lg:text-[64px] font-medium text-foreground text-center mb-10 md:mb-16"
      >
        {t.community.heading}
      </h2>

      {/* Desktop 4-column masonry layout matching reference */}
      <div className="hidden lg:grid grid-cols-4 gap-4 auto-rows-[100px]">
        {/* Row 1-3: tall card */}
        <div className="row-span-3 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 1" className="w-full h-full object-cover" />
        </div>
        {/* Row 1-2: medium card */}
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 2" className="w-full h-full object-cover" />
        </div>
        {/* Row 1: short card */}
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 3" className="w-full h-full object-cover" />
        </div>
        {/* Row 1-2: medium card */}
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 4" className="w-full h-full object-cover" />
        </div>

        {/* Row 2-3: medium-tall card (col 3) */}
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 5" className="w-full h-full object-cover" />
        </div>

        {/* Row 3: short card (col 2) */}
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 6" className="w-full h-full object-cover" />
        </div>

        {/* Row 3-4: medium card (col 4) */}
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 7" className="w-full h-full object-cover" />
        </div>

        {/* Row 4: short cards */}
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 8" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 9" className="w-full h-full object-cover" />
        </div>

        {/* Row 4-5 */}
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 10" className="w-full h-full object-cover" />
        </div>

        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 11" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 12" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tablet 2-column layout */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 auto-rows-[140px]">
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 1" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 2" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 3" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 4" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-2 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 5" className="w-full h-full object-cover" />
        </div>
        <div className="row-span-1 rounded-2xl overflow-hidden bg-muted">
          <img src="/placeholder.svg" alt="Community 6" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Mobile 1-column layout */}
      <div className="grid md:hidden grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[200px] rounded-2xl overflow-hidden bg-muted">
            <img src="/placeholder.svg" alt={`Community ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
