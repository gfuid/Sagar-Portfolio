import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon } from '../components/SocialIcons';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-zinc-950 text-white selection:bg-orange-500 selection:text-black font-sans">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-4 h-4" /> Start Conversation
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
              Let's Connect & Build
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Have a web application, mobile app requirement, or automation workflow in mind? Reach out directly via email, phone, or the contact form below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">EMAIL</span>
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
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">PHONE / WHATSAPP</span>
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
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">LOCATION</span>
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
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-orange-500/50 transition"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-orange-500/50 transition"
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
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
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
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-heading font-bold text-xs uppercase tracking-wider hover:scale-[1.01] transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
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
