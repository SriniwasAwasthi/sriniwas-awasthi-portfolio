import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * Custom 404 — Not Found page.
 * Matches the portfolio's dark, branded visual language.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-6">
        {/* 404 code */}
        <p className="text-xs font-bold tracking-widest text-primary uppercase font-mono">
          404 // Not Found
        </p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-heading font-extrabold tracking-tight text-foreground">
          Page not found.
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          The route you&apos;re looking for doesn&apos;t exist. It may have been moved, renamed, or
          never existed. Let&apos;s get you back to somewhere useful.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold tracking-wide shadow-md shadow-primary/10',
            )}
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Portfolio
          </Link>
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'rounded-full text-sm font-semibold tracking-wide hover:bg-accent',
            )}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Contact
          </Link>
        </div>

        {/* Footer tag */}
        <p className="text-[11px] font-mono text-muted-foreground/40 mt-4">
          Sriniwas Awasthi · sriniwas-awasthi-portfolio.netlify.app
        </p>
      </div>
    </div>
  );
}
