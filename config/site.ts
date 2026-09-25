export const siteConfig = {
  name: 'Sriniwas Awasthi',
  title: 'Sriniwas Awasthi — Full-Stack Software Engineer & AI Systems Developer',
  description:
    'Portfolio of Sriniwas Awasthi — 3rd Year Computer Science & Software Engineering Student at P.D.A College of Engineering (Kalaburagi), building modern web apps, Java DSA tools, and AI systems.',
  url: 'https://sriniwas-awasthi-portfolio.netlify.app',
  ogImage: 'https://sriniwas-awasthi-portfolio.netlify.app/og.png',
  links: {
    github: 'https://github.com/SriniwasAwasthi',
    linkedin: 'https://www.linkedin.com/in/sriniwas-awasthi/',
    email: 'mailto:sriawasthi164@gmail.com',
  },
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
