import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink, type MenuCategory } from '@/data/bakery';
import { fetchMenu } from '@/services/menuService';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function MenuSection() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenu();

        setMenu(data);

        if (data.length > 0) {
          setActiveCategory(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const current =
    menu.find((category) => category.id === activeCategory) ?? menu[0];

  return (
    <section id="menu" className="section-padding bg-cream-100">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">Our Menu</p>

          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            Sweet Treats for Every Craving
          </h2>

          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            Every item is made fresh to order. Prices vary by size and
            customisation — reach out on WhatsApp for details.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-cocoa-400">
            Loading our menu...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-12 text-center text-cocoa-400">
            Sorry, we couldn't load the menu right now.
          </div>
        )}

        {/* Empty menu */}
        {!loading && !error && menu.length === 0 && (
          <div className="py-12 text-center text-cocoa-400">
            Our menu is currently being updated. Please check back soon.
          </div>
        )}

        {/* Menu */}
        {!loading && !error && menu.length > 0 && (
          <>
            {/* Category tabs */}
            <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {menu.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 sm:px-7 sm:py-3 ${
                    activeCategory === category.id
                      ? 'bg-cocoa-500 text-cream-100 shadow-md shadow-cocoa-500/20'
                      : 'bg-cream-200 text-cocoa-400 hover:bg-cream-300 hover:text-cocoa-500'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Items grid */}
            {current && (
              <div
                key={activeCategory}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {current.items.map((item) => (
                  <article
                    key={item.name}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-md shadow-cocoa-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cocoa-900/10"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-serif text-lg font-semibold text-cocoa-600">
                        {item.name}
                      </h3>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa-400">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-gold-600">
                          Starting from {item.price}
                        </span>
                      </div>

                      <a
                        href={waLink(
                          `Hi! I would like to order ${item.name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blush-50 px-5 py-2.5 text-sm font-medium text-blush-500 transition-all duration-300 hover:bg-blush-400 hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Order This
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}