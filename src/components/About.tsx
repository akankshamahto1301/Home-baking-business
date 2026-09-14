import { ArrowRight } from 'lucide-react';
import { copy } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollScrub } from '@/hooks/useScrollScrub';
import TiltFrame from '@/components/TiltFrame';

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const scrubRef = useScrollScrub<HTMLElement>();

  return (
    <section
      id="about"
      ref={scrubRef}
      className="section-padding bg-cream-50"
      onPointerMove={(event) => {
        const el = scrubRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--hx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
        el.style.setProperty('--hy', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
      }}
      onPointerLeave={() => {
        const el = scrubRef.current;
        if (!el) return;
        el.style.setProperty('--hx', '0');
        el.style.setProperty('--hy', '0');
      }}
    >
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
          isVisible ? 'is-visible' : ''
        } reveal`}
      >
        <div className="relative">
          <TiltFrame max={6} className="overflow-hidden rounded-[2rem] rounded-br-[5rem] shadow-xl shadow-cocoa-900/10">
            <div className="hero-scrub-photo">
              <img
                src="https://images.pexels.com/photos/8477755/pexels-photo-8477755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Hands decorating a cake with frosting"
                className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[460px]"
                loading="lazy"
              />
            </div>
          </TiltFrame>
          <div className="about-accent absolute -bottom-8 -right-4 hidden h-32 w-32 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-lg sm:block lg:-right-8">
            <img
              src="https://images.pexels.com/photos/6958023/pexels-photo-6958023.jpeg?auto=compress&cs=tinysrgb&h=300&w=300"
              alt="Dusting powdered sugar on a cake"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="heading-eyebrow">{copy.about.eyebrow}</p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.about.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.about.p1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.about.p2}
          </p>

          <a href="#contact" className="btn-secondary mt-8">
            {copy.about.cta}
            <ArrowRight className="h-4 w-4" />
          </a>

          <div className="mt-10 flex gap-8 border-t border-cream-300 pt-6">
            {copy.about.stats.map((stat, idx) => (
              <div key={stat.label} className="contents">
                {idx > 0 && <div className="w-px bg-cream-300" />}
                <div>
                  <p className="font-serif text-2xl font-semibold text-cocoa-600">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-cocoa-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
