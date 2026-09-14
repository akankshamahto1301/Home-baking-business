import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '@/data/bakery';
import { copy } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TiltFrame from '@/components/TiltFrame';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + gallery.length) % gallery.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % gallery.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section id="gallery" className="section-padding bg-cream-50">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">{copy.gallery.eyebrow}</p>
        </div>

        <div>
          <div className="mb-7 text-center">
            <h3 className="font-serif text-2xl font-semibold text-cocoa-600 sm:text-3xl">
              {copy.gallery.heading}
            </h3>

            <p className="mt-2 text-sm text-cocoa-400 sm:text-base">
              {copy.gallery.body}
            </p>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative block w-full break-inside-avoid rounded-2xl"
              >
                <TiltFrame max={9} className="overflow-hidden rounded-2xl">
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 z-[2] flex items-end bg-gradient-to-t from-cocoa-900/75 via-cocoa-900/15 to-transparent">
                    <span className="p-4 text-left text-sm font-medium text-cream-100">
                      {img.label}
                    </span>
                  </div>
                </TiltFrame>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="lightbox-dim fixed inset-0 z-[100] flex items-center justify-center bg-cocoa-900/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 transition-colors hover:bg-cream-100/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 transition-colors hover:bg-cream-100/20 sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <img
            key={lightboxIndex}
            src={gallery[lightboxIndex].image}
            alt={gallery[lightboxIndex].alt}
            className="lightbox-img max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 transition-colors hover:bg-cream-100/20 sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-cream-100/10 px-5 py-2 text-sm text-cream-100">
            {gallery[lightboxIndex].label} — {lightboxIndex + 1} /{' '}
            {gallery.length}
          </span>
        </div>
      )}
    </section>
  );
}
