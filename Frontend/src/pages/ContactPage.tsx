import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ArrowDown
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon } from '../components/SocialIcons';

/* ─── Asset URLs for Cursor Spotlight ─── */
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

/* ─── Reveal Layer (canvas mask spotlight) ─── */
interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const RevealLayer: React.FC<RevealLayerProps> = ({ image, cursorX, cursorY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  // Size canvas to viewport
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (c) {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Draw spotlight mask on every cursor move
  useEffect(() => {
    const c = canvasRef.current;
    const div = revealRef.current;
    if (!c || !div) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, c.width, c.height);

    if (cursorX < -500) return; // cursor not yet on section

    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataUrl = c.toDataURL();
    div.style.maskImage = `url(${dataUrl})`;
    div.style.webkitMaskImage = `url(${dataUrl})`;
    div.style.maskSize = '100% 100%';
    (div.style as unknown as Record<string, string>)['-webkit-mask-size'] = '100% 100%';
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          zIndex: 30,
        }}
      />
    </>
  );
};

/* ─── Main Contact Page ─── */
export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Smooth cursor tracking
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        mouseRef.current = { x: -999, y: -999 };
      }
    };

    const loop = () => {
      const m = mouseRef.current;
      const s = smoothRef.current;
      if (m.x < -500) {
        s.x = m.x;
        s.y = m.y;
      } else {
        s.x += (m.x - s.x) * 0.1;
        s.y += (m.y - s.y) * 0.1;
      }
      setCursorPos({ x: s.x, y: s.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  }, []);

  const handleCopyPhone = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-black font-sans">

      {/* ══════════════════════════════════════════════════════
          CURSOR SPOTLIGHT HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: '100dvh', fontFamily: "'Inter', sans-serif" }}
      >
        {/* Base image (z-10) with zoom animation */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})`, zIndex: 10 }}
        />

        {/* Reveal layer (z-30) — cursor spotlight */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Heading (z-50) */}
        <div className="absolute top-[22%] sm:top-[16%] left-0 right-0 flex flex-col items-center text-center px-4 pointer-events-none" style={{ zIndex: 50 }}>
          <h1 className="text-white leading-[0.95] drop-shadow-lg">
            <span
              className="block font-playfair italic font-normal text-4xl sm:text-6xl md:text-8xl hero-anim hero-reveal text-white drop-shadow-md tracking-tight"
              style={{ letterSpacing: '-0.04em', animationDelay: '0.25s' }}
            >
              Engineering
            </span>
            <span
              className="block font-normal text-4xl sm:text-6xl md:text-8xl -mt-1 hero-anim hero-reveal text-white drop-shadow-md tracking-tight"
              style={{ letterSpacing: '-0.06em', animationDelay: '0.42s', fontFamily: "'Inter', sans-serif" }}
            >
              Digital Growth
            </span>
          </h1>
        </div>

        {/* Bottom-left paragraph (z-50, hidden on mobile) */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] hero-anim hero-fade"
          style={{ zIndex: 50, animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/90 font-normal leading-relaxed drop-shadow-md">
            Building high-performance web applications, n8n automation pipelines, and custom software systems designed to scale your business.
          </p>
        </div>

        {/* Bottom-right block (z-50) */}
        <div
          className="absolute bottom-6 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-3 sm:gap-5 hero-anim hero-fade"
          style={{ zIndex: 50, animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed drop-shadow-md bg-black/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-3 sm:p-0 rounded-xl">
            Have a project or custom workflow requirement in mind? Reach out directly — let's build something extraordinary together.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full sm:w-auto justify-center bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 cursor-pointer flex items-center gap-2"
          >
            <span>Start Conversation</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT FORM & CHANNELS SECTION
          ══════════════════════════════════════════════════════ */}
      <section id="contact-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Quick Touch Card */}
            <div className="p-8 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-display font-extrabold text-white">Direct Channels</h3>

              <div className="space-y-4">

                {/* Email Button */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block font-medium">EMAIL</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-xs font-mono font-bold text-white hover:text-orange-400 transition truncate block">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Button */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block font-medium">PHONE / WHATSAPP</span>
                      <a href={`tel:${personalInfo.phone}`} className="text-xs font-mono font-bold text-white hover:text-orange-400 transition truncate block">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-medium">LOCATION</span>
                    <span className="text-xs font-mono font-bold text-white">{personalInfo.location}</span>
                  </div>
                </div>

              </div>

              {/* Social Shortcuts */}
              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-orange-500/50 transition font-medium"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-orange-500/50 transition font-medium"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-[2rem] bg-zinc-900/70 border border-zinc-800 shadow-xl space-y-6">

              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-white">Send a Direct Message</h3>
                <p className="text-xs text-zinc-400">Fill in your requirement details and Sagar will respond within 24 hours.</p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-zinc-300">Thank you for reaching out. Sagar will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400">YOUR EMAIL</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">PROJECT TYPE / SUBJECT</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Stack App / Mobile App / n8n Workflow..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">PROJECT DETAILS & REQUIREMENTS</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Describe your goals, timeline, and tech stack expectations..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-heading font-bold text-xs uppercase tracking-wider hover:scale-[1.01] transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;
