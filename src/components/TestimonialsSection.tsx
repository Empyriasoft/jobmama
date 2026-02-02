import { useIsMobile } from "@/hooks/use-mobile";

// Placeholder testimonial data - replace with real data/images later
const testimonials = [
  { id: 1, name: "Sarah M.", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" },
  { id: 2, name: "Emily R.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" },
  { id: 3, name: "Jessica L.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face" },
  { id: 4, name: "Amanda K.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face" },
  { id: 5, name: "Rachel T.", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face" },
  { id: 6, name: "Nicole P.", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face" },
  { id: 7, name: "Michelle D.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face" },
];

// Size map based on position: [0, 1, 2, 3(center), 4, 5, 6]
const sizeMap = [140, 191, 284, 392, 284, 191, 140];
const mobileSizeMap = [50, 68, 102, 140, 102, 68, 50];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  
  // Calculate total width and overlap needed
  const sizes = isMobile ? mobileSizeMap : sizeMap;
  const totalImageWidth = sizes.reduce((a, b) => a + b, 0); // 1622 for desktop
  const containerWidth = isMobile ? 428 : 1198;
  const overlapTotal = totalImageWidth - containerWidth;
  const overlapPerGap = overlapTotal / (testimonials.length - 1); // Divide among 6 gaps

  return (
    <section className="w-full px-5 md:px-8 lg:px-[100px] pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
      {/* Overlapping round images */}
      <div className="flex justify-center items-center mb-12 md:mb-16 lg:mb-20">
        <div 
          className="flex items-center justify-center"
          style={{ 
            maxWidth: containerWidth,
            height: isMobile ? 140 : 392,
          }}
        >
          {testimonials.map((testimonial, index) => {
            const size = sizes[index];
            const isCenter = index === 3;
            const distanceFromCenter = Math.abs(index - 3);
            
            return (
              <div
                key={testimonial.id}
                className="relative transition-transform duration-300 hover:scale-110 hover:z-20 flex-shrink-0"
                style={{
                  marginLeft: index === 0 ? 0 : -overlapPerGap,
                  zIndex: isCenter ? 10 : 7 - distanceFromCenter,
                }}
              >
                <div
                  className="rounded-full overflow-hidden bg-muted"
                  style={{
                    width: size,
                    height: size,
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials heading */}
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[32px] md:text-[48px] lg:text-[64px] font-medium text-center mb-6 md:mb-8 lg:mb-10"
      >
        Testimonials
      </h2>

      {/* Testimonial text */}
      <div className="max-w-3xl mx-auto text-center">
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] text-muted-foreground"
        >
          "JobMama completely transformed my approach to returning to work. After two years of being a stay-at-home mom, 
          I felt lost and unsure of my skills. The personalized coaching helped me regain my confidence, update my resume, 
          and land a role that perfectly fits my family's needs. I couldn't have done it without their support."
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[14px] md:text-[16px] font-medium text-foreground mt-6"
        >
          — Sarah M., Marketing Manager
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
