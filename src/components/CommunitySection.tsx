import { useLanguage } from "@/contexts/LanguageContext";

const placeholderImages = [
  { id: 1, span: "row-span-2", src: "/placeholder.svg" },
  { id: 2, span: "row-span-1", src: "/placeholder.svg" },
  { id: 3, span: "row-span-1", src: "/placeholder.svg" },
  { id: 4, span: "row-span-1", src: "/placeholder.svg" },
  { id: 5, span: "row-span-2", src: "/placeholder.svg" },
  { id: 6, span: "row-span-1", src: "/placeholder.svg" },
  { id: 7, span: "row-span-1", src: "/placeholder.svg" },
  { id: 8, span: "row-span-2", src: "/placeholder.svg" },
  { id: 9, span: "row-span-1", src: "/placeholder.svg" },
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
        {placeholderImages.map((image) => (
          <div
            key={image.id}
            className={`${image.span} rounded-2xl overflow-hidden bg-muted`}
          >
            <img
              src={image.src}
              alt={`Community event ${image.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
