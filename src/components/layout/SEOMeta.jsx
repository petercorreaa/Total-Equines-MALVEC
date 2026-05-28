import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://totalequines.com.ar';
const HREFLANG_LOCALES = ['es', 'en', 'zh', 'x-default'];

export default function SEOMeta({ title, description, image, jsonLd = null }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${title} | Total Equines`;

    const setMeta = (attr, attrValue, content) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', `${title} | Total Equines`);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', `${title} | Total Equines`);
    setMeta('name', 'twitter:description', description);

    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    }
  }, [title, description, image]);

  useEffect(() => {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    const fullUrl = `${BASE_URL}${pathname}`;
    HREFLANG_LOCALES.forEach((lang) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = fullUrl;
      document.head.appendChild(link);
    });

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [pathname]);

  useEffect(() => {
    if (!jsonLd) return;

    const script = document.createElement('script');
    script.id = 'ld-json-page';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('ld-json-page');
      if (existing) existing.remove();
    };
  }, [jsonLd]);

  return null;
}
