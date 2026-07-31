import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Automation', path: '/automation' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo: Clean Bold SAGAR */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-red-400 transition-colors"
          >
            <span>Sagar</span>
          </Link>

          {/* Desktop Navigation Links - Fully Transparent Background */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-bold underline underline-offset-8 decoration-red-500 decoration-2'
                      : 'text-zinc-200 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA Button: White Pill with Crimson/Orange Arrow Circle */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className="group flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get in touch</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white group-hover:scale-110 transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 focus:outline-hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="relative lg:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/20 px-6 pt-4 pb-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold'
                      : 'text-zinc-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between bg-white text-zinc-950 font-bold px-5 py-3 rounded-full text-sm"
            >
              <span>Get in touch</span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
