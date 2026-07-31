import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent pt-12 pb-6 px-4 sm:px-6 lg:px-8 text-zinc-300 border-t border-white/10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION: 5-COLUMN LINK STRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12">
          {/* Column 1: Brand & Description (spans 2 grid columns on lg) */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <h2 className="font-sans font-black text-3xl tracking-tight text-white uppercase">
              SAGAR
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-sm">
              Sagar is a full-stack engineer & creative developer specializing in modern web applications, mobile solutions, and automated workflows.
            </p>
          </div>

          {/* Column 2: Quick link */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Quick link
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <Link to="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-400 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-400 transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-400 transition-colors">
                  License
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <Link to="/experience" className="hover:text-red-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-red-400 transition-colors">
                  Service details
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-400 transition-colors">
                  Project details
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Others */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Others
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <Link to="/achievements" className="hover:text-red-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/automation" className="hover:text-red-400 transition-colors">
                  Automation
                </Link>
              </li>
              <li>
                <Link to="/404" className="hover:text-red-400 transition-colors">
                  404 Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Social */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Social
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* MIDDLE COPYRIGHT ROW */}
        <div className="border-t border-white/10 pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-light">
          <p>©{new Date().getFullYear()} Sagar All rights reserved.</p>
          <p>Design by Sagar - Powered by React & Vite</p>
        </div>

        {/* BOTTOM MASSIVE GIANT SAGAR TEXT ANIMATION MATCHING HERO IMAGE CRIMSON THEME */}
        <div className="w-full pt-4 flex items-center justify-center overflow-hidden pointer-events-auto group">
          <h1 className="font-sans font-black text-[12vw] sm:text-[14vw] md:text-[16vw] leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-500/90 via-rose-600/60 to-transparent group-hover:from-red-400 group-hover:via-orange-500/70 transition-all duration-700 transform hover:scale-[1.02] cursor-default drop-shadow-[0_10px_40px_rgba(225,29,72,0.3)]">
            SAGAR
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
