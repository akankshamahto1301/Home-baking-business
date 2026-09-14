import { Instagram as InstagramIcon } from 'lucide-react';
import { instagramPosts, bakeryConfig } from '@/data/bakery';
import { copy } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function InstagramSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding bg-cream-50">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${isVisible ? 'is-visible' : ''} reveal`}
        >
          <p className="heading-eyebrow">{copy.instagram.eyebrow}</p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.instagram.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.instagram.body}
          </p>
        </div>

        {/* Instagram grid */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {instagramPosts.map((src, idx) => (
            <a
              key={idx}
              href={bakeryConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt={`Photo linking to ${bakeryConfig.instagramHandle}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-cocoa-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7 text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={bakeryConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa-300 bg-transparent px-7 py-3.5 text-sm font-medium text-cocoa-600 transition-all duration-300 hover:bg-cocoa-500 hover:text-cream-100 hover:border-cocoa-500 active:scale-95"
          >
            <InstagramIcon className="h-4 w-4" />
            {copy.instagram.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
