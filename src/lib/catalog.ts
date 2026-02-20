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
    theme: 'bg-stone-900',
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
            desc: 'A high-performance countertop blender that handles everything from smoothies to nut butters. Hardened stainless steel blades and a 1200W motor power through ice and fibrous vegetables effortlessly.',
            features: ['1200W peak power motor', '6-blade hardened stainless steel', '64oz BPA-free Tritan container', '10 variable speeds + pulse control', 'Self-cleaning mode in 30 seconds', 'Quiet shield — under 70dB'],
            specs: [{ l: 'Capacity', v: '64 oz / 1.9L' }, { l: 'Motor', v: '1200W peak' }, { l: 'Blades', v: '6-tip hardened steel' }, { l: 'Speeds', v: '10 + pulse' }, { l: 'Noise', v: '< 70dB' }, { l: 'Weight', v: '4.2 kg' }, { l: 'Dimensions', v: '20×18×46 cm' }, { l: 'Warranty', v: '3 years' }],
          },
          {
            id: 'k-bl-2',
            emoji: '🫙',
            name: 'NutriBlend Compact 600',
            model: 'Model NB-600 / Personal',
            desc: 'A sleek personal blender perfect for single-serve smoothies and protein shakes. Lightweight, powerful, and easy to clean — just blend and go.',
            features: ['600W efficient motor', '500ml BPA-free travel cup with lid', 'One-touch blending operation', 'Dishwasher-safe cup and blade', 'Compact footprint for small kitchens'],
            specs: [{ l: 'Capacity', v: '500ml' }, { l: 'Motor', v: '600W' }, { l: 'Operation', v: 'One-touch' }, { l: 'Weight', v: '1.1 kg' }, { l: 'Dimensions', v: '10×10×38 cm' }, { l: 'Dishwasher Safe', v: 'Cup & blade' }, { l: 'Voltage', v: '220–240V' }, { l: 'Warranty', v: '1 year' }],
          },
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
            desc: 'Enjoy healthier versions of your favourite fried foods with up to 80% less oil. The 8-litre XXL basket handles family meals, and 12 preset programmes make cooking effortless.',
            features: ['8-litre XXL capacity', '12 digital preset programmes', 'Rapid 360° hot air circulation', 'Dishwasher-safe basket and tray', 'Keep-warm up to 30 min', 'Real-time temperature display'],
            specs: [{ l: 'Capacity', v: '8 litres' }, { l: 'Temperature', v: '40°C–200°C' }, { l: 'Wattage', v: '2000W' }, { l: 'Controls', v: 'Digital touchscreen' }, { l: 'Presets', v: '12' }, { l: 'Dimensions', v: '38×33×32 cm' }, { l: 'Weight', v: '5.8 kg' }, { l: 'Warranty', v: '1 year' }],
          },
          {
            id: 'k-fr-2',
            emoji: '🍗',
            name: 'SlimFry Compact 3.5L',
            model: 'Model SF-3.5 / Analogue',
            desc: 'A compact analogue air fryer ideal for 1–2 people. Simple dial controls, a 3.5-litre basket, and a smaller footprint perfect for studio kitchens.',
            features: ['3.5-litre basket', 'Analogue temperature and timer dials', 'Up to 200°C / 60-minute timer', 'Non-stick removable basket', 'Overheat auto-shutoff'],
            specs: [{ l: 'Capacity', v: '3.5 litres' }, { l: 'Temperature', v: '80°C–200°C' }, { l: 'Timer', v: '60 min max' }, { l: 'Wattage', v: '1400W' }, { l: 'Controls', v: 'Analogue dials' }, { l: 'Dimensions', v: '28×25×30 cm' }, { l: 'Weight', v: '3.4 kg' }, { l: 'Warranty', v: '1 year' }],
          },
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
    theme: 'bg-slate-900',
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
            desc: 'A timeless Scandinavian sofa with a solid oak frame and premium linen upholstery. Modular — add or remove sections to fit any living space.',
            features: ['Solid oak frame with reinforced joinery', 'High-density foam + fibre blend cushions', 'Stain-resistant linen blend upholstery', '4 neutral colourways available', 'Modular — connects with Ottoman or Chaise', 'Assembly guide and tools included'],
            specs: [{ l: 'Dimensions', v: '240×90×82 cm' }, { l: 'Seat Height', v: '44 cm' }, { l: 'Frame', v: 'Solid oak' }, { l: 'Upholstery', v: 'Linen blend' }, { l: 'Cushion', v: 'HD foam + fibre' }, { l: 'Weight Cap.', v: '300 kg' }, { l: 'Assembly', v: 'Required' }, { l: 'Warranty', v: '5 years' }],
          },
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
    theme: 'bg-indigo-950',
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
            desc: 'Experience lightning-fast loading, haptic feedback, and a new generation of PlayStation exclusives.',
            features: ['825GB custom NVMe SSD', 'DualSense — haptic feedback & adaptive triggers', 'Tempest 3D AudioTech', '4K gaming at up to 120fps'],
            specs: [{ l: 'CPU', v: 'AMD Zen 2, 8-core' }, { l: 'RAM', v: '16GB GDDR6' }, { l: 'Storage', v: '825GB custom SSD' }],
          },
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
