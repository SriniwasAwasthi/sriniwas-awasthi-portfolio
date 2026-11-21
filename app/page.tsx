import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/features/hero/Hero';
import { InteractiveBackground } from '@/components/animations/InteractiveBackground';
import { DynamicSections } from '@/components/DynamicSections';

/**
 * Home page — Server Component.
 *
 * Renders the above-fold content (Navbar, Background, Hero) statically,
 * then delegates all below-fold sections to <DynamicSections /> which
 * is a Client Component that lazy-loads each section with ssr:false
 * and isolates each behind an ErrorBoundary.
 */
export default function Home() {
  return (
    <>
      {/* 3D Particle Background */}
      <InteractiveBackground />

      {/* Global Navigation */}
      <Navbar />

      {/* Main experience */}
      <main id="main-content" className="flex flex-col w-full min-h-screen overflow-x-hidden">
        {/* Above the fold — static / SSR */}
        <Hero />

        {/* Below the fold — client-side lazy loaded + error isolated */}
        <DynamicSections />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
