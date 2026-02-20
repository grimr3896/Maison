
export type Product = {
  id: string;
  badge?: string;
  emoji: string;
  name: string;
  model: string;
  desc: string;
  image: string; // ID from placeholder-images.json
  features: string[];
  specs: { l: string; v: string }[];
};

export type Group = {
  name: string;
  emoji: string;
  label: string;
  products: Product[];
};

export type Category = {
  id: string;
  label: string;
  title: string;
  sub: string;
  emoji: string;
  image: string; // ID from placeholder-images.json
  theme: string;
  groups: Record<string, Group>;
};

export const CATALOG: Record<string, Category> = {
  kitchen: {
    id: 'kitchen',
    label: 'Kitchen Collection',
    title: 'Cook Smarter,\nLive Better.',
    sub: 'Premium kitchen appliances for every kind of cook — from morning coffee rituals to family feasts.',
    emoji: '🍳',
    image: 'hero-kitchen',
    theme: 'bg-stone-200',
    groups: {
      blenders: {
        name: 'Blenders',
        emoji: '🥤',
        label: 'Blend & Mix',
        products: [
          {
            id: 'k-bl-1',
            badge: 'Popular',
            emoji: '🥤',
            name: 'ProBlend Vortex 1200',
            model: 'Model VX-1200',
            desc: 'A high-performance countertop blender that handles everything from smoothies to nut butters.',
            image: 'prod-blender-1',
            features: ['1200W peak power motor', '6-blade hardened stainless steel', '64oz BPA-free container'],
            specs: [{ l: 'Capacity', v: '64 oz' }, { l: 'Motor', v: '1200W' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'k-bl-2',
            emoji: '🫙',
            name: 'NutriBlend Compact 600',
            model: 'Model NB-600 / Personal',
            desc: 'A sleek personal blender perfect for single-serve smoothies and protein shakes.',
            image: 'prod-blender-2',
            features: ['600W efficient motor', '500ml travel cup', 'One-touch operation'],
            specs: [{ l: 'Capacity', v: '500ml' }, { l: 'Motor', v: '600W' }, { l: 'Warranty', v: '1 year' }],
          }
        ],
      },
      fryers: {
        name: 'Air Fryers',
        emoji: '🍟',
        label: 'Fry Healthier',
        products: [
          {
            id: 'k-fr-1',
            badge: 'Best Seller',
            emoji: '🍟',
            name: 'CrispMaster Air Fryer XL',
            model: 'Model CM-8L / Digital',
            desc: 'Enjoy healthier versions of your favourite fried foods with up to 80% less oil.',
            image: 'prod-fryer-1',
            features: ['8-litre XXL capacity', '12 digital presets', '360° air circulation'],
            specs: [{ l: 'Capacity', v: '8 litres' }, { l: 'Wattage', v: '2000W' }, { l: 'Warranty', v: '1 year' }],
          }
        ],
      },
      coffee: {
        name: 'Coffee Machines',
        emoji: '☕',
        label: 'Brew Perfectly',
        products: [
          {
            id: 'k-co-1',
            badge: 'New',
            emoji: '☕',
            name: 'Barista Pro Espresso Machine',
            model: 'Model BPX-900 / Dual Boiler',
            desc: 'Craft café-quality espresso at home with precision temperature control and built-in grinder.',
            image: 'prod-coffee-1',
            features: ['15-bar pressure pump', 'Built-in burr grinder', 'Dual boiler'],
            specs: [{ l: 'Pressure', v: '15 bar' }, { l: 'Wattage', v: '1600W' }, { l: 'Warranty', v: '2 years' }],
          }
        ],
      },
    },
  },
  furniture: {
    id: 'furniture',
    label: 'Furniture Collection',
    title: 'Spaces That\nFeel Like Home.',
    sub: 'Thoughtfully designed furniture for every room — built to last, made to be lived in.',
    emoji: '🛋️',
    image: 'hero-furniture',
    theme: 'bg-stone-100',
    groups: {
      sofas: {
        name: 'Sofas',
        emoji: '🛋️',
        label: 'Living Room',
        products: [
          {
            id: 'f-so-1',
            badge: 'Best Seller',
            emoji: '🛋️',
            name: 'Oslo Modular Sofa',
            model: 'Linen / 3-Seater / Ash Grey',
            desc: 'A timeless Scandinavian sofa with a solid oak frame and premium linen upholstery.',
            image: 'prod-sofa-1',
            features: ['Solid oak frame', 'HD foam cushions', 'Stain-resistant fabric'],
            specs: [{ l: 'Dimensions', v: '240×90×82 cm' }, { l: 'Frame', v: 'Solid oak' }, { l: 'Warranty', v: '5 years' }],
          }
        ],
      },
      beds: {
        name: 'Beds',
        emoji: '🛏️',
        label: 'Bedroom',
        products: [
          {
            id: 'f-be-1',
            badge: 'New',
            emoji: '🛏️',
            name: 'Haven Platform Bed Frame',
            model: 'King Size / Walnut Veneer',
            desc: 'A low-profile platform bed in walnut veneer with integrated USB ports.',
            image: 'prod-bed-1',
            features: ['Solid pine slat system', 'Walnut veneer', 'USB ports included'],
            specs: [{ l: 'Size', v: 'King' }, { l: 'USB Ports', v: '4 total' }, { l: 'Warranty', v: '2 years' }],
          }
        ],
      },
      chairs: {
        name: 'Chairs',
        emoji: '🪑',
        label: 'Seating',
        products: [
          {
            id: 'f-ch-1',
            badge: 'Popular',
            emoji: '🪑',
            name: 'Ember Executive Chair',
            model: 'Ergonomic / Charcoal Mesh',
            desc: 'Work comfortably for hours with full lumbar support and breathable 3D mesh.',
            image: 'prod-chair-1',
            features: ['Lumbar support', '4D armrests', 'Breathable mesh'],
            specs: [{ l: 'Weight Cap.', v: '150 kg' }, { l: 'Material', v: 'Mesh/Alloy' }, { l: 'Warranty', v: '3 years' }],
          }
        ],
      },
    },
  },
  gaming: {
    id: 'gaming',
    label: 'Gaming Collection',
    title: 'Play at the\nHighest Level.',
    sub: 'The latest consoles, controllers, and accessories — for every kind of gamer.',
    emoji: '🎮',
    image: 'hero-gaming',
    theme: 'bg-indigo-50',
    groups: {
      consoles: {
        name: 'Consoles',
        emoji: '🕹️',
        label: 'Next-Gen Platforms',
        products: [
          {
            id: 'g-co-1',
            badge: 'Popular',
            emoji: '🎮',
            name: 'PlayStation 5 Console',
            model: 'Disc Edition',
            desc: 'Experience lightning-fast loading, haptic feedback, and a new generation of exclusives.',
            image: 'prod-ps5',
            features: ['825GB custom NVMe SSD', 'DualSense haptics', '4K @ 120fps'],
            specs: [{ l: 'CPU', v: '8-core AMD Zen 2' }, { l: 'Storage', v: '825GB SSD' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-co-2',
            badge: 'New',
            emoji: '🟢',
            name: 'Xbox Series X',
            model: '1TB Edition',
            desc: 'The most powerful Xbox ever — 12 teraflops of raw GPU power and Quick Resume.',
            image: 'prod-xbox',
            features: ['12 TFLOPS GPU', 'Quick Resume', 'Xbox Velocity Architecture'],
            specs: [{ l: 'CPU', v: '8-core AMD Zen 2' }, { l: 'GPU', v: '12 TFLOPS' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-co-3',
            emoji: '🔴',
            name: 'Nintendo Switch OLED',
            model: 'White Edition',
            desc: 'The versatile Nintendo Switch with a vibrant 7-inch OLED screen.',
            image: 'prod-switch',
            features: ['7-inch OLED display', 'Wired LAN port', '64GB storage'],
            specs: [{ l: 'Screen', v: '7-inch OLED' }, { l: 'Battery', v: '4.5-9 hrs' }, { l: 'Warranty', v: '1 year' }],
          }
        ],
      },
      controllers: {
        name: 'Controllers',
        emoji: '🕹️',
        label: 'Precision Control',
        products: [
          {
            id: 'g-ct-1',
            badge: 'Popular',
            emoji: '🕹️',
            name: 'DualSense Wireless Controller',
            model: 'Midnight Black Edition',
            desc: 'The DualSense for PS5 — adaptive triggers and haptic feedback.',
            image: 'prod-controller-1',
            features: ['Adaptive triggers', 'Haptic actuators', 'Built-in mic'],
            specs: [{ l: 'Connectivity', v: 'Bluetooth 5.1' }, { l: 'Battery', v: '~12 hours' }, { l: 'Warranty', v: '1 year' }],
          }
        ],
      },
      accessories: {
        name: 'Accessories',
        emoji: '🎧',
        label: 'Level Up Your Setup',
        products: [
          {
            id: 'g-ac-1',
            badge: 'New',
            emoji: '🎧',
            name: 'SteelSeries Arctis Nova Pro',
            model: 'Wireless / Multi-System',
            desc: 'Reference-class gaming headset with active noise cancellation.',
            image: 'prod-headset-1',
            features: ['Active Noise Cancellation', 'Dual wireless', 'Hot-swap batteries'],
            specs: [{ l: 'Frequency', v: '10-40k Hz' }, { l: 'ANC', v: 'Yes' }, { l: 'Warranty', v: '1 year' }],
          }
        ],
      },
    },
  },
};

export function getAllProducts() {
  const products: Product[] = [];
  Object.values(CATALOG).forEach((cat) => {
    Object.values(cat.groups).forEach((group) => {
      products.push(...group.products);
    });
  });
  return products;
}

export function getProductById(id: string) {
  for (const cat of Object.values(CATALOG)) {
    for (const group of Object.values(cat.groups)) {
      const p = group.products.find((prod) => prod.id === id);
      if (p) return { product: p, category: cat, group };
    }
  }
  return null;
}
