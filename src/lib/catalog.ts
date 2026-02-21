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
            desc: 'A high-performance countertop blender that handles everything from smoothies to nut butters. Hardened stainless steel blades and a 1200W motor power through ice effortlessly.',
            image: 'prod-blender-1',
            features: ['1200W peak power motor', '6-blade hardened stainless steel', '64oz BPA-free container', '10 variable speeds'],
            specs: [{ l: 'Capacity', v: '64 oz' }, { l: 'Motor', v: '1200W' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'k-bl-2',
            emoji: '🫙',
            name: 'NutriBlend Compact 600',
            model: 'Model NB-600 / Personal',
            desc: 'A sleek personal blender perfect for single-serve smoothies and protein shakes. Lightweight, powerful, and easy to clean.',
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
            desc: 'Enjoy healthier versions of your favourite fried foods with up to 80% less oil. The 8-litre XXL basket handles family meals effortlessly.',
            image: 'prod-fryer-1',
            features: ['8-litre XXL capacity', '12 digital presets', '360° air circulation'],
            specs: [{ l: 'Capacity', v: '8 litres' }, { l: 'Wattage', v: '2000W' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'k-fr-2',
            emoji: '🍗',
            name: 'SlimFry Compact 3.5L',
            model: 'Model SF-3.5 / Analogue',
            desc: 'A compact analogue air fryer ideal for 1–2 people. Simple dial controls and a small footprint perfect for studio kitchens.',
            image: 'prod-fryer-2',
            features: ['3.5-litre basket', 'Analogue dials', 'Non-stick removable basket'],
            specs: [{ l: 'Capacity', v: '3.5L' }, { l: 'Wattage', v: '1400W' }, { l: 'Timer', v: '60 min' }],
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
            desc: 'Craft café-quality espresso at home with precision temperature control and a built-in burr grinder.',
            image: 'prod-coffee-1',
            features: ['15-bar pressure pump', 'Built-in burr grinder', 'Dual boiler'],
            specs: [{ l: 'Pressure', v: '15 bar' }, { l: 'Wattage', v: '1600W' }, { l: 'Warranty', v: '2 years' }],
          },
          {
            id: 'k-co-2',
            emoji: '🫖',
            name: 'BrewMaster Drip Coffee Maker',
            model: 'Model BM-12 / 12-Cup',
            desc: 'A reliable 12-cup drip coffee maker with a thermal carafe to keep coffee hot for hours.',
            image: 'prod-coffee-2',
            features: ['12-cup thermal carafe', '24-hour timer', 'Adjustable brew strength'],
            specs: [{ l: 'Capacity', v: '1.5L' }, { l: 'Timer', v: '24hr' }, { l: 'Wattage', v: '900W' }],
          }
        ],
      },
      juicers: {
        name: 'Juicers',
        emoji: '🍊',
        label: 'Press Fresh',
        products: [
          {
            id: 'k-ju-1',
            badge: 'Popular',
            emoji: '🍊',
            name: 'SlowPress Cold Juicer Pro',
            model: 'Model CPJ-500 / Masticating',
            desc: 'Extract maximum nutrients with this quiet slow-speed masticating juicer. Handles leafy greens and hard vegetables.',
            image: 'prod-juicer-1',
            features: ['80 RPM slow motor', 'Ultra-quiet operation', 'Auto-clean mode'],
            specs: [{ l: 'Speed', v: '80 RPM' }, { l: 'Noise', v: '< 60dB' }, { l: 'Weight', v: '5.8 kg' }],
          },
          {
            id: 'k-ju-2',
            emoji: '🍋',
            name: 'CitrusSpin Electric Juicer',
            model: 'Model CS-2 / Centrifugal',
            desc: 'A classic centrifugal juicer for quick, fresh citrus and soft fruit juice. Auto-reversing reamer adapts to any size.',
            image: 'prod-juicer-2',
            features: ['Two-speed motor', 'Auto-reversing reamer', 'Dishwasher-safe parts'],
            specs: [{ l: 'Motor', v: '100W' }, { l: 'Speeds', v: '2' }, { l: 'Finish', v: 'Matte White' }],
          }
        ],
      }
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
            desc: 'A timeless Scandinavian sofa with a solid oak frame and premium linen upholstery. Modular sections fit any space.',
            image: 'prod-sofa-1',
            features: ['Solid oak frame', 'HD foam cushions', 'Stain-resistant fabric'],
            specs: [{ l: 'Dimensions', v: '240×90×82 cm' }, { l: 'Frame', v: 'Solid oak' }, { l: 'Warranty', v: '5 years' }],
          },
          {
            id: 'f-so-2',
            emoji: '🪑',
            name: 'Velo Velvet Loveseat',
            model: 'Velvet / 2-Seater / Dusty Rose',
            desc: 'A compact two-seater loveseat in plush velvet with tapered solid wood legs and a low-profile silhouette.',
            image: 'prod-sofa-2',
            features: ['Plush velvet upholstery', 'Solid wood legs', 'Washable covers'],
            specs: [{ l: 'Dimensions', v: '158×80×78 cm' }, { l: 'Weight Cap.', v: '200 kg' }, { l: 'Assembly', v: 'Legs only' }],
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
            desc: 'A low-profile platform bed in walnut veneer with integrated USB ports and a solid wood slat system.',
            image: 'prod-bed-1',
            features: ['Solid pine slat system', 'Walnut veneer', 'USB ports included'],
            specs: [{ l: 'Size', v: 'King' }, { l: 'USB Ports', v: '4 total' }, { l: 'Warranty', v: '2 years' }],
          },
          {
            id: 'f-be-2',
            emoji: '🌙',
            name: 'Arcadia Storage Bed',
            model: 'Queen Size / White Oak',
            desc: 'A queen bed frame with deep hydraulic-lift drawers built into the base for smart bedroom storage.',
            image: 'prod-bed-2',
            features: ['Hydraulic-lift drawers', 'White oak veneer', 'Slatted base'],
            specs: [{ l: 'Size', v: 'Queen' }, { l: 'Storage', v: '4 drawers' }, { l: 'Material', v: 'White Oak' }],
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
            desc: 'Work comfortably for hours with full lumbar support, adjustable headrest, and breathable 3D mesh.',
            image: 'prod-chair-1',
            features: ['Lumbar support', '4D armrests', 'Breathable mesh'],
            specs: [{ l: 'Weight Cap.', v: '150 kg' }, { l: 'Material', v: 'Mesh/Alloy' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'f-ch-2',
            emoji: '🎋',
            name: 'Ren Dining Chair',
            model: 'Solid Ash / Set of 2',
            desc: 'A minimal, sturdy dining chair in solid ash with a contoured seat. Sold as a set of two.',
            image: 'prod-chair-2',
            features: ['Solid ash frame', 'Contoured seat', 'Stackable design'],
            specs: [{ l: 'Material', v: 'Solid Ash' }, { l: 'Sold As', v: 'Set of 2' }, { l: 'Warranty', v: '2 years' }],
          }
        ],
      },
      tables: {
        name: 'Tables',
        emoji: '🪵',
        label: 'Dining & Work',
        products: [
          {
            id: 'f-ta-1',
            badge: 'New',
            emoji: '🪵',
            name: 'Slab Dining Table',
            model: '180cm / Solid Acacia',
            desc: 'A statement dining table in solid acacia with natural live-edge detail and a matte oil finish. Seats 6.',
            image: 'prod-table-1',
            features: ['Solid acacia top', 'Live-edge detail', 'Steel hairpin legs'],
            specs: [{ l: 'Dimensions', v: '180×90×76 cm' }, { l: 'Seats', v: '6' }, { l: 'Weight', v: '38 kg' }],
          },
          {
            id: 'f-ta-2',
            emoji: '💻',
            name: 'Float Adjustable Desk',
            model: 'Electric / 160cm / White',
            desc: 'A motorised sit-stand desk with programmable height presets and a wide surface for flexibility.',
            image: 'prod-table-2',
            features: ['Dual-motor adjustment', 'Height presets', 'Cable management'],
            specs: [{ l: 'Range', v: '62–128 cm' }, { l: 'Max Load', v: '80 kg' }, { l: 'Warranty', v: '5 years' }],
          }
        ],
      }
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
            desc: 'Experience lightning-fast loading, haptic feedback, and a new generation of exclusives redefined.',
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
            desc: 'The most powerful Xbox ever — 12 teraflops of raw GPU power, Quick Resume, and 4K gaming.',
            image: 'prod-xbox',
            features: ['12 TFLOPS GPU', 'Quick Resume', 'Xbox Velocity Architecture'],
            specs: [{ l: 'CPU', v: '8-core AMD Zen 2' }, { l: 'GPU', v: '12 TFLOPS' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-co-3',
            emoji: '🔴',
            name: 'Nintendo Switch OLED',
            model: 'White Edition',
            desc: 'The versatile Nintendo Switch with a vibrant 7-inch OLED screen. Play on TV or handheld.',
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
            desc: 'The DualSense for PS5 — adaptive triggers and haptic feedback for deeper immersion.',
            image: 'prod-controller-1',
            features: ['Adaptive triggers', 'Haptic actuators', 'Built-in mic'],
            specs: [{ l: 'Connectivity', v: 'Bluetooth 5.1' }, { l: 'Battery', v: '~12 hours' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-ct-2',
            emoji: '💚',
            name: 'Xbox Elite Series 2',
            model: 'Carbon Black',
            desc: 'The professional-grade Xbox controller — adjustable thumbstick tension and hair trigger locks.',
            image: 'prod-controller-2',
            features: ['Adjustable tension', 'Hair trigger locks', '40-hour battery'],
            specs: [{ l: 'Paddles', v: '4 interchangeable' }, { l: 'Battery', v: '~40 hrs' }, { l: 'Weight', v: '345g' }],
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
            desc: 'Reference-class gaming headset with active noise cancellation and hot-swap batteries.',
            image: 'prod-headset-1',
            features: ['Active Noise Cancellation', 'Dual wireless', 'Hot-swap batteries'],
            specs: [{ l: 'Frequency', v: '10-40k Hz' }, { l: 'ANC', v: 'Yes' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-ac-2',
            emoji: '💾',
            name: 'Seagate Game Drive 4TB',
            model: 'External SSD / USB 3.2',
            desc: 'Expand your console or PC storage with this ultra-fast external SSD. Plug-and-play ready.',
            image: 'prod-storage-1',
            features: ['4TB capacity', 'USB 3.2 Gen 2', 'Rugged aluminium'],
            specs: [{ l: 'Capacity', v: '4TB' }, { l: 'Speed', v: '1000MB/s' }, { l: 'Warranty', v: '3 years' }],
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
