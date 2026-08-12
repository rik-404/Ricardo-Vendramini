import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const sectionOrder = ['hero', 'about', 'experience', 'skills', 'projects', 'certificates', 'books', 'contact'];

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SeoManager() {
  const { lang, t } = useLanguage();

  // Scroll-spy: detect the currently visible section and update
  // <title> and meta description with section-specific keywords.
  useEffect(() => {
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

      document.title = isDefault ? t('seo.defaultTitle') : titleKey;
      setMeta('description', isDefault ? t('seo.defaultDescription') : descKey);
      setMeta('og:title', isDefault ? t('seo.defaultTitle') : titleKey, true);
      setMeta('og:description', isDefault ? t('seo.defaultDescription') : descKey, true);
      setMeta('twitter:title', isDefault ? t('seo.defaultTitle') : titleKey);
      setMeta('twitter:description', isDefault ? t('seo.defaultDescription') : descKey);
      setMeta('og:locale', lang === 'en' ? 'en_US' : 'pt_BR', true);
      setMeta('twitter:locale', lang === 'en' ? 'en_US' : 'pt_BR');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t]);

  return null;
}