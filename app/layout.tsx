import type { Metadata, Viewport } from 'next';
import { inter, outfit, caveat } from './fonts';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

/* ─────────────────────────────────────────────
   Viewport (separate export per Next.js 14+)
───────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#04040d' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* ─────────────────────────────────────────────
   Full Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  keywords: [
    'Sriniwas',
    'Sriniwas Awasthi',
    'Software Engineer Portfolio',
    'Computer Science Engineering',
    'Full Stack Developer',
    'AI Enthusiast',
    'Next.js Portfolio',
    'React Developer',
    'TypeScript Developer',
    'Java Developer',
    'Python Developer',
    'Bengaluru Developer',
    'PDA College of Engineering',
    'Student Portfolio',
    'AI Agents',
    'Web Development',
  ],

  authors: [{ name: 'Sriniwas', url: siteConfig.url }],
  creator: 'Sriniwas',
  publisher: 'Sriniwas',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Software Engineer & AI Enthusiast`,
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
    creator: '@srinivas_dev', // placeholder handle
  },

  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },

  category: 'technology',
};

/* ─────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        {/* Instant anchor navigation — overrides any CSS scroll-behavior */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                var el = e.target.closest('a[href^="#"]');
                if (!el) return;
                var hash = el.getAttribute('href');
                if (!hash || hash === '#') return;
                var target = document.getElementById(hash.slice(1));
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', hash);
              });
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen bg-background text-foreground">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
