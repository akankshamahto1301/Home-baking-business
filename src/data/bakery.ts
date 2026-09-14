/**
 * ============================================================
 *  BAKERY CONFIGURATION — Edit these values to customize your site
 * ============================================================
 */

export const bakeryConfig = {
  name: 'VMLAR',
  shortName: 'VMLAR',
  tagline: 'Home-baked in Bengaluru. Cakes, brownies, cookies — WhatsApp the flavour.',
  city: 'Bengaluru',
  phone: '+91 9835788229',
  phoneRaw: '+91 9835788229',
  whatsapp: '919835788229',
  instagram: 'https://instagram.com/vmlar_bakery',
  instagramHandle: '@vmlar_bakery',
};

/**
 * Build a WhatsApp deep link with a pre-filled message.
 */
export function waLink(message: string): string {
  return `https://wa.me/${bakeryConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${bakeryConfig.phoneRaw}`;
}

/** Sheets price, or a honest fallback — never a fake ₹XXX. */
export function displayPrice(price: string | undefined | null): string {
  const raw = (price ?? '').trim();
  if (!raw) return 'Price on WhatsApp';

  const collapsed = raw.replace(/[\s₹Rs.]/gi, '').toUpperCase();
  if (
    !collapsed ||
    /^(X+|TBD|NA|N\/A|-|0)$/.test(collapsed) ||
    collapsed.includes('XXX')
  ) {
    return 'Price on WhatsApp';
  }

  return raw;
}

