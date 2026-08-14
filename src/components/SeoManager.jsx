import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

const sectionOrder = ['hero', 'about', 'experience', 'skills', 'projects', 'certificates', 'books', 'contact'];

function setMeta(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function setJsonLd(data) {
  let script = document.head.querySelector('script[id="json-ld-person"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('id', 'json-ld-person');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function SeoManager() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    // 1. Update <html> language tag
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    // 2. Base site canonical URL
    const baseUrl = personalInfo.companyWebsite || 'https://vendraminiinformatica.com.br/';
    setCanonical(baseUrl);

    // 3. Keywords
    const keywords = [
      'Ricardo Vendramini',
      'Vendramini Informática',
      'Desenvolvedor Full Stack',
      'Arquiteto de Sistemas',
      'Engenheiro de Software',
      'Piracicaba SP',
      'React',
      'TypeScript',
      'Node.js',
      'Supabase',
      'Python',
      'Web Design',
      'Tailwind CSS',
      'Inteligência Artificial',
      'Liderança Técnica'
    ].join(', ');
    setMeta('keywords', keywords);
    setMeta('author', personalInfo.name);
    setMeta('theme-color', '#040705');

    // 4. Update JSON-LD Structured Data for Google Rich Snippets
    setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${baseUrl}#person`,
          'name': personalInfo.name,
          'url': baseUrl,
          'jobTitle': personalInfo.role,
          'description': personalInfo.subheadline,
          'image': personalInfo.photoUrl,
          'worksFor': {
            '@type': 'Organization',
            'name': personalInfo.companyName,
            'url': personalInfo.companyWebsite,
            'logo': personalInfo.companyLogoUrl
          },
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Piracicaba',
            'addressRegion': 'SP',
            'addressCountry': 'BR'
          },
          'knowsAbout': [
            'Desenvolvimento Full Stack',
            'Arquitetura de Sistemas',
            'Engenharia de Software',
            'React',
            'TypeScript',
            'Supabase',
            'Node.js',
            'Desenvolvimento com Inteligência Artificial',
            'Infraestrutura & Redes'
          ],
          'sameAs': [
            personalInfo.socialLinks.github,
            personalInfo.socialLinks.linkedin,
            personalInfo.socialLinks.instagram,
            personalInfo.socialLinks.facebook,
            personalInfo.companyWebsite
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          'url': baseUrl,
          'name': `${personalInfo.name} — Portfólio & Engenharia de Software`,
          'alternateName': 'RICARDO.DEV',
          'description': t('seo.defaultDescription'),
          'inLanguage': lang === 'en' ? 'en-US' : 'pt-BR'
        }
      ]
    });

    // 5. Scroll-spy & Dynamic Section Meta Tag Updates
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = 'hero';
      for (const key of sectionOrder) {
        const el = document.getElementById(key);
        if (el && el.offsetTop <= scrollPos) {
          current = key;
        }
      }

      const titleKey = t(`seo.title.${current}`);
      const descKey = t(`seo.description.${current}`);
      const isDefault = titleKey.startsWith('seo.title');

      const activeTitle = isDefault ? t('seo.defaultTitle') : titleKey;
      const activeDesc = isDefault ? t('seo.defaultDescription') : descKey;

      document.title = activeTitle;
      setMeta('description', activeDesc);
      setMeta('og:title', activeTitle, true);
      setMeta('og:description', activeDesc, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', baseUrl, true);
      setMeta('og:site_name', 'Ricardo Vendramini — Full Stack Developer', true);
      setMeta('og:locale', lang === 'en' ? 'en_US' : 'pt_BR', true);
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', activeTitle);
      setMeta('twitter:description', activeDesc);
      setMeta('twitter:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t]);

  return null;
}