import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { copy, waOrder } from '@/data/copy';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [heroGone, setHeroGone] = useState(false);
  const [pulse, setPulse] = useState(true);
  const orderHref = waOrder();

  useEffect(() => {
    const timer = window.setTimeout(() => setPulse(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) {
      setHeroGone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-mobile-order-bar', heroGone);
    return () => document.body.classList.remove('has-mobile-order-bar');
  }, [heroGone]);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream-300 bg-cream-50/95 px-4 pt-3 shadow-[0_-8px_24px_rgba(61,40,23,0.08)] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          heroGone ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        aria-hidden={!heroGone}
      >
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={heroGone ? 0 : -1}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blush-600 px-6 py-3.5 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" />
          {copy.nav.order}
        </a>
      </div>

      <a
        href={orderHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-5 right-5 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#20BD5A] ${
          heroGone ? 'hidden lg:flex' : 'flex'
        } ${pulse ? 'fab-pulse-once' : ''}`}
        aria-label={copy.nav.order}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
