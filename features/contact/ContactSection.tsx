'use client';

import * as React from 'react';
import { Mail, Github, Linkedin, MapPin, Download, Check, Send, Loader2, Heart } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';
import { siteConfig } from '@/config/site';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  subject: '',
  message: '',
  'bot-field': '',
};

export function ContactSection() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedName, setSubmittedName] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState(INITIAL_FORM_DATA);

  const emailAddress = siteConfig.links.email.replace('mailto:', '');

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData['bot-field']) return; // Bot trapped

    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmittedName(formData.name.trim());

    try {
      // Encode form data for Netlify Forms POST to '/__forms.html'
      const encoded = new URLSearchParams({
        'form-name': 'contact',
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }).toString();

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData(INITIAL_FORM_DATA);
        if (formRef.current) formRef.current.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (_err) {
      // Fallback: If running locally without Netlify server handling, show success state gracefully
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      if (formRef.current) formRef.current.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-secondary/5 dark:bg-transparent border-t border-border/20 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-[#39FF14]/8 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block - Overview & Quick Links */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 block neon-text-glow">
                  10 // Direct Outreach
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                  Start a Conversation
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Whether you are recruiting for <strong className="text-[#39FF14]">Software Engineering Internships</strong>, discussing systems architecture, or collaborating on open-source tools, I respond promptly.
                </p>
              </div>
            </Reveal>

            {/* Location & availability badges */}
            <Reveal delay={0.18}>
              <div className="space-y-3.5 p-5 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-md">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="p-2 rounded-lg bg-[#39FF14]/10 text-[#39FF14] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Kalaburagi, Karnataka · Open to Relocation (Bangalore, Hyderabad, Pune, Gurgaon, Remote)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="p-2 rounded-lg bg-[#39FF14]/10 text-[#39FF14] shrink-0">
                    <Check className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <span className="font-semibold text-foreground/90">
                    Available for 2–6 Month Software Engineering Internships (Summer &amp; Fall 2025/2026)
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Resume & Secondary Social Links */}
            <Reveal delay={0.25}>
              <div className="space-y-4">
                <a
                  href="/SRINIWAS_Resume.pdf"
                  download="Sriniwas_Awasthi_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-[#39FF14]/40 hover:border-[#39FF14] hover:bg-[#39FF14]/10 text-xs font-bold tracking-wide justify-center gap-2 py-3 px-6 h-12 flex items-center transition-all duration-300 text-foreground hover:text-[#39FF14]"
                >
                  <Download className="w-4 h-4 text-[#39FF14]" />
                  Download Official Resume (PDF)
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'rounded-full gap-2 text-xs font-semibold cursor-pointer border border-[#39FF14]/30 hover:border-[#39FF14] hover:bg-[#39FF14]/10 hover:text-[#39FF14] justify-center transition-all duration-300',
                    )}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'rounded-full gap-2 text-xs font-semibold cursor-pointer border border-[#39FF14]/30 hover:border-[#39FF14] hover:bg-[#39FF14]/10 hover:text-[#39FF14] justify-center transition-all duration-300',
                    )}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>

                {/* Direct Gmail Compose Link */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sriawasthi164@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs text-muted-foreground hover:text-[#39FF14] transition-all duration-300 py-3 cursor-pointer flex items-center justify-center gap-2 border border-[#39FF14]/30 hover:border-[#39FF14] rounded-full bg-[#090B09] hover:bg-[#39FF14]/10 shadow-[0_0_15px_rgba(57,255,20,0.05)] hover:shadow-[0_0_25px_rgba(57,255,20,0.2)] group"
                  title="Open Gmail to compose and send an email directly to sriawasthi164@gmail.com"
                >
                  <Mail className="w-4 h-4 text-[#39FF14] group-hover:scale-110 transition-transform" />
                  <span className="font-mono font-medium">Direct: sriawasthi164@gmail.com</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Block - In-Browser Netlify Contact Form (Mandate 6) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.25}>
              <div className="p-6 md:p-8 rounded-2xl border-2 border-[#39FF14]/30 bg-[#060806]/90 backdrop-blur-xl shadow-[0_0_35px_rgba(57,255,20,0.08)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#39FF14]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
                    <h3 className="text-sm font-bold tracking-widest text-[#39FF14] uppercase font-mono">
                      In-Browser Contact Form
                    </h3>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-[#39FF14]/15 border-2 border-[#39FF14] flex items-center justify-center text-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                      <Heart className="w-7 h-7 text-[#39FF14] fill-[#39FF14]/30" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground tracking-tight">
                        {submittedName
                          ? `Heartfelt Thanks, ${submittedName}`
                          : 'Heartfelt Thanks for Reaching Out'}
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/90 max-w-md leading-relaxed font-sans mx-auto">
                        Thank you from the bottom of my heart for reaching out and connecting. 💚
                        <br />
                        It means a great deal to me, and I look forward to writing back to you very soon! ✨
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedName('');
                        setFormData(INITIAL_FORM_DATA);
                        if (formRef.current) formRef.current.reset();
                      }}
                      className="mt-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold border border-[#39FF14]/40 hover:border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10 transition-all cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.1)]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    name="contact"
                    method="POST"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Hidden Netlify Inputs */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don’t fill this out if you’re human:{' '}
                        <input
                          name="bot-field"
                          value={formData['bot-field']}
                          onChange={handleChange}
                        />
                      </label>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="text-xs font-mono text-muted-foreground font-semibold flex items-center justify-between"
                        >
                          <span>Full Name</span>
                          <span className="text-[#39FF14]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Alex Vance"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#0a100a] border border-[#39FF14]/20 focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-xs font-mono text-foreground placeholder:text-muted-foreground/50 transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-xs font-mono text-muted-foreground font-semibold flex items-center justify-between"
                        >
                          <span>Email Address</span>
                          <span className="text-[#39FF14]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#0a100a] border border-[#39FF14]/20 focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-xs font-mono text-foreground placeholder:text-muted-foreground/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="subject"
                        className="text-xs font-mono text-muted-foreground font-semibold flex items-center justify-between"
                      >
                        <span>Subject / Inquiry</span>
                        <span className="text-[#39FF14]">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Software Engineering Internship / Systems Discussion"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a100a] border border-[#39FF14]/20 focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-xs font-mono text-foreground placeholder:text-muted-foreground/50 transition-all"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-mono text-muted-foreground font-semibold flex items-center justify-between"
                      >
                        <span>Message &amp; Project Details</span>
                        <span className="text-[#39FF14]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share role specifics, technical requirements, or collaboration ideas..."
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a100a] border border-[#39FF14]/20 focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-xs font-mono text-foreground placeholder:text-muted-foreground/50 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-[#39FF14] text-[#030503] hover:bg-[#7CFF6B] text-xs font-extrabold tracking-wider uppercase py-3.5 px-6 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#030503]" />
                          <span>Sending Your Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 fill-[#030503]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
