import React from 'react';

interface CustomLoaderProps {
  progress: number;
}

export const CustomLoader: React.FC<CustomLoaderProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white selection:bg-red-500 overflow-hidden select-none">
      
      {/* Deep Crimson Ambient Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />

      {/* Center Display - Pure Bold SAGAR */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-7xl sm:text-9xl md:text-[170px] font-sans font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-rose-700 drop-shadow-[0_15px_40px_rgba(225,29,72,0.45)]">
          SAGAR
        </h1>

        {/* Minimal Crimson Progress Line */}
        <div className="w-48 sm:w-72 mt-8 space-y-2">
          <div className="w-full h-1 bg-zinc-900/90 border border-red-900/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(225,29,72,0.8)]" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center font-mono text-[11px] text-red-500/80 font-bold tracking-widest">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
