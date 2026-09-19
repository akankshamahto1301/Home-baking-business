import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { displayPrice, type MenuCategory } from '@/data/bakery';
import { copy, waItem, waMenuDown } from '@/data/copy';
import { fetchMenu } from '@/services/menuService';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TiltFrame from '@/components/TiltFrame';

function MenuFallback({ message }: { message: string }) {
  return (
    <div aria-live="polite">
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 w-24 rounded-full bg-cream-200 sm:h-12 sm:w-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-cream-50 shadow-md shadow-cocoa-900/5">
            <div className="h-52 w-full bg-cream-200" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-5 w-2/3 rounded-full bg-cream-200" />
              <div className="h-4 w-full rounded-full bg-cream-200" />
              <div className="h-4 w-4/5 rounded-full bg-cream-200" />
              <div className="mt-2 h-11 w-full rounded-full bg-cream-200" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-sm text-cocoa-400">{message}</p>
        <a
          href={waMenuDown()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-5"
        >
          <MessageCircle className="h-4 w-4" />
          {copy.menu.fallbackCta}
        </a>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { ref, isVisible } = useScrollReveal();

  const tabRowRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const hoverCategory = useRef<string | null>(null);

  const measureTab = (id: string) => {
    const el = tabRefs.current[id];
    const row = tabRowRef.current;
    if (el && row) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  };

  useLayoutEffect(() => {
    measureTab(hoverCategory.current ?? activeCategory);
    const onResize = () => measureTab(hoverCategory.current ?? activeCategory);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeCategory, menu]);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const data = await fetchMenu();
        if (cancelled) return;

        setMenu(data);

        if (data.length > 0) {
          setActiveCategory(data[0].id);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load menu:', err);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const failsafe = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 8000);

    loadMenu();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  const current =
    menu.find((category) => category.id === activeCategory) ?? menu[0];

  return (
    <section id="menu" className="section-padding bg-cream-100">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">{copy.menu.eyebrow}</p>

          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.menu.heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.menu.body}
          </p>
        </div>

        {loading && (
          <div aria-live="polite">
            <span className="sr-only">{copy.menu.loading}</span>
            <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 w-24 animate-pulse rounded-full bg-cream-200 sm:h-12 sm:w-32"
                />
              ))}
            </div>
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-cream-50 shadow-md shadow-cocoa-900/5"
                >
                  <div className="h-52 w-full animate-pulse bg-cream-200" />
                  <div className="flex flex-col gap-3 p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded-full bg-cream-200" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-cream-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-cream-200" />
                    <div className="mt-2 h-11 w-full animate-pulse rounded-full bg-cream-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <MenuFallback message={copy.menu.error} />
        )}

        {!loading && !error && menu.length === 0 && (
          <MenuFallback message={copy.menu.empty} />
        )}

        {!loading && !error && menu.length > 0 && (
          <>
            <div className="mb-10 flex justify-center overflow-x-auto scrollbar-hide">
              <div
                ref={tabRowRef}
                role="tablist"
                aria-label="Menu categories"
                className="relative flex min-w-max gap-1 border-b border-cream-300 px-1"
                onPointerLeave={() => {
                  hoverCategory.current = null;
                  measureTab(activeCategory);
                }}
              >
                <span
                  aria-hidden="true"
                  className="icing-underline absolute bottom-0 left-0"
                  style={{
                    width: underline.width,
                    transform: `translateX(${underline.left}px)`,
                  }}
                />
                {menu.map((category) => (
                  <button
                    key={category.id}
                    ref={(el) => {
                      tabRefs.current[category.id] = el;
                    }}
                    role="tab"
                    aria-selected={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                    onPointerEnter={() => {
                      hoverCategory.current = category.id;
                      measureTab(category.id);
                    }}
                    className={`relative z-10 px-5 py-2.5 text-sm font-medium transition-colors duration-200 sm:px-7 ${
                      activeCategory === category.id
                        ? 'text-cocoa-600'
                        : 'text-cocoa-400 hover:text-cocoa-600'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {current && (
              <div
                key={activeCategory}
                className="menu-grid-fade grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {current.items.map((item, idx) => {
                  const priceLabel = displayPrice(item.price);
                  const allergens = (item as typeof item & { allergens?: string }).allergens;
                  return (
                    <article
                      key={item.name}
                      className="menu-card-enter group"
                      style={{ animationDelay: `${idx * 85}ms` }}
                    >
                      <TiltFrame
                        max={7}
                        className="flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-md shadow-cocoa-900/5 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-xl group-hover:shadow-cocoa-900/10"
                      >
                        <div className="relative h-52 overflow-hidden">
                          {/* <img
                            src={item.image}
                            alt={item.alt}
                            className="h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                            loading="lazy"
                          /> */}
                          <img
  src={item.image}
  alt={item.alt}
  onError={() => console.log("IMAGE FAILED:", item.image)}
  onLoad={() => console.log("IMAGE LOADED:", item.image)}
  className="h-64 w-full object-cover object-center transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
  loading="eager"
/>
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-serif text-lg font-semibold text-cocoa-600">
                            {item.name}
                          </h3>

                          <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa-400">
                            {item.description}

                            {allergens && (
  <span className="mt-2 block text-xs text-cocoa-400">
    Allergens: {allergens}
  </span>
)}
                          </p>

                          <p className="mt-4 text-sm font-medium text-gold-800">
                            {priceLabel === copy.menu.priceOnWa
                              ? priceLabel
                              : `₹ ${priceLabel}`}
                          </p>

                          <a
                            href={waItem(item.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blush-50 px-5 py-2.5 text-sm font-medium text-blush-600 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-blush-600 group-hover:text-white active:scale-95"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {copy.menu.orderItem}
                          </a>
                        </div>
                      </TiltFrame>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
