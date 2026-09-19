// import { Instagram as InstagramIcon } from 'lucide-react';
// import { bakeryConfig } from '@/data/bakery';
// import { fetchInstagramPosts, type InstagramItem } from '@/services/instagramService';
// import { useState, useEffect } from 'react';
// import { copy } from '@/data/copy';
// import { useScrollReveal } from '@/hooks/useScrollReveal';

// export default function InstagramSection() {
//   const { ref, isVisible } = useScrollReveal();
//   const [instagramPosts, setInstagramPosts] = useState<InstagramItem[]>([]);

//   useEffect(() => {
//   fetchInstagramPosts()
//     .then(setInstagramPosts)
//     .catch((error) => {
//       console.error('Failed to load Instagram posts:', error);
//     });
// }, []);

//   return (
//     <section className="section-padding bg-cream-50">
//       <div className="mx-auto max-w-7xl">
//         <div
//           ref={ref}
//           className={`mx-auto mb-12 max-w-2xl text-center ${isVisible ? 'is-visible' : ''} reveal`}
//         >
//           <p className="heading-eyebrow">{copy.instagram.eyebrow}</p>
//           <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
//             {copy.instagram.heading}
//           </h2>
//           <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
//             {copy.instagram.body}
//           </p>
//         </div>

//         {/* Instagram grid */}
//         <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
//           {instagramPosts.map((post, idx) => (
//             <a
//               key={post.id ||idx}
//               href={bakeryConfig.instagram}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative aspect-square overflow-hidden rounded-xl"
//             >
//               <img
//                 src={post.image}
//                 alt={`Photo linking to ${bakeryConfig.instagramHandle}`}
//                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-cocoa-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                 <InstagramIcon className="h-7 w-7 text-white" />
//               </div>
//             </a>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="text-center">
//           <a
//             href={bakeryConfig.instagram}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa-300 bg-transparent px-7 py-3.5 text-sm font-medium text-cocoa-600 transition-all duration-300 hover:bg-cocoa-500 hover:text-cream-100 hover:border-cocoa-500 active:scale-95"
//           >
//             <InstagramIcon className="h-4 w-4" />
//             {copy.instagram.cta}
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }




import {
  Instagram as InstagramIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import { bakeryConfig } from '@/data/bakery';
import {
  fetchInstagramPosts,
  type InstagramItem,
} from '@/services/instagramService';
import { copy } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function InstagramSection() {
  const { ref, isVisible } = useScrollReveal();

  const [instagramPosts, setInstagramPosts] = useState<InstagramItem[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInstagramPosts()
      .then(setInstagramPosts)
      .catch((error) => {
        console.error('Failed to load Instagram posts:', error);
      });
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -350 : 350,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-padding bg-cream-50">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${
            isVisible ? 'is-visible' : ''
          } reveal`}
        >
          <p className="heading-eyebrow">{copy.instagram.eyebrow}</p>

          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.instagram.heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.instagram.body}
          </p>
        </div>

        {/* Instagram carousel */}
        <div className="relative mb-10">
          {/* Left button */}
          <button
            onClick={() => scrollGallery('left')}
            aria-label="Scroll Instagram photos left"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cocoa-200 bg-cream-50 text-cocoa-600 shadow-md transition hover:bg-cocoa-500 hover:text-cream-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Images */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {instagramPosts.map((post, idx) => (
              <a
                key={post.id || idx}
                href={bakeryConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative min-w-[220px] flex-1 overflow-hidden rounded-xl sm:min-w-[260px] lg:min-w-[280px]"
              >
                <div className="aspect-square">
                  <img
                    src={post.image}
                    alt={`Photo linking to ${bakeryConfig.instagramHandle}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-cocoa-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7 text-white" />
                </div>
              </a>
            ))}
          </div>

          {/* Right button */}
          <button
            onClick={() => scrollGallery('right')}
            aria-label="Scroll Instagram photos right"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cocoa-200 bg-cream-50 text-cocoa-600 shadow-md transition hover:bg-cocoa-500 hover:text-cream-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={bakeryConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa-300 bg-transparent px-7 py-3.5 text-sm font-medium text-cocoa-600 transition-all duration-300 hover:border-cocoa-500 hover:bg-cocoa-500 hover:text-cream-100 active:scale-95"
          >
            <InstagramIcon className="h-4 w-4" />
            {copy.instagram.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
