import { FormEvent, useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { customCakes, waLink } from '@/data/bakery';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CustomCakes() {
  const { ref, isVisible } = useScrollReveal();
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [servings, setServings] = useState('');
  const [flavour, setFlavour] = useState('');

  function customMessage() {
    const lines = ['Hi! I would like to request a custom cake.'];
    if (occasion.trim()) lines.push(`Occasion: ${occasion.trim()}`);
    if (date.trim()) lines.push(`Date needed: ${date.trim()}`);
    if (servings.trim()) lines.push(`Servings: ${servings.trim()}`);
    if (flavour.trim()) lines.push(`Flavour: ${flavour.trim()}`);
    if (lines.length === 1) {
      lines.push('Here are my details:');
    }
    return lines.join('\n');
  }

  function handleEnquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(waLink(customMessage()), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="custom" className="section-padding bg-cocoa-600 text-cream-100">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${isVisible ? 'is-visible' : ''} reveal`}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Bespoke Creations
          </div>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cream-100 sm:text-4xl lg:text-5xl">
            Dream Cake? Let's Create It.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-300 lg:text-lg">
            Have a theme, colour or design in mind? Tell us what you want and we'll create a cake specially for your celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {customCakes.map((cake, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl ${
                idx === 0 ? 'col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <img
                src={cake.image}
                alt={cake.alt}
                className={`w-full object-cover ${
                  isVisible ? 'clip-reveal' : 'opacity-0'
                } ${
                  idx === 0 ? 'h-64 sm:h-80 lg:h-full lg:min-h-[400px]' : 'h-40 sm:h-52 lg:h-52'
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <form
          onSubmit={handleEnquire}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-cream-100/10 bg-cocoa-700/40 p-5 sm:p-8"
        >
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
            Tell us a little
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-left text-xs uppercase tracking-wider text-cream-300">
              Occasion
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="Birthday, anniversary…"
                className="mt-2 w-full rounded-xl border border-cream-100/15 bg-cocoa-800/50 px-4 py-3 text-sm text-cream-100 outline-none placeholder:text-cream-300/50 focus-visible:ring-2 focus-visible:ring-gold-300/50"
              />
            </label>
            <label className="block text-left text-xs uppercase tracking-wider text-cream-300">
              Date needed
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-cream-100/15 bg-cocoa-800/50 px-4 py-3 text-sm text-cream-100 outline-none focus-visible:ring-2 focus-visible:ring-gold-300/50"
              />
            </label>
            <label className="block text-left text-xs uppercase tracking-wider text-cream-300">
              Servings
              <input
                type="text"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="8, 12, 20…"
                className="mt-2 w-full rounded-xl border border-cream-100/15 bg-cocoa-800/50 px-4 py-3 text-sm text-cream-100 outline-none placeholder:text-cream-300/50 focus-visible:ring-2 focus-visible:ring-gold-300/50"
              />
            </label>
            <label className="block text-left text-xs uppercase tracking-wider text-cream-300">
              Flavour
              <input
                type="text"
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
                placeholder="Chocolate truffle, Biscoff…"
                className="mt-2 w-full rounded-xl border border-cream-100/15 bg-cocoa-800/50 px-4 py-3 text-sm text-cream-100 outline-none placeholder:text-cream-300/50 focus-visible:ring-2 focus-visible:ring-gold-300/50"
              />
            </label>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blush-400 px-8 py-4 text-sm font-medium text-white transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-blush-500"
            >
              <MessageCircle className="h-4 w-4" />
              Request a Custom Cake
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
