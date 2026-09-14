import { Wheat, Heart, Leaf, HeartHandshake } from 'lucide-react';
import { whyChooseUs } from '@/data/bakery';
import { copy } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, typeof Wheat> = {
  Wheat,
  Heart,
  Leaf,
  HeartHandshake,
};

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding bg-cream-100">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className={`mx-auto mb-12 max-w-2xl text-center reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="heading-eyebrow">{copy.why.eyebrow}</p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl">
            {copy.why.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Heart;
            return (
              <div
                key={item.title}
                className={`group rounded-2xl bg-cream-50 p-8 text-center shadow-md shadow-cocoa-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cocoa-900/10 reveal reveal-delay-${
                  idx + 1
                } ${isVisible ? 'is-visible' : ''}`}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blush-50 text-blush-400 transition-colors duration-300 group-hover:bg-blush-400 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-cocoa-600">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
