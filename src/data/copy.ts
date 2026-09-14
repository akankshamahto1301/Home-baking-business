import { bakeryConfig, waLink } from '@/data/bakery';

/**
 * Customer-facing copy. Hooks first — product, occasion, WhatsApp.
 * WhatsApp texts are meant to be sent, not “could you share the options?”
 */
export const copy = {
  meta: {
    title: 'VMLAR | Bengaluru home bakery — cakes made to order',
    description:
      'VMLAR is a Bengaluru home kitchen. Cakes, brownies, cookies and cupcakes — baked after you message. Price and date on WhatsApp.',
  },

  nav: {
    order: 'WhatsApp to order',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    eyebrow: 'Bengaluru home kitchen',
    line1: 'Cakes are made to order.',
    line2: 'WhatsApp the flavour. We’ll bake it.',
    body: 'VMLAR bakes after you confirm — chocolate truffle, red velvet, Biscoff, fruit, vanilla, plus brownies, cookies and cupcakes. No walk-in counter. WhatsApp the date and the flavour — we’ll take it from there.',
    ctaMenu: 'See the menu',
    ctaWhatsApp: 'WhatsApp the date',
    fact: 'Bengaluru · home kitchen · WhatsApp',
  },

  about: {
    eyebrow: 'The kitchen',
    heading: 'One oven in Bengaluru. Your order, not a display case.',
    p1: 'This started as baking for family. It is still a home kitchen — WhatsApp in, we bake.',
    p2: 'Birthday cakes, cupcakes, brownie boxes, cookie tins. Everything starts after you message — never sitting on a shelf.',
    cta: 'Ask about a date',
    stats: [
      { value: 'Cakes', label: 'Truffle to fruit' },
      { value: 'Boxes', label: 'Brownies & cookies' },
      { value: 'WA', label: 'To confirm' },
    ],
  },

  menu: {
    eyebrow: 'Menu',
    heading: 'Pick a flavour. Send the date.',
    body: 'Made after you message. Size and writing change the price — we confirm on WhatsApp. If the sheet is empty, ask; we will say what is actually baking.',
    loading: 'Loading the menu…',
    error: 'Menu did not load. WhatsApp us — we will send what we can bake this week.',
    empty: 'Nothing listed this week. WhatsApp — we will tell you what is in the oven.',
    fallbackCta: "WhatsApp this week's list",
    orderItem: 'WhatsApp this',
    priceOnWa: 'Price on WhatsApp',
    startingFrom: (price: string) => `Starting from ${price}`,
  },

  gallery: {
    eyebrow: 'Gallery',
    heading: 'Cakes, slabs, boxes.',
    body: 'Birthday cakes, cupcakes, brownies, cookies, gift boxes. What people actually order.',
  },

  why: {
    eyebrow: 'How we work',
    heading: 'A home kitchen. Your order, not a tray.',
  },

  occasions: {
    eyebrow: 'When you need us',
    heading: 'Birthday, festival, office table — tap which one.',
    body: 'Tap the occasion. The message already has the date and the flavour — fill the blanks and send.',
  },

  reviews: {
    eyebrow: 'Reviews',
    heading: 'After they cut the cake.',
    empty: 'No reviews loaded. If you ordered, write what you would tell a friend — we publish after a check.',
    formEyebrow: 'You ordered',
    formHeading: 'Say what you would tell a friend.',
    nameLabel: 'Your name',
    namePlaceholder: 'Name as you want it shown',
    ratingLabel: 'Stars',
    categoryLabel: 'What you ordered',
    categoryPlaceholder: 'Birthday cake, cupcakes, brownie box, cookies…',
    reviewLabel: 'How it went',
    reviewPlaceholder: 'Flavour, how it held up, would you order again?',
    submit: 'Send review',
    submitting: 'Sending…',
    success: 'Got it. It goes up after we check it.',
    approvalNote: 'We read them before they go up.',
    errors: {
      required: 'Name, a few lines, and a star rating.',
      submit: 'Could not send. Try again, or WhatsApp us.',
    },
  },

  instagram: {
    eyebrow: '@vmlar_bakery',
    heading: 'This week’s tray is on Instagram.',
    body: 'Sold-out notes and box photos live there. If you see something you want, WhatsApp the date from here.',
    cta: 'Open @vmlar_bakery',
  },

  contact: {
    eyebrow: 'Order',
    heading: 'Send us the date. We’ll look after the rest.',
    body: 'Bengaluru only. We’ll reply with flavour, size, and price — then we bake.',
    location: 'Location',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    orderCta: 'WhatsApp the date',
    callCta: 'Call the kitchen',
  },

  footer: {
    blurb: 'Home kitchen in Bengaluru. Cakes, brownies, cookies — WhatsApp the flavour.',
    links: 'On this page',
    contact: 'Kitchen',
    legal: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
    note: 'Home kitchen · Bengaluru · WhatsApp orders',
  },

  error: {
    heading: 'This page broke.',
    body: 'Refresh — or WhatsApp the order.',
  },

  wa: {
    order: `Hi ${bakeryConfig.name} — I want to place an order.

Date needed:
What I want (cake / brownies / cookies / cupcakes):
Occasion:`,

    menuDown: `Hi ${bakeryConfig.name} — the menu isn't loading on the site.

What's available this week?
I need (cake / brownies / cookies):
Date:`,

    item: (name: string) => `Hi ${bakeryConfig.name} — I want to order ${name}.

Date needed:
Occasion:
How many people:`,
  },
} as const;

export function waOrder(): string {
  return waLink(copy.wa.order);
}

export function waMenuDown(): string {
  return waLink(copy.wa.menuDown);
}

export function waItem(name: string): string {
  return waLink(copy.wa.item(name));
}
