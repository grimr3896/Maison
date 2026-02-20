export type Product = {
  id: string;
  badge?: string;
  emoji: string;
  name: string;
  model: string;
  desc: string;
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
            features: ['1200W peak power motor', '6-blade hardened stainless steel', '64oz BPA-free container'],
            specs: [{ l: 'Capacity', v: '64 oz' }, { l: 'Motor', v: '1200W' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'k-bl-2',
            emoji: '🫙',
            name: 'NutriBlend Compact 600',
            model: 'Model NB-600 / Personal',
            desc: 'A sleek personal blender perfect for single-serve smoothies and protein shakes.',
            features: ['600W efficient motor', '500ml travel cup', 'One-touch operation'],
            specs: [{ l: 'Capacity', v: '500ml' }, { l: 'Motor', v: '600W' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'k-bl-3',
            emoji: '🌪️',
            name: 'PowerChef Professional',
            model: 'Model PC-1500',
            desc: 'Industrial grade blending for the home chef who demands the best performance.',
            features: ['1500W heavy duty motor', 'Variable speed dial', 'Pulse function'],
            specs: [{ l: 'Motor', v: '1500W' }, { l: 'Speeds', v: 'Infinite' }, { l: 'Warranty', v: '5 years' }],
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
            features: ['8-litre XXL capacity', '12 digital presets', '360° air circulation'],
            specs: [{ l: 'Capacity', v: '8 litres' }, { l: 'Wattage', v: '2000W' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'k-fr-2',
            emoji: '🍗',
            name: 'SlimFry Compact 3.5L',
            model: 'Model SF-3.5 / Analogue',
            desc: 'A compact analogue air fryer ideal for 1–2 people with simple dial controls.',
            features: ['3.5-litre basket', 'Analogue dials', 'Non-stick basket'],
            specs: [{ l: 'Capacity', v: '3.5 litres' }, { l: 'Wattage', v: '1400W' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'k-fr-3',
            badge: 'New',
            emoji: '🥓',
            name: 'DualZone Crisper',
            model: 'Model DZ-10 / Pro',
            desc: 'Two independent baskets allow you to cook two different foods in two different ways at the same time.',
            features: ['10-litre total capacity', 'Dual Zone technology', 'Match Cook feature'],
            specs: [{ l: 'Capacity', v: '10 litres' }, { l: 'Zones', v: '2' }, { l: 'Warranty', v: '2 years' }],
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
            features: ['15-bar pressure pump', 'Built-in burr grinder', 'Dual boiler'],
            specs: [{ l: 'Pressure', v: '15 bar' }, { l: 'Wattage', v: '1600W' }, { l: 'Warranty', v: '2 years' }],
          },
          {
            id: 'k-co-2',
            emoji: '🫖',
            name: 'BrewMaster Drip Coffee Maker',
            model: 'Model BM-12 / 12-Cup',
            desc: 'A reliable 12-cup drip coffee maker with a thermal carafe to keep coffee hot.',
            features: ['12-cup thermal carafe', 'Programmable timer', 'Adjustable strength'],
            specs: [{ l: 'Capacity', v: '12 cups' }, { l: 'Timer', v: '24-hour' }, { l: 'Warranty', v: '2 years' }],
          },
          {
            id: 'k-co-3',
            emoji: '🧊',
            name: 'ColdBrew Station',
            model: 'Model CB-2',
            desc: 'Smooth, low-acid cold brew concentrate from the comfort of your fridge.',
            features: ['2L glass carafe', 'Fine mesh filter', 'Compact design'],
            specs: [{ l: 'Capacity', v: '2.0L' }, { l: 'Type', v: 'Immersion' }, { l: 'Warranty', v: '1 year' }],
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
            features: ['Solid oak frame', 'HD foam cushions', 'Stain-resistant fabric'],
            specs: [{ l: 'Dimensions', v: '240×90×82 cm' }, { l: 'Frame', v: 'Solid oak' }, { l: 'Warranty', v: '5 years' }],
          },
          {
            id: 'f-so-2',
            emoji: '🪑',
            name: 'Velo Velvet Loveseat',
            model: 'Velvet / 2-Seater / Dusty Rose',
            desc: 'A compact two-seater loveseat in plush velvet with tapered solid wood legs.',
            features: ['Plush velvet', 'Solid wood legs', 'Sinuous springs'],
            specs: [{ l: 'Dimensions', v: '158×80×78 cm' }, { l: 'Weight Cap.', v: '200 kg' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'f-so-3',
            badge: 'New',
            emoji: '🛋️',
            name: 'Cloud Corner Sectional',
            model: 'Performance Fabric / 5-Seater',
            desc: 'The ultimate in comfort, this deep-seated sectional is designed for long movie marathons.',
            features: ['Deep seating', 'Feather blend filling', 'Removable covers'],
            specs: [{ l: 'Configuration', v: 'L-Shape' }, { l: 'Depth', v: '105 cm' }, { l: 'Warranty', v: '10 years' }],
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
            features: ['Solid pine slat system', 'Walnut veneer', 'USB ports included'],
            specs: [{ l: 'Size', v: 'King' }, { l: 'USB Ports', v: '4 total' }, { l: 'Warranty', v: '2 years' }],
          },
          {
            id: 'f-be-2',
            emoji: '🌙',
            name: 'Arcadia Storage Bed',
            model: 'Queen Size / White Oak',
            desc: 'A queen bed frame with four deep hydraulic-lift drawers built into the base.',
            features: ['4 storage drawers', 'White oak finish', 'Reinforced beam'],
            specs: [{ l: 'Size', v: 'Queen' }, { l: 'Storage', v: '4 drawers' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'f-be-3',
            emoji: '🛌',
            name: 'Zen Canopy Bed',
            model: 'Matte Black / King',
            desc: 'A minimalist take on the classic canopy bed, featuring clean lines and a sturdy steel frame.',
            features: ['Powder-coated steel', 'Minimalist design', 'Easy assembly'],
            specs: [{ l: 'Size', v: 'King' }, { l: 'Material', v: 'Steel' }, { l: 'Warranty', v: '5 years' }],
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
            features: ['Lumbar support', '4D armrests', 'Breathable mesh'],
            specs: [{ l: 'Weight Cap.', v: '150 kg' }, { l: 'Material', v: 'Mesh/Alloy' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'f-ch-2',
            emoji: '🎋',
            name: 'Ren Dining Chair',
            model: 'Solid Ash / Set of 2',
            desc: 'A minimal, sturdy dining chair in solid ash with a contoured seat.',
            features: ['Solid ash frame', 'Contoured seat', 'Stackable design'],
            specs: [{ l: 'Sold As', v: 'Set of 2' }, { l: 'Material', v: 'Solid Ash' }, { l: 'Warranty', v: '2 years' }],
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
            features: ['12 TFLOPS GPU', 'Quick Resume', 'Xbox Velocity Architecture'],
            specs: [{ l: 'CPU', v: '8-core AMD Zen 2' }, { l: 'GPU', v: '12 TFLOPS' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-co-3',
            emoji: '🔴',
            name: 'Nintendo Switch OLED',
            model: 'White Edition',
            desc: 'The versatile Nintendo Switch with a vibrant 7-inch OLED screen.',
            features: ['7-inch OLED display', 'Wired LAN port', '64GB storage'],
            specs: [{ l: 'Screen', v: '7-inch OLED' }, { l: 'Battery', v: '4.5-9 hrs' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-co-4',
            badge: 'Limited',
            emoji: '💻',
            name: 'Maison Gaming PC',
            model: 'Vortex G1 / RTX 4080',
            desc: 'A pre-built powerhouse designed for ultimate performance and silent operation.',
            features: ['RTX 4080 GPU', '32GB DDR5 RAM', 'Custom liquid cooling'],
            specs: [{ l: 'GPU', v: 'RTX 4080' }, { l: 'RAM', v: '32GB' }, { l: 'Warranty', v: '2 years' }],
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
            features: ['Adaptive triggers', 'Haptic actuators', 'Built-in mic'],
            specs: [{ l: 'Connectivity', v: 'Bluetooth 5.1' }, { l: 'Battery', v: '~12 hours' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-ct-2',
            emoji: '💚',
            name: 'Xbox Elite Series 2',
            model: 'Carbon Black',
            desc: 'The professional-grade Xbox controller with adjustable tension sticks.',
            features: ['Adjustable thumbsticks', 'Hair trigger locks', '40hr battery'],
            specs: [{ l: 'Paddles', v: '4 interchangeable' }, { l: 'Battery', v: '~40 hours' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-ct-3',
            emoji: '🖱️',
            name: 'Apex Light Wireless Mouse',
            model: 'Model LX-1',
            desc: 'An ultra-lightweight gaming mouse with professional grade 30K DPI sensor.',
            features: ['62g weight', '30K DPI sensor', '80hr battery'],
            specs: [{ l: 'Weight', v: '62g' }, { l: 'Sensor', v: '30K DPI' }, { l: 'Warranty', v: '2 years' }],
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
            features: ['Active Noise Cancellation', 'Dual wireless', 'Hot-swap batteries'],
            specs: [{ l: 'Frequency', v: '10-40k Hz' }, { l: 'ANC', v: 'Yes' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'g-ac-2',
            emoji: '💾',
            name: 'Seagate Game Drive 4TB',
            model: 'External SSD / USB 3.2',
            desc: 'Expand your console or PC storage with this ultra-fast 4TB external SSD.',
            features: ['4TB capacity', 'USB 3.2 Gen 2', 'Plug-and-play'],
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
