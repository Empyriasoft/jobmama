import { useLanguage } from "@/contexts/LanguageContext";
import communityCol2Middle from "@/assets/community-col2-middle.jpg";
import communityCol3Bottom from "@/assets/community-col3-bottom.png";
import communityCol1Bottom from "@/assets/community-col1-bottom.png";
import communityCol1Top from "@/assets/community-col1-top.png";
import communityCol2Top from "@/assets/community-col2-top.png";
import communityCol1Middle from "@/assets/community-col1-middle.png";
import communityCol2MiddleNew from "@/assets/community-col2-middle-new.png";
import communityCol2MiddleV2 from "@/assets/community-col2-middle-v2.png";
import communityCol2Bottom from "@/assets/community-col2-bottom.png";
import communityCol3Top from "@/assets/community-col3-top.png";

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

      {/* Desktop 3-column layout with exact pixel heights */}
      <div className="hidden lg:flex gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-[397px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Top} alt="Community conversation" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[551px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Middle} alt="Jenga game" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[237px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Bottom} alt="JobMama branding" className="w-full h-full object-cover object-center" />
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-[244px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Top} alt="Community group photo" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[551px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2MiddleV2} alt="JobMama presenter" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[383px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Bottom} alt="Community discussion" className="w-full h-full object-cover object-center" />
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-[154px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Top} alt="Jenga block with text" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[551px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Middle} alt="Community gathering" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[472px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Bottom} alt="Community members" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

      {/* Tablet 2-column layout */}
      <div className="hidden md:flex lg:hidden gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-[270px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Top} alt="Community conversation" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[380px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Middle} alt="Jenga game" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[170px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Bottom} alt="JobMama branding" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[260px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Bottom} alt="Community discussion" className="w-full h-full object-cover object-center" />
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-[170px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Top} alt="Community group photo" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[380px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2MiddleV2} alt="JobMama presenter" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[110px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Top} alt="Jenga block with text" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[380px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Middle} alt="Community gathering" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[330px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Bottom} alt="Community members" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

      {/* Mobile 2-column masonry layout */}
      <div className="flex md:hidden gap-3">
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-[160px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Top} alt="Community conversation" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[220px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Middle} alt="Jenga game" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[120px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol1Bottom} alt="JobMama branding" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[190px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Bottom} alt="Community discussion" className="w-full h-full object-cover object-center" />
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-[120px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Top} alt="Community group photo" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[220px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2MiddleV2} alt="JobMama presenter" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[80px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Top} alt="Jenga block with text" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[220px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol2Middle} alt="Community gathering" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-[190px] rounded-2xl overflow-hidden bg-muted">
            <img src={communityCol3Bottom} alt="Community members" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
