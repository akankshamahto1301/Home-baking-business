import { MapPin, Phone, MessageCircle, Instagram as InstagramIcon } from 'lucide-react';
import { bakeryConfig, telLink } from '@/data/bakery';
import { copy, waOrder } from '@/data/copy';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  const contactItems = [
    {
      icon: MapPin,
      label: copy.contact.location,
      value: bakeryConfig.city,
    },
    {
      icon: Phone,
      label: copy.contact.phone,
      value: bakeryConfig.phone,
      href: telLink(),
    },
    {
      icon: MessageCircle,
      label: copy.contact.whatsapp,
      value: bakeryConfig.phone,
      href: waOrder(),
    },
    {
      icon: InstagramIcon,
      label: copy.contact.instagram,
      value: bakeryConfig.instagramHandle,
      href: bakeryConfig.instagram,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-cream-100">
      <div className="mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`mx-auto mb-12 max-w-2xl text-center ${isVisible ? 'is-visible' : ''} reveal`}
        >
          <p className="heading-eyebrow">{copy.contact.eyebrow}</p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-cocoa-600 sm:text-4xl lg:text-5xl">
            {copy.contact.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cocoa-400 lg:text-lg">
            {copy.contact.body}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blush-50 text-blush-400 transition-colors duration-300 group-hover:bg-blush-400 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-wider text-cocoa-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-cocoa-600">
                  {item.value}
                </p>
              </>
            );

            const wrapperClass =
              'group flex flex-col items-center rounded-2xl bg-cream-50 p-6 text-center shadow-md shadow-cocoa-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cocoa-900/10';

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={wrapperClass}
              >
                {content}
              </a>
            ) : (
              <div key={item.label} className={wrapperClass}>
                {content}
              </div>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waOrder()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            {copy.contact.orderCta}
          </a>
          <a href={telLink()} className="btn-secondary w-full sm:w-auto">
            <Phone className="h-4 w-4" />
            {copy.contact.callCta}
          </a>
        </div>
      </div>
    </section>
  );
}
