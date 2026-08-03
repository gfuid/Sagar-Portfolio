import React, { useState, useEffect, useRef } from 'react';
import { Flame, GitCommit } from 'lucide-react';

export const GithubContributionsCard: React.FC = () => {
  const [grid, setGrid] = useState<Array<{ count: number; level: number; date: string }>>([]);
  const [hoveredSquare, setHoveredSquare] = useState<{
    count: number;
    date: string;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Generate 26 weeks x 7 days grid (182 contribution days)
  useEffect(() => {
    const days = 182;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const generated = [];

    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);

      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const count = Math.random() > 0.3 ? Math.floor(Math.random() * (isWeekend ? 6 : 16)) : 0;
      
      let level = 0;
      if (count > 0 && count <= 3) level = 1;
      else if (count > 3 && count <= 7) level = 2;
      else if (count > 7 && count <= 11) level = 3;
      else if (count > 11) level = 4;

      const dateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      generated.push({ count, level, date: dateStr });
    }
    setGrid(generated);
  }, []);

  // AUTOMATIC SCANNER & AUTO-SCROLL LOOP ("auto chle")
  useEffect(() => {
    if (grid.length === 0 || isMouseOver) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % grid.length;

        // Auto-scroll the container smoothly as the scanner advances
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          const scrollTarget = (next / grid.length) * maxScroll;
          container.scrollTo({
            left: scrollTarget,
            behavior: 'smooth',
          });
        }

        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [grid.length, isMouseOver]);

  const activeItem = grid[activeIndex] || null;
  const currentDisplay = hoveredSquare || (activeItem ? { count: activeItem.count, date: activeItem.date } : null);

  const getLevelColor = (level: number, isCurrentActive: boolean) => {
    if (isCurrentActive) {
      return 'bg-emerald-300 border-white scale-125 z-20 shadow-[0_0_16px_rgba(52,211,153,1)] animate-pulse';
    }
    switch (level) {
      case 0:
        return 'bg-zinc-800/60 border-zinc-700/30';
      case 1:
        return 'bg-emerald-950/80 border-emerald-800/40 text-emerald-300';
      case 2:
        return 'bg-emerald-700/80 border-emerald-600/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
      case 3:
        return 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 4:
        return 'bg-emerald-300 border-white shadow-[0_0_14px_rgba(16,185,129,0.8)]';
      default:
        return 'bg-zinc-800/60 border-zinc-700/30';
    }
  };

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => {
        setIsMouseOver(false);
        setHoveredSquare(null);
      }}
      className="relative w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 text-white shadow-2xl border border-zinc-800/90 transition-all duration-500 hover:border-emerald-500/50 select-none"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
              GITHUB CONTRIBUTIONS
            </h4>
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> AUTO SCANNING
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-2xl sm:text-3xl font-black font-heading text-white">
              748+ Commits
            </span>
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
              <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400 animate-bounce" /> 14 Day Streak
            </span>
          </div>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors shadow-lg"
          aria-label="GitHub Profile"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* AUTO-SCROLLING HEATMAP GRID (NO VISIBLE SCROLLBAR ON ANY BROWSER) */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto pb-1 scroll-smooth [&&::-webkit-scrollbar]:hidden [ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[540px]">
          {grid.map((item, idx) => {
            const isCurrentActive = idx === activeIndex && !hoveredSquare;
            return (
              <div
                key={idx}
                onMouseEnter={() =>
                  setHoveredSquare({ count: item.count, date: item.date })
                }
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs border transition-all duration-200 hover:scale-125 cursor-pointer ${getLevelColor(
                  item.level,
                  isCurrentActive
                )}`}
              />
            );
          })}
        </div>
      </div>

      {/* DYNAMIC LIVE TOOLTIP & DATE LABELS */}
      <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>May '24</span>
        <div className="h-6 flex items-center">
          {currentDisplay ? (
            <span className="text-[11px] font-mono font-semibold text-emerald-300 flex items-center gap-2 bg-zinc-950 px-3.5 py-1 rounded-full border border-emerald-500/30 shadow-lg">
              <GitCommit className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
              <strong>{currentDisplay.count} contributions</strong> on{' '}
              {currentDisplay.date}
            </span>
          ) : (
            <span className="text-[11px] text-zinc-400 font-mono">
              Live contributions activity
            </span>
          )}
        </div>
        <span>Nov '24</span>
      </div>
    </div>
  );
};

export default GithubContributionsCard;
