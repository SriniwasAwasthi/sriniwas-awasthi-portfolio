'use client';

import * as React from 'react';
import { Mail, Github, Linkedin, MapPin, Download, Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';
import { siteConfig } from '@/config/site';
import BorderGlow from '@/components/ui/BorderGlow';

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  const emailAddress = siteConfig.links.email.replace('mailto:', '');
  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-secondary/5 dark:bg-transparent border-t border-border/20"
    >
      {/* Background radial glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-[#39FF14]/8 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block - Text & Location */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 block neon-text-glow">
                  11 // Contact
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I&apos;m currently open to{' '}
                  <strong className="font-semibold text-[#39FF14]">internship opportunities</strong>{' '}
                  and collaborative projects. If my work resonates with you, let&apos;s connect.
                </p>
              </div>
            </Reveal>

            {/* Location & availability badges */}
            <Reveal delay={0.18}>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 rounded-lg bg-[#39FF14]/10 text-[#39FF14] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Kalaburagi, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 rounded-lg bg-[#39FF14]/10 text-[#39FF14] shrink-0">
                    <Check className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <span className="font-semibold text-foreground/90">
                    Available for Summer Internships
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Block - Action Terminal */}
          <div className="lg:col-span-6">
            <Reveal delay={0.25}>
              <div className="p-6 md:p-8 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-md space-y-6 relative overflow-hidden shadow-[0_0_25px_rgba(57,255,20,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#39FF14]/5 to-transparent pointer-events-none" />

                <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase font-heading">
                  Quick Actions
                </h3>

                <div className="flex flex-col gap-4">
                  {/* Primary Email button - Clean pill without rectangular BorderGlow */}
                  <a
                    href={siteConfig.links.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full bg-[#39FF14] text-[#030503] hover:bg-[#7CFF6B] text-sm font-extrabold tracking-wide justify-center gap-2 cursor-pointer border-0 py-3 px-6 h-12 flex items-center shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 text-[#030503]" />
                    Send an Email
                  </a>

                  {/* Copy Email Helper */}
                  <button
                    onClick={copyEmail}
                    className="text-xs text-muted-foreground hover:text-[#39FF14] transition-all duration-200 py-1.5 cursor-pointer flex items-center justify-center gap-1.5 border border-[#39FF14]/20 hover:border-[#39FF14]/60 rounded-full bg-[#090B09]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#39FF14]" />
                        <span>Copied: {emailAddress}</span>
                      </>
                    ) : (
                      <span>Or copy: {emailAddress}</span>
                    )}
                  </button>

                  {/* Secondary Social Channels */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
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

                  {/* Resume Download */}
                  <BorderGlow
                    borderRadius={9999}
                    glowColor="320 80 80"
                    backgroundColor="transparent"
                    glowIntensity={1.0}
                    glowRadius={30}
                    colors={['#c084fc', '#f472b6', '#38bdf8']}
                  >
                    <a
                      href="/SRINIWAS_Resume.pdf"
                      download="Sriniwas_Awasthi_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' }),
                        'w-full rounded-full gap-2 justify-center text-xs font-semibold cursor-pointer hover:bg-accent border-0 bg-transparent py-3 px-6 h-12 flex items-center',
                      )}
                    >
                      <Download className="w-5 h-5 text-primary" />
                      Download Resume (PDF)
                    </a>
                  </BorderGlow>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
