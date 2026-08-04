import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GEIST = '"Geist Mono:SemiBold", monospace';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4';

/* ─── SVG Mark (pixel symbol) ─── */
const LogoMark: React.FC = () => (
  <svg
    width="42"
    height="30"
    viewBox="0 0 54 40"
    fill="none"
    aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <path d="M38 0H26V12H38V0Z" fill="white" />
    <path d="M54 12H38V28H54V12Z" fill="white" />
    <path d="M38 28H26V40H38V28Z" fill="white" />
    <path d="M26 12H16V22H26V12Z" fill="white" />
    <path d="M16 22H8V30H16V22Z" fill="white" />
    <path d="M16 2H6V12H16V2Z" fill="white" />
    <path d="M6 12H0V18H6V12Z" fill="white" />
  </svg>
);

export const NotFoundPage: React.FC = () => {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100svh',
        width: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
        overflowY: 'auto',
        color: '#fff',
      }}
    >
      {/* ─── Background Video ─── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          zIndex: 0,
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ─── Header Logo — Sagar Brand ─── */}
      <Link
        to="/"
        aria-label="Sagar — Back to Home"
        style={{
          position: 'absolute',
          top: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
        }}
        className="logo-header group"
      >
        <LogoMark />
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
          Sagar
        </span>
      </Link>

      {/* ─── Centered 404 Content ─── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '483px',
          maxWidth: 'calc(100% - 40px)',
        }}
        className="content-404"
      >
        {/* 404 Heading */}
        <h1
          style={{
            fontFamily: GEIST,
            fontSize: '295.751px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-24.6459px',
            margin: 0,
            paddingBottom: '12px',
            height: 'auto',
            minHeight: 0,
            background:
              'linear-gradient(247.33deg, rgb(255, 255, 255) 2.53%, rgba(255, 255, 255, 0.4) 93.61%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
          className="heading-404"
        >
          404
        </h1>

        {/* Divider */}
        <div
          style={{
            width: '425px',
            maxWidth: '100%',
            height: '1px',
            backgroundColor: '#fff',
            marginTop: '36px',
            flexShrink: 0,
          }}
          className="divider-404"
        />

        {/* Message */}
        <p
          style={{
            fontFamily: GEIST,
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            color: '#fff',
            margin: 0,
            marginTop: '36px',
          }}
          className="message-404"
        >
          The path may be broken, but the journey isn't. Let's get you back.
        </p>

        {/* ─── Back to Home CTA Button ─── */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Back to Home Page</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ─── Responsive Mobile Styles ─── */}
      <style>{`
        @media (max-width: 640px) {
          .logo-header {
            top: 28px !important;
          }

          .content-404 {
            width: min(100% - 40px, 360px) !important;
            gap: 0 !important;
          }

          .heading-404 {
            font-size: clamp(140px, 52vw, 200px) !important;
            letter-spacing: -0.09em !important;
            height: auto !important;
            min-height: 0 !important;
          }

          .divider-404 {
            width: 100% !important;
            margin-top: 24px !important;
          }

          .message-404 {
            font-size: clamp(16px, 4.5vw, 20px) !important;
            letter-spacing: -1.3px !important;
            margin-top: 24px !important;
          }
        }
      `}</style>
    </main>
  );
};

export default NotFoundPage;
