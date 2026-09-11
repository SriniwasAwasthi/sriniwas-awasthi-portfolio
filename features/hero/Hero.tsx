'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Code2, Terminal, Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPresets } from '@/components/animations/MotionPresets';
import { siteConfig } from '@/config/site';
import DecryptedText from '@/components/animations/DecryptedText';

export function Hero() {
  const { slideUp, staggerContainer } = useMotionPresets();
  const [activeTab, setActiveTab] = React.useState<'profile' | 'tech'>('profile');
  const [copied, setCopied] = React.useState(false);
  const [publicReposCount, setPublicReposCount] = React.useState<number>(15);
  const [contributionsCount, setContributionsCount] = React.useState<number>(269);

  React.useEffect(() => {
    fetch('https://api.github.com/users/SriniwasAwasthi')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.public_repos === 'number') {
          setPublicReposCount(data.public_repos);
        }
      })
      .catch(() => {});

    fetch('https://github-contributions-api.jogruber.de/v4/SriniwasAwasthi?y=last')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let total = 0;
          if (data.total && typeof data.total.lastYear === 'number') {
            total = data.total.lastYear;
          }
          if (Array.isArray(data.contributions) && data.contributions.length > 0) {
            const sum = data.contributions.reduce((acc: number, item: { count?: number }) => acc + (item.count || 0), 0);
            if (sum > total) total = sum;
          }
          if (total > 0) {
            setContributionsCount(total);
          }
        }
      })
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    const emailAddress = siteConfig.links.email.replace('mailto:', '');
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10">
        {/* Left Side Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div variants={slideUp} className="mb-2 cursor-pointer">
            <DecryptedText
              text="Hey there!"
              animateOn="inViewHover"
              revealDirection="center"
              parentClassName="text-5xl sm:text-6xl md:text-7xl font-welcome text-[#5cff3d] block"
              className="text-[#5cff3d] font-bold neon-text-glow"
              encryptedClassName="text-[#5cff3d]/40"
              sequential
              speed={50}
            />
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            variants={slideUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#5cff3d]/30 bg-[#5cff3d]/10 text-xs font-semibold tracking-wide text-[#5cff3d] mb-6 shadow-[0_0_15px_rgba(92,255,61,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5cff3d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5cff3d]"></span>
            </span>
            Open to Internships
          </motion.div>

          {/* Greeting / Subtitle */}
          <motion.p
            variants={slideUp}
            className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 font-heading"
          >
            3rd Year CS &amp; Software Engineering Student · P.D.A College of Engineering, Kalaburagi
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            variants={slideUp}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 leading-none"
          >
            <span className="text-[#5cff3d] neon-text-glow">Sriniwas Awasthi</span>
          </motion.h1>

          {/* Supporting Headline */}
          <motion.h2
            variants={slideUp}
            className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground/80 mb-6"
          >
            Full-Stack Software Engineer &amp; AI Systems Developer
          </motion.h2>

          {/* Value Prop & Description */}
          <motion.p
            variants={slideUp}
            className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed"
          >
            Building 10+ modern web applications using Next.js 15, TypeScript, and Gemini AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
          >
            <Link
              href="#projects"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'w-full sm:w-auto rounded-full bg-[#39FF14] text-[#030503] hover:bg-[#7CFF6B] text-sm font-extrabold tracking-wide shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 cursor-pointer justify-center',
              )}
            >
              View My Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full sm:w-auto rounded-full text-sm font-semibold tracking-wide border border-[#39FF14]/30 hover:border-[#39FF14] hover:bg-[#39FF14]/10 hover:text-[#39FF14] transition-all duration-300 cursor-pointer justify-center backdrop-blur-md',
              )}
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={slideUp} className="flex items-center gap-5">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium border border-border/40 hover:border-border px-2.5 py-1.5 rounded-full cursor-pointer bg-background/30 backdrop-blur-sm"
              aria-label="Copy Email Address"
            >
              {copied ? (\
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (\
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side - Interactive IDE Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <div className="w-full max-w-md bg-card border border-border/80 rounded-xl overflow-hidden shadow-2xl relative group/card">
            {/* Visual glow frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-indigo-500/0 to-primary/5 opacity-50 pointer-events-none" />

            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/80">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Terminal className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>sriniwas-ide</span>
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* IDE Tabs */}
            <div className="flex bg-secondary/10 border-b border-border/80 text-xs font-mono relative">
              <button
                onClick={() => setActiveTab('profile')}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 border-r border-border/80 transition-colors cursor-pointer select-none ${
                  activeTab === 'profile'
                    ? 'bg-card text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-secondary/20'
                }`}
              >
                {activeTab === 'profile' && (
                  <motion.div
                    layoutId="activeHeroTabBorder"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Code2 className="w-3.5 h-3.5" />
                developer.ts
              </button>
              <button
                onClick={() => setActiveTab('tech')}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 border-r border-border/80 transition-colors cursor-pointer select-none ${
                  activeTab === 'tech'
                    ? 'bg-card text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-secondary/20'
                }`}
              >
                {activeTab === 'tech' && (
                  <motion.div
                    layoutId="activeHeroTabBorder"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Code2 className="w-3.5 h-3.5" />
                stack.json
              </button>
            </div>

            {/* Code Content Container */}
            <div className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-hidden min-h-[250px] bg-card/60 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeTab === 'profile' ? (
                    <pre className="text-foreground/90">
                      <code>
                        <span className="text-[#7CFF6B] font-bold">const</span>{' '}
                        <span className="text-[#39FF14]">developer</span> = &#123;{'\n'}
                        {'  '}name:{' '}
                        <span className="text-[#B7FFAE]">&quot;Sriniwas Awasthi&quot;</span>,{'\n'}
                        {'  '}role:{' '}
                        <span className="text-[#B7FFAE]">
                          &quot;Full-Stack Software Engineer &amp; AI Systems Developer&quot;
                        </span>
                        ,{'\n'}
                        {'  '}college:{' '}
                        <span className="text-[#B7FFAE]">
                          &quot;P.D.A College of Engineering, Kalaburagi&quot;
                        </span>
                        ,{'\n'}
                        {'  '}year:{' '}
                        <span className="text-[#B7FFAE]">
                          &quot;3rd Year CS &amp; Software Engineering Student&quot;
                        </span>
                        ,{'\n'}
                        {'  '}publicRepos: <span className="text-[#39FF14]">{publicReposCount}</span>,{'\n'}
                        {'  '}contributionsLastYear: <span className="text-[#39FF14]">{contributionsCount}</span>,
                        {'\n'}
                        {'  '}currentFocus:{' '}
                        <span className="text-[#B7FFAE]">
                          &quot;Next.js 15, TypeScript &amp; Gemini AI Systems&quot;
                        </span>
                        ,{'\n'}
                        {'  '}status:{' '}
                        <span className="text-[#B7FFAE]">&quot;Open to Internships&quot;</span>
                        {'\n'}&#125;;
                      </code>
                    </pre>
                  ) : (
                    <pre className="text-foreground/90">
                      <code>
                        &#123;{'\n'}
                        {'  '}
                        <span className="text-[#39FF14]">&quot;coreTechStack&quot;</span>: [{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">&quot;Next.js 15&quot;</span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;React&quot;</span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;TypeScript&quot;</span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;Tailwind CSS&quot;</span>,{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">&quot;Python&quot;</span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;REST APIs&quot;</span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;Gemini AI API&quot;</span>
                        {'\n'}
                        {'  '}],{'\n'}
                        {'  '}
                        <span className="text-[#39FF14]">&quot;softwareDevSkills&quot;</span>: [
                        {'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">
                          &quot;Full-Stack Architecture &amp; Database Schemas&quot;
                        </span>
                        ,{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">
                          &quot;Data Structures &amp; Object-Oriented Design&quot;
                        </span>
                        ,{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">
                          &quot;Git Workflows &amp; RESTful APIs&quot;
                        </span>
                        {'\n'}
                        {'  '}],{'\n'}
                        {'  '}
                        <span className="text-[#39FF14]">&quot;extraSkills&quot;</span>: [{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">
                          &quot;AI System Prompt Architecture&quot;
                        </span>,{' '}
                        <span className="text-[#B7FFAE]">&quot;3D Web &amp; Canvas Games&quot;</span>,{'\n'}
                        {'    '}
                        <span className="text-[#B7FFAE]">&quot;Rapid Full-Stack Prototyping&quot;</span>
                        {'\n'}
                        {'  '}]{'\n'}&#125;
                      </code>
                    </pre>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* IDE Footer */}
            <div className="px-4 py-2.5 bg-secondary/20 border-t border-border/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>UTF-8</span>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
