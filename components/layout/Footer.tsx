'use client';

import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#39FF14]/20 bg-[#030503]/90 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Brand & Description */}
        <div className="flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
          <Link
            href="#home"
            className="font-heading font-bold text-lg text-foreground flex items-center gap-1.5"
          >
            <span className="bg-[#39FF14] text-[#030503] w-6.5 h-6.5 rounded flex items-center justify-center font-extrabold text-xs shadow-[0_0_12px_#39FF14]">
              SN
            </span>
            <span>
              <span className="text-white">Sri</span>
              <span className="text-[#39FF14] neon-text-glow">niwas</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
            Computer Science Engineering Student, Full Stack Developer, and AI Enthusiast.
          </p>
        </div>

        {/* Center/Right - Navigation Shortcuts & Socials */}
        <div className="flex flex-col items-center md:items-end gap-5">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-[#39FF14] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#39FF14] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#39FF14] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.email}
              className="text-muted-foreground hover:text-[#39FF14] transition-colors"
              aria-label="Email Sri Nivas"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Signature & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-[10px] sm:text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <span>Designed &amp; Engineered with</span>
              <Heart className="w-3.5 h-3.5 text-[#39FF14] fill-[#39FF14]" />
              <span>by Sriniwas</span>
            </div>
            <p suppressHydrationWarning>&copy; {currentYear} Sriniwas. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