/**
 * ============================================================
 *  MENU DATA
 *  Replace image URLs and prices at your convenience.
 * ============================================================
 */

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'cakes',
    label: 'Cakes',
    items: [
      {
        name: 'Chocolate Truffle Cake',
        description: 'Dark sponge, ganache, glossy top. The one people send when they do not want to pick.',
        price: '',
        image: 'https://images.pexels.com/photos/19940993/pexels-photo-19940993.png?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Chocolate truffle cake slice',
      },
      {
        name: 'Red Velvet Cake',
        description: 'Cocoa sponge, cream cheese. Write the name on it.',
        price: '',
        image: 'https://images.pexels.com/photos/5112676/pexels-photo-5112676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Red velvet cake slice with cream cheese frosting',
      },
      {
        name: 'Biscoff Cake',
        description: 'Lotus spread through the sponge. Spiced, sweet — a lot of second orders.',
        price: '',
        image: 'https://images.pexels.com/photos/10249465/pexels-photo-10249465.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Biscoff cheesecake with Lotus biscuit',
      },
      {
        name: 'Vanilla Cake',
        description: 'Vanilla sponge, whipped cream, fruit. The office birthday that still tastes like cake.',
        price: '',
        image: 'https://images.pexels.com/photos/12933560/pexels-photo-12933560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Vanilla cream cake with strawberries',
      },
      {
        name: 'Fresh Fruit Cake',
        description: 'Sponge, cream, fruit from the market that week. Say the date; fruit follows the stall.',
        price: '',
        image: 'https://images.pexels.com/photos/28254500/pexels-photo-28254500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Fresh fruit cake with berries and cream',
      },
    ],
  },
  {
    id: 'brownies',
    label: 'Brownies',
    items: [
      {
        name: 'Classic Chocolate Brownie',
        description: 'Fudgy middle, crackly top. Boxes of 6 or 12.',
        price: '',
        image: 'https://images.pexels.com/photos/33917898/pexels-photo-33917898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Classic chocolate brownie',
      },
      {
        name: 'Walnut Brownie',
        description: 'Same slab, toasted walnuts through it. Ask for a box if it is a house thing.',
        price: '',
        image: 'https://images.pexels.com/photos/6390689/pexels-photo-6390689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Walnut brownie with berries',
      },
      {
        name: 'Biscoff Brownie',
        description: 'Biscoff swirled through the chocolate. The gift-box regular.',
        price: '',
        image: 'https://images.pexels.com/photos/28935534/pexels-photo-28935534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Biscoff brownie with cream drizzle',
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    items: [
      {
        name: 'Chocolate Chip Cookies',
        description: 'Butter dough, dark chocolate pools. A dozen for the office table.',
        price: '',
        image: 'https://images.pexels.com/photos/1196301/pexels-photo-1196301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Chocolate chip cookies',
      },
      {
        name: 'Double Chocolate Cookies',
        description: 'Cocoa dough, white and dark chips. Heavier than the butter cookie.',
        price: '',
        image: 'https://images.pexels.com/photos/5847092/pexels-photo-5847092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Double chocolate chunk cookies',
      },
      {
        name: 'Butter Cookies',
        description: 'Shortbread crumb. Quiet cookie — tea, tins, people who skip chocolate.',
        price: '',
        image: 'https://images.pexels.com/photos/797761/pexels-photo-797761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Butter cookies on a cooling rack',
      },
    ],
  },
  {
    id: 'cupcakes',
    label: 'Cupcakes',
    items: [
      {
        name: 'Chocolate Cupcake',
        description: 'Chocolate sponge, buttercream. A dozen for a table when a full cake is too much.',
        price: '',
        image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Chocolate cupcake with frosting',
      },
      {
        name: 'Red Velvet Cupcake',
        description: 'Red velvet, cream cheese. Same batter as the cake, smaller.',
        price: '',
        image: 'https://images.pexels.com/photos/6493067/pexels-photo-6493067.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Red velvet cupcake with pink frosting',
      },
      {
        name: 'Vanilla Cupcake',
        description: 'Vanilla sponge, buttercream. Say if you want writing or a colour.',
        price: '',
        image: 'https://images.pexels.com/photos/14105/pexels-photo-14105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        alt: 'Vanilla cupcake with colorful icing',
      },
    ],
  },
];

/**
 * ============================================================
 *  GALLERY
 * ============================================================
 */

export interface GalleryImage {
  image: string;
  alt: string;
  label: string;
}

export const gallery: GalleryImage[] = [
  {
    image: 'https://images.pexels.com/photos/12616001/pexels-photo-12616001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Decorated chocolate birthday cake',
    label: 'Birthday cake',
  },
  {
    image: 'https://images.pexels.com/photos/29051739/pexels-photo-29051739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Elegant floral wedding cakes',
    label: 'Layer cake',
  },
  {
    image: 'https://images.pexels.com/photos/15896658/pexels-photo-15896658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Colorful cupcakes with swirled icing',
    label: 'Cupcakes',
  },
  {
    image: 'https://images.pexels.com/photos/30353753/pexels-photo-30353753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Fudgy brownies stacked on a plate',
    label: 'Brownies',
  },
  {
    image: 'https://images.pexels.com/photos/8837035/pexels-photo-8837035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Homemade cookies close-up',
    label: 'Cookies',
  },
  {
    image: 'https://images.pexels.com/photos/10390457/pexels-photo-10390457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Assorted dessert gift box',
    label: 'Gift box',
  },
  {
    image: 'https://images.pexels.com/photos/30575774/pexels-photo-30575774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Homemade chocolate cake with pistachios',
    label: 'Chocolate cake',
  },
  {
    image: 'https://images.pexels.com/photos/28159640/pexels-photo-28159640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Luxury dessert platter',
    label: 'Platter',
  },
];

/**
 * ============================================================
 *  WHY CHOOSE US
 * ============================================================
 */

export const whyChooseUs = [
  {
    icon: 'Wheat',
    title: 'Baked after you message',
    description: 'No stock on a shelf. The cake starts when the date and flavour are confirmed.',
  },
  {
    icon: 'Heart',
    title: 'WhatsApp the brief',
    description: 'Date, flavour, how many people. We reply with size and price, then we bake.',
  },
  {
    icon: 'Leaf',
    title: 'Butter, not shortening',
    description: 'Real butter, proper chocolate. If the fruit is off that week, we say so.',
  },
  {
    icon: 'HeartHandshake',
    title: 'One kitchen in Bengaluru',
    description: 'Small batch. You get the cake that was baked for you, not a leftover from a tray.',
  },
];

/**
 * ============================================================
 *  OCCASIONS
 * ============================================================
 */

export const occasions = [
  {
    icon: 'PartyPopper',
    label: 'Festivals',
    message: `Hi ${bakeryConfig.name} — festive order.

Festival / date:
What I want (cake / cupcakes / brownie box / cookie box):
How many people:`,
  },
  {
    icon: 'Gift',
    label: 'Gift boxes',
    message: `Hi ${bakeryConfig.name} — gift box.

Date needed:
Brownies, cookies, or mixed:
How many boxes:
Any note on the box:`,
  },
  {
    icon: 'Cake',
    label: 'Birthdays',
    message: `Hi ${bakeryConfig.name} — birthday cake.

Date of the birthday:
Flavour (truffle / red velvet / Biscoff / fruit / vanilla):
How many people:
Name / message on the cake:`,
  },
  {
    icon: 'Heart',
    label: 'Anniversaries',
    message: `Hi ${bakeryConfig.name} — anniversary cake.

Date:
Flavour:
How many people:`,
  },
  {
    icon: 'Package',
    label: 'Office / bulk',
    message: `Hi ${bakeryConfig.name} — office / bulk order.

Date:
What I want (cupcakes / brownies / cookies / cakes):
How many people:
I'll confirm a count.`,
  },
  {
    icon: 'Sparkles',
    label: 'A specific ask',
    message: `Hi ${bakeryConfig.name} — I have a specific request.

Date needed:
What I want:
Any allergies:`,
  },
];

/**
 * ============================================================
 *  TESTIMONIALS — Edit these reviews freely
 * ============================================================
 */

export const testimonials = [
  {
    review:
      'Truffle cake for my mum in Indiranagar. Not too sweet, ganache held up.',
    author: 'Priya S.',
    occasion: 'Birthday cake',
  },
  {
    review: 'Brownie box for a house thing. Gone before tea. Next time I am ordering two.',
    author: 'Arjun M.',
    occasion: 'Brownie box',
  },
  {
    review:
      'Anniversary cake — they wrote on it, ganache held up in the heat.',
    author: 'Riya & Karan',
    occasion: 'Anniversary cake',
  },
];

/**
 * ============================================================
 *  INSTAGRAM GRID
 * ============================================================
 */

export const instagramPosts = [
  'https://images.pexels.com/photos/19940993/pexels-photo-19940993.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4555505/pexels-photo-4555505.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1196301/pexels-photo-1196301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14105/pexels-photo-14105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8211309/pexels-photo-8211309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
