import { useEffect, useState, type PointerEvent } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { copy, waOrder } from '@/data/copy';
import { useMagnetic } from '@/hooks/useMagnetic';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { useScrollScrub } from '@/hooks/useScrollScrub';

const FLOUR = [
  { l: 6, t: 14, s: 6, c: '#E5D0BD', dx: 48, dy: -72, d: 11, delay: 0 },
  { l: 16, t: 38, s: 4, c: '#9A7B68', dx: -32, dy: -50, d: 13, delay: 0.3 },
  { l: 26, t: 10, s: 5, c: '#F0E2D5', dx: 28, dy: 44, d: 12, delay: 0.7 },
  { l: 42, t: 24, s: 7, c: '#C9B5A6', dx: -40, dy: -64, d: 14, delay: 0.15 },
  { l: 58, t: 12, s: 4, c: '#6B4A37', dx: 22, dy: 52, d: 10, delay: 0.9 },
  { l: 72, t: 32, s: 6, c: '#E5D0BD', dx: -36, dy: -40, d: 12, delay: 0.45 },
  { l: 84, t: 18, s: 5, c: '#9A7B68', dx: 18, dy: -68, d: 15, delay: 1.1 },
  { l: 10, t: 64, s: 5, c: '#F0E2D5', dx: 44, dy: -28, d: 11, delay: 0.25 },
  { l: 52, t: 70, s: 4, c: '#C9B5A6', dx: -24, dy: 36, d: 13, delay: 0.8 },
  { l: 90, t: 54, s: 6, c: '#E5D0BD', dx: -42, dy: -30, d: 12, delay: 0.4 },
  { l: 34, t: 48, s: 5, c: '#F8EFE6', dx: 30, dy: -58, d: 14, delay: 0.55 },
  { l: 68, t: 58, s: 4, c: '#C9B5A6', dx: -20, dy: -46, d: 10, delay: 1.3 },
  { l: 22, t: 78, s: 6, c: '#E5D0BD', dx: 36, dy: -22, d: 13, delay: 0.2 },
  { l: 78, t: 8, s: 5, c: '#F0E2D5', dx: -16, dy: 40, d: 11, delay: 1 },
  { l: 48, t: 6, s: 4, c: '#9A7B68', dx: 26, dy: 34, d: 12, delay: 0.65 },
  { l: 4, t: 46, s: 5, c: '#C9B5A6', dx: 50, dy: -38, d: 14, delay: 0.35 },
  { l: 94, t: 36, s: 4, c: '#E5D0BD', dx: -28, dy: -54, d: 11, delay: 0.85 },
  { l: 38, t: 86, s: 6, c: '#F0E2D5', dx: -34, dy: -18, d: 13, delay: 0.5 },
  { l: 62, t: 82, s: 5, c: '#9A7B68', dx: 20, dy: -42, d: 12, delay: 1.15 },
  { l: 14, t: 22, s: 4, c: '#F8EFE6', dx: 38, dy: 26, d: 10, delay: 0.1 },
  { l: 86, t: 74, s: 5, c: '#C9B5A6', dx: -22, dy: -36, d: 15, delay: 0.75 },
  { l: 30, t: 58, s: 6, c: '#E5D0BD', dx: 16, dy: -62, d: 11, delay: 0.95 },
];

export default function Hero() {
  const [playId, setPlayId] = useState(0);
  const sectionRef = useScrollScrub<HTMLElement>();
  const tiltRef = usePointerTilt<HTMLDivElement>({ max: 10 });
  const menuBtn = useMagnetic<HTMLAnchorElement>(0.32);
  const waBtn = useMagnetic<HTMLAnchorElement>(0.32);

  useEffect(() => {
    const replay = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href="#home"]');
      if (link) setPlayId((n) => n + 1);
    };
    document.addEventListener('click', replay);
    return () => document.removeEventListener('click', replay);
  }, []);

  const onPointer = (event: PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--hx', x.toFixed(3));
    el.style.setProperty('--hy', y.toFixed(3));
  };

  const onLeave = () => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty('--hx', '0');
    el.style.setProperty('--hy', '0');
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointer}
      onPointerLeave={onLeave}
      className="relative overflow-hidden bg-cream-100 pt-20 lg:pt-24"
    >
      <div key={`flour-${playId}`} className="hero-flour pointer-events-none absolute inset-0" aria-hidden="true">
        {FLOUR.map((speck, i) => (
          <span
            key={i}
            className="flour-speck"
            style={{
              left: `${speck.l}%`,
              top: `${speck.t}%`,
              width: speck.s,
              height: speck.s,
              background: speck.c,
              ['--dx' as string]: `${speck.dx}px`,
              ['--dy' as string]: `${speck.dy}px`,
              animationDuration: `${speck.d}s`,
              animationDelay: `${speck.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-12 md:px-12 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="hero-copy-col order-2 text-center lg:order-1 lg:text-left">
          <div key={playId}>
            <p className="hero-eyebrow heading-eyebrow mb-4">{copy.hero.eyebrow}</p>

            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-cocoa-600 sm:text-5xl lg:text-6xl">
              <span className="hero-line block">{copy.hero.line1}</span>
              <span className="hero-italic italic text-blush-600">{copy.hero.line2}</span>
            </h1>

            <p className="hero-copy mx-auto mt-6 max-w-md text-base leading-relaxed text-cocoa-400 lg:mx-0 lg:text-lg">
              {copy.hero.body}
            </p>
          </div>

          <div className="hero-ctas mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a ref={menuBtn} href="#menu" className="btn-primary w-full sm:w-auto">
              {copy.hero.ctaMenu}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              ref={waBtn}
              href={waOrder()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.hero.ctaWhatsApp}
            </a>
          </div>

          <p className="hero-fact mt-10 text-xs font-medium uppercase tracking-[0.22em] text-cocoa-400">
            {copy.hero.fact}
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div ref={tiltRef} className="tilt-stage hero-product">
            <div
              key={playId}
              className="hero-lid overflow-hidden rounded-[2rem] rounded-tl-[5rem] shadow-2xl shadow-cocoa-900/15"
            >
              <div className="hero-scrub-photo">
                <img
                  src="https://images.pexels.com/photos/19940993/pexels-photo-19940993.png?auto=compress&cs=tinysrgb&h=800&w=1000"
                  alt="Rich chocolate cake slices with frosting"
                  className="hero-kenburns h-[340px] w-full object-cover object-[58%_38%] sm:h-[420px] lg:h-[520px]"
                  loading="eager"
                />
              </div>
              <span className="tilt-shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
