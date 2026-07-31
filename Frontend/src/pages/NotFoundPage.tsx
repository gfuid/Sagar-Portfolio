import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  Home as HomeIcon,
  SlidersHorizontal,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import RosePetalsCanvas from '../components/RosePetalsCanvas';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070709] text-white font-sans selection:bg-rose-600 selection:text-white flex flex-col justify-between select-none">
      {/* Dynamic Floating Rose Petals Layer */}
      <RosePetalsCanvas />

      {/* Background Graphic & Vignetting Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* B&W Gothic Crowned Queen Image */}
        <div className="absolute top-0 left-0 w-full md:w-3/5 h-full opacity-60 md:opacity-75 mix-blend-luminosity grayscale">
          <img
            src="/gothic_queen_404.png"
            alt="Gothic crowned queen holding peony"
            className="w-full h-full object-cover object-left-top filter contrast-125 brightness-90"
          />
        </div>

        {/* Cinematic Radial Vignette & Blending Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-[#070709]/70 to-[#070709]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#070709_90%)]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6 w-full">
        {/* Left: Hamburger Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer group flex items-center gap-2"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6 stroke-[1.5] group-hover:scale-110 transition-transform" />
        </button>

        {/* Center: Brand Logo & Tagline */}
        <div
          onClick={() => navigate('/')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-widest font-bold text-white group-hover:text-rose-200 transition-colors">
            B&Y
          </h1>
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-zinc-400 font-medium uppercase mt-0.5">
            YOUR • GOAL • TOGETHER
          </span>
        </div>

        {/* Right: Search, User, Bag Icons */}
        <div className="flex items-center gap-4 sm:gap-6 text-zinc-300">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 hover:text-white transition-colors cursor-pointer group"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/about')}
            className="p-1.5 hover:text-white transition-colors cursor-pointer group"
            aria-label="User Profile"
          >
            <User className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="p-1.5 hover:text-white transition-colors cursor-pointer group relative"
            aria-label="Bag / Projects"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
          </button>
        </div>
      </header>

      {/* MAIN 404 CONTENT HERO SECTION */}
      <main className="relative z-20 flex-grow flex items-center justify-center px-4 py-8">
        {/* Left Side Marker: BACK */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center gap-3 text-zinc-400 text-xs tracking-[0.25em] uppercase font-mono">
          <div className="w-8 h-[1px] bg-zinc-600" />
          <button
            onClick={() => navigate(-1)}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK
          </button>
        </div>

        {/* CENTER COMPOSITION: 404 + BACK HOME BUTTON + PAGE NOT FOUND VERTICAL TEXT */}
        <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto">
          {/* Main Container */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center">
            {/* OVERLAPPING "BACK HOME" OUTLINED BUTTON */}
            <div className="z-30 mb-4 sm:mb-0 sm:absolute sm:top-[12%] sm:right-[18%] md:right-[22%] lg:right-[26%]">
              <button
                onClick={() => navigate('/')}
                className="group relative inline-flex items-center justify-center border border-white/90 bg-black/40 hover:bg-white text-white hover:text-black px-8 py-3 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase transition-all duration-300 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer"
              >
                BACK HOME
              </button>
            </div>

            {/* GIANT "404" NUMBERS WITH 3D DEPTH */}
            <div className="relative select-none text-center">
              <span className="font-sans font-black text-[9rem] sm:text-[14rem] md:text-[19rem] lg:text-[23rem] leading-none tracking-tight text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-95">
                404
              </span>
              {/* Subtle back stroke glow for 3D outline realism */}
              <span
                aria-hidden="true"
                className="absolute inset-0 font-sans font-black text-[9rem] sm:text-[14rem] md:text-[19rem] lg:text-[23rem] leading-none tracking-tight text-transparent border-text pointer-events-none -z-10 blur-[1px] opacity-20"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)',
                }}
              >
                404
              </span>
            </div>

            {/* VERTICAL ROTATED TEXT: PAGE NOT FOUND */}
            <div className="sm:ml-4 mt-4 sm:mt-0 flex items-center">
              <div className="sm:[writing-mode:vertical-rl] sm:rotate-180 text-zinc-300 text-xs sm:text-sm md:text-base tracking-[0.35em] font-sans uppercase font-medium whitespace-nowrap opacity-90 border-t sm:border-t-0 sm:border-l border-zinc-700/80 pt-2 sm:pt-0 sm:pl-4">
                PAGE NOT FOUND
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Marker: HOME */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 text-zinc-400 text-xs tracking-[0.25em] uppercase font-mono">
          <button
            onClick={() => navigate('/')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            HOME <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="w-8 h-[1px] bg-zinc-600" />
        </div>
      </main>

      {/* BOTTOM FOOTER BAR */}
      <footer className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6 w-full text-zinc-400">
        {/* Left: Home & Filter Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Home"
          >
            <HomeIcon className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Controls / Filter"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-4 text-xs tracking-wider">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-label="Twitter"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-label="Facebook"
            >
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-label="Instagram"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* SLIDE-OUT NAVIGATION MENU DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-zinc-950 border-r border-zinc-800 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <span className="font-serif text-2xl font-bold">B&Y</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-6 text-lg tracking-wider font-light">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                  className="text-left hover:text-rose-400 transition-colors"
                >
                  HOME
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/about');
                  }}
                  className="text-left hover:text-rose-400 transition-colors"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/projects');
                  }}
                  className="text-left hover:text-rose-400 transition-colors"
                >
                  PROJECTS
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/experience');
                  }}
                  className="text-left hover:text-rose-400 transition-colors"
                >
                  EXPERIENCE
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/contact');
                  }}
                  className="text-left hover:text-rose-400 transition-colors"
                >
                  CONTACT
                </button>
              </nav>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              © {new Date().getFullYear()} B&Y PORTFOLIO
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-lg"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-sm font-semibold tracking-widest text-zinc-300 uppercase">
                Search Portfolio
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type your search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-grow bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:outline-hidden focus:border-rose-500 text-sm"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold px-4 py-2 rounded text-sm hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
