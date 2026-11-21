'use client';

import * as React from 'react';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Download,
  Check,
  Send,
  Loader2,
  Heart,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';
import { siteConfig } from '@/config/site';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [draftCopied, setDraftCopied] = React.useState(false);
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

  const directMailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    formData.subject.trim() || 'Software Engineering Inquiry'
  )}&body=${encodeURIComponent(
    `Hi Sriniwas,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
  )}`;

  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
    formData.subject.trim() || 'Software Engineering Inquiry'
  )}&body=${encodeURIComponent(
    `Hi Sriniwas,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
  )}`;

  const copyDraft = () => {
    const draftText = `To: ${emailAddress}\nSubject: ${formData.subject.trim()}\nFrom: ${formData.name.trim()} (${formData.email.trim()})\n\nMessage:\n${formData.message.trim()}`;
    navigator.clipboard.writeText(draftText);
    setDraftCopied(true);
    setTimeout(() => setDraftCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error once user resumes typing
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Immediate offline check for Wi-Fi / mobile data loss
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setErrorMessage("There is a network issue; I can't send the data.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmittedName(formData.name.trim());

    // 2. AbortController with 10-second timeout to catch slow network or Wi-Fi delay
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      // Encode form data with clean trimming for cross-device consistency
      const payload = new URLSearchParams({
        'form-name': 'contact',
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }).toString();

      // Dual-endpoint submission: Primary /__forms.html with fallback to /
      let res: Response | null = null;
      try {
        res = await fetch('/__forms.html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json, text/plain, */*',
          },
          body: payload,
          signal: controller.signal,
        });
      } catch (primaryErr: unknown) {
        if (primaryErr instanceof DOMException && primaryErr.name === 'AbortError') {
          throw primaryErr;
        }
        // Fallback to root path if /__forms.html fails on certain mobile CDNs
        res = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json, text/plain, */*',
          },
          body: payload,
          signal: controller.signal,
        });
      }

      clearTimeout(timeoutId);

      if (res && (res.ok || res.status === 200 || res.status === 302 || res.status === 303)) {
        setSubmitted(true);
        setErrorMessage(null);
        setFormData(INITIAL_FORM_DATA);
        if (formRef.current) formRef.current.reset();
      } else {
        throw new Error("There is a network issue; I can't send the data.");
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      setSubmitted(false);

      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMessage(
          "There is a network issue; I can't send the data. Request timed out due to network delay."
        );
      } else {
        setErrorMessage("There is a network issue; I can't send the data.");
      }
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
                    Available for 2–6 Month Software Engineering Internships (Summer &amp; Fall 2027)
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
                    action="/__forms.html"
                    data-netlify="true"
                    autoComplete="on"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Hidden Netlify Form Identity Input */}
                    <input type="hidden" name="form-name" value="contact" />

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

                    {/* Error Banner & Actionable Fallbacks */}
                    {errorMessage && (
                      <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-xs space-y-3 animate-fadeIn">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-semibold text-rose-300">Message Delivery Issue</p>
                            <p className="text-rose-200/90 leading-relaxed font-sans">
                              {errorMessage}
                            </p>
                          </div>
                        </div>

                        {/* Instant Fallback Options */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-500/20 font-mono text-[11px]">
                          <a
                            href={directGmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 text-rose-100 font-semibold transition-colors"
                            title="Open Gmail with your message pre-filled"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Open Pre-filled in Gmail</span>
                          </a>

                          <a
                            href={directMailtoUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground font-semibold transition-colors"
                            title="Open your default email client with your message pre-filled"
                          >
                            <Mail className="w-3 h-3 text-[#39FF14]" />
                            <span>Default Mail App</span>
                          </a>

                          <button
                            type="button"
                            onClick={copyDraft}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            title="Copy your message details to clipboard"
                          >
                            {draftCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Draft Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Draft Text</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

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
                      ) : errorMessage ? (
                        <>
                          <RefreshCw className="w-4 h-4 text-[#030503]" />
                          <span>Retry Sending Form</span>
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
