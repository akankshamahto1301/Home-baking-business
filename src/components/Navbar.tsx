import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { copy, waOrder } from '@/data/copy';
import BrandLogo from '@/components/BrandLogo';

const navLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Menu', href: '#menu', id: 'menu' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;

      setScrollPct(
        max > 0
          ? Math.min(100, (window.scrollY / max) * 100)
          : 0
      );
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.3, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const mobileMenu = (
    <div
      id="mobile-nav"
      className={`fixed inset-0 z-[9999] xl:hidden ${
        mobileOpen
          ? 'pointer-events-auto'
          : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-cocoa-900/40 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#f8f1e8',
          opacity: 1,
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-cream-300 px-6 py-5">
          <BrandLogo compact />

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa-600 transition-colors hover:bg-cream-200"
            aria-label={copy.nav.closeMenu}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link, idx) => (
            <li
              key={link.href}
              className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transitionDelay: mobileOpen
                  ? `${80 + idx * 60}ms`
                  : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen
                  ? 'translateX(0)'
                  : 'translateX(16px)',
              }}
            >
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-cream-200 hover:text-cocoa-600 ${
                  activeId === link.id
                    ? 'bg-cream-200 text-cocoa-600'
                    : 'text-cocoa-500'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* WhatsApp Button */}
        <div className="mt-auto px-6 pb-8">
          <a
            href={waOrder()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blush-600 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:brightness-90"
          >
            <MessageCircle className="h-4 w-4" />
            {copy.nav.order}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-sm shadow-cocoa-900/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <a
            href="#home"
            className="transition-opacity hover:opacity-80"
          >
            <BrandLogo compact />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const active = activeId === link.id;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors duration-300 ${
                      active
                        ? 'text-cocoa-600'
                        : 'text-cocoa-500 hover:text-cocoa-600'
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold-400 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active
                          ? 'scale-x-100'
                          : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop WhatsApp */}
          <a
            href={waOrder()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-blush-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-90 hover:shadow-md hover:shadow-blush-600/30 xl:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {copy.nav.order}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa-600 transition-colors hover:bg-cream-200 xl:hidden"
            aria-label={copy.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        {/* Scroll Progress */}
        <div className="h-[3px] w-full bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-blush-600 to-gold-400 transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `${scrollPct}%`,
            }}
          />
        </div>
      </header>

      {/* 
        IMPORTANT:
        Mobile navigation is rendered directly into document.body.
        This prevents it from being trapped inside the header's
        z-index stacking context.
      */}
      {typeof document !== 'undefined' &&
        createPortal(mobileMenu, document.body)}
    </>
  );
}
