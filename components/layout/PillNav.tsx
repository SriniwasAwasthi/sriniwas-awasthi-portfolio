'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Menu, X, ArrowRight, FileText } from 'lucide-react';
import './PillNav.css';

interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PillNavProps {
  logo: ReactNode | string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  rightActions?: ReactNode;
}

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  rightActions,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLogoEnter = () => {
    // Disabled logo rotation/rollback animation on hover as requested
    return;
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.killTweensOf(menu);
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
        },
      );
    }
    onMobileMenuClick?.();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.killTweensOf(menu);
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { visibility: 'hidden' });
        },
      });
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMobileMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
  } as React.CSSProperties;

  const renderLogoContent = () => {
    if (typeof logo === 'string') {
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover" />
      );
    }
    return <div ref={logoImgRef as unknown as React.RefObject<HTMLDivElement | null>}>{logo}</div>;
  };

  return (
    <div className="pill-nav-container w-full">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {items?.[0] && isRouterLink(items[0].href) ? (
          <Link
            className="pill-logo"
            href={items[0].href}
            aria-label="Sriniwas Awasthi - Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el;
            }}
          >
            {renderLogoContent()}
          </Link>
        ) : (
          <a
            className="pill-logo"
            href={items?.[0]?.href || '#'}
            aria-label="Sriniwas Awasthi - Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el;
            }}
          >
            {renderLogoContent()}
          </a>
        )}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                {isRouterLink(item.href) ? (
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {rightActions && (
          <div className="pill-right-actions desktop-only flex items-center gap-3">
            {rightActions}
          </div>
        )}

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          ref={hamburgerRef}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-[#39FF14] transition-all duration-200" />
          ) : (
            <Menu className="w-5 h-5 text-[#39FF14] transition-all duration-200" />
          )}
        </button>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-menu-popover ${isMobileMenuOpen ? 'is-open' : ''}`}
        ref={mobileMenuRef}
      >
        <div className="mobile-menu-header">
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#39FF14] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            Navigation
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Menu
          </span>
        </div>

        <ul className="mobile-menu-list">
          {items.map((item, i) => {
            const isActive = activeHref === item.href;
            const itemLabel = item.label.toUpperCase();
            return (
              <li key={item.href || `mobile-item-${i}`}>
                {isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={`mobile-menu-link${isActive ? ' is-active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-[#39FF14]/70">
                        0{i + 1}
                      </span>
                      <span className="font-heading font-extrabold tracking-wider">{itemLabel}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
                    )}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`mobile-menu-link${isActive ? ' is-active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-[#39FF14]/70">
                        0{i + 1}
                      </span>
                      <span className="font-heading font-extrabold tracking-wider">{itemLabel}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
                    )}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Action CTAs */}
        <div className="mobile-menu-actions">
          <a
            href="/SRINIWAS_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Sriniwas_Awasthi_Resume.pdf"
            className="mobile-action-btn mobile-action-resume"
            onClick={closeMobileMenu}
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
          <a
            href="#contact"
            className="mobile-action-btn mobile-action-contact"
            onClick={closeMobileMenu}
          >
            Contact
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PillNav;
