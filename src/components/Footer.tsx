import { Instagram as InstagramIcon, MessageCircle, Phone } from 'lucide-react';
import { bakeryConfig, telLink } from '@/data/bakery';
import { copy, waOrder } from '@/data/copy';
import BrandLogo from '@/components/BrandLogo';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-cocoa-600 px-6 py-14 text-cream-200 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <BrandLogo inverse />
            <p className="mt-3 text-sm leading-relaxed text-cream-300">
              {copy.footer.blurb}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              <a
                href={bakeryConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-200 transition-colors hover:bg-blush-600 hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={waOrder()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-200 transition-colors hover:bg-blush-600 hover:text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={telLink()}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-200 transition-colors hover:bg-blush-600 hover:text-white"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {copy.footer.links}
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream-300 transition-colors hover:text-cream-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {copy.footer.contact}
            </h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>{bakeryConfig.city}</li>
              <li>
                <a href={telLink()} className="transition-colors hover:text-cream-100">
                  {bakeryConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={bakeryConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream-100"
                >
                  {bakeryConfig.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream-300">
            {copy.footer.legal(new Date().getFullYear(), bakeryConfig.name)}
          </p>
          <p className="text-xs text-cream-300">
            {copy.footer.note}
          </p>
        </div>
      </div>
    </footer>
  );
}
