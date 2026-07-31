import React from 'react';

// Import real brand logos from src/assets/brand/
import agileExportsLogo from '../assets/brand/agileexports.png';
import appleVedaLogo from '../assets/brand/appleveda.png';
import designHouzzLogo from '../assets/brand/designHouzz.png';
import digitalPharmaLogo from '../assets/brand/digitalpharmapreneur.png';
import holiesticLogo from '../assets/brand/holiestic.png';
import triremeLogo from '../assets/brand/trireme.png';

export const BrandMarquee: React.FC = () => {
  const brandLogos = [
    { name: 'Trireme Life Science', logo: triremeLogo, tag: 'B2B Pharma' },
    { name: 'AgileExports India', logo: agileExportsLogo, tag: 'Global Export' },
    { name: 'Digital PharmaPreneur', logo: digitalPharmaLogo, tag: 'Pharma EdTech' },
    { name: 'Saksham Apple Veda', logo: appleVedaLogo, tag: 'Ayurveda Health' },
    { name: 'Design Houzz', logo: designHouzzLogo, tag: 'Interior & Architecture' },
    { name: 'Holistic Jeevandhara', logo: holiesticLogo, tag: 'Healthcare Portal' },
    { name: 'Binary Boss', logo: null, tag: 'Lead Dev Studio' },
    { name: 'GymFlow SaaS', logo: null, tag: '150+ Gyms Platform' },
  ];

  // Doubled array for continuous infinite ticker loop
  const marqueeItems = [...brandLogos, ...brandLogos];

  return (
    <div className="w-full bg-black/40 border-y border-white/10 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">

        {/* Left Fixed Label Matching Reference Image */}
        <div className="shrink-0 max-w-[160px] text-center md:text-left">
          <span className="text-xs font-heading font-extrabold text-zinc-300 tracking-tight leading-snug block">
            Trusted by Brands I've Helped Shape
          </span>
        </div>

        {/* Right Marquee Infinite Scrolling Container */}
        <div className="relative flex-1 overflow-hidden w-full">

          {/* Fade overlays on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-6 py-2">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300 group shrink-0"
              >
                {item.logo ? (
                  <div className="h-8 w-auto min-w-[32px] max-w-[100px] flex items-center justify-center p-1 rounded-lg bg-white/90 group-hover:bg-white transition shadow-sm">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-heading font-bold text-xs">
                    {item.name.charAt(0)}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-xs font-heading font-bold text-zinc-200 group-hover:text-white tracking-wide whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 whitespace-nowrap">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
