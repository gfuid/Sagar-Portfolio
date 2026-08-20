import React from 'react';

// Import real brand logos from src/assets/brand/
import agileExportsLogo from '../assets/brand/agileexports.png';
import appleVedaLogo from '../assets/brand/appleveda.png';
import designHouzzLogo from '../assets/brand/designHouzz.png';
import digitalPharmaLogo from '../assets/brand/digitalpharmapreneur.png';
import holiesticLogo from '../assets/brand/holiestic.png';
import triremeLogo from '../assets/brand/trireme.png';
import travelTradeLogo from '../assets/brand/traveltrade.png';
import innovationSochLogo from '../assets/brand/innovationsoch.png';

export const BrandMarquee: React.FC = () => {
  const brandLogos = [
    {
      name: 'Veda Group',
      logo: null,
      tag: 'Corporate Group',
      url: 'https://www.vedagroup.co.in/'
    },
    {
      name: 'Trireme Life Science',
      logo: triremeLogo,
      tag: 'B2B Pharma',
      url: 'https://triremegroup.in/'
    },
    {
      name: 'InnovationSoch',
      logo: innovationSochLogo,
      tag: 'Full Stack Startup',
      url: 'https://innovativesoch.com/'
    },
    {
      name: 'Travel Trade',
      logo: travelTradeLogo,
      tag: 'Media & Growth',
      url: 'https://travel-trade.co.in/'
    },
    {
      name: 'AgileExports India',
      logo: agileExportsLogo,
      tag: 'Global Export',
      url: 'https://agileexports.com/'
    },
    {
      name: 'Digital PharmaPreneur',
      logo: digitalPharmaLogo,
      tag: 'Pharma EdTech',
      url: 'https://digitalpharmapreneur.com/'
    },
    {
      name: 'Saksham Apple Veda',
      logo: appleVedaLogo,
      tag: 'Ayurveda Health',
      url: 'https://sakshamappleveda.com/'
    },
    {
      name: 'Design Houzz',
      logo: designHouzzLogo,
      tag: 'Interior & Architecture',
      url: 'https://designhouzz23.com/'
    },
    {
      name: 'Holistic Jeevandhara',
      logo: holiesticLogo,
      tag: 'Healthcare Portal',
      url: 'https://holisticjeevandharafoundation.in/'
    },
  ];

  // Tripled array for seamless infinite ticker loop across all screens
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div className="w-full bg-black/60 border-y border-red-500/20 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 select-none shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-10">

        {/* Left Fixed Label */}
        <div className="shrink-0 flex items-center gap-2.5 max-w-[190px] text-center md:text-left">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_#ef4444]" />
          </span>
          <span className="text-[11px] font-mono uppercase font-bold text-zinc-300 tracking-wider leading-snug block">
            Trusted by Brands I've Helped Shape
          </span>
        </div>

        {/* Right Marquee Infinite Scrolling Container */}
        <div className="relative flex-1 overflow-hidden w-full group">

          {/* Gradient fade overlays on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee group-hover:[animation-play-state:paused] flex items-center gap-5 py-2">
            {marqueeItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${item.name} (${item.url})`}
                className="flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-500/60 hover:bg-zinc-900/95 transition-all duration-300 group/card shrink-0 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:-translate-y-0.5 cursor-pointer no-underline"
              >
                {item.logo ? (
                  <div className="h-9 w-auto min-w-[36px] max-w-[110px] flex items-center justify-center p-1.5 rounded-xl bg-white/95 group-hover/card:bg-white transition-transform group-hover/card:scale-105 shadow-md">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 text-orange-400 font-heading font-black text-xs shadow-md group-hover/card:scale-105 transition-transform shrink-0">
                    {item.name.charAt(0)}
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-heading font-bold text-zinc-200 group-hover/card:text-white tracking-wide whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 group-hover/card:text-red-400 transition-colors font-mono">
                      ↗
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-red-400/90 whitespace-nowrap font-medium">
                    {item.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default BrandMarquee;
