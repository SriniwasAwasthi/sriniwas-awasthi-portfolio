export const siteConfig = {
  name: 'Sriniwas Awasthi',
  title: 'Sriniwas Awasthi — Full-Stack Software Engineer | TypeScript, Java & Applied AI Workflows',
  description:
    'Portfolio of Sriniwas Awasthi — Computer Science & Software Engineering Student at P.D.A College of Engineering (Kalaburagi), building high-performance web systems, Java DSA tooling, and applied AI workflows.',
  url: 'https://sriniwas-awasthi-portfolio.netlify.app',
  ogImage: 'https://sriniwas-awasthi-portfolio.netlify.app/og.png',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || 'G-4K6M13FVMB',
  links: {
    github: 'https://github.com/SriniwasAwasthi',
    linkedin: 'https://www.linkedin.com/in/sriniwas-awasthi/',
    email: 'mailto:sriawasthi164@gmail.com',
  },
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
