'use server';
/**
 * @fileOverview An AI chat assistant for product inquiries and suggestions for MAISON store.
 *
 * - productInquiryChat - A function that handles product inquiries and suggestions.
 * - ProductInquiryChatInput - The input type for the productInquiryChat function.
 * - ProductInquiryChatOutput - The return type for the productInquiryChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductCatalogItemSchema = z.object({
  id: z.string().describe("Unique identifier for the product."),
  name: z.string().describe("The name of the product."),
  model: z.string().optional().describe("The model name or specific variant of the product."),
  desc: z.string().describe("A brief description of the product."),
  features: z.array(z.string()).describe("Key features of the product."),
  specs: z.array(z.string()).describe("Specifications of the product, formatted as 'Label: Value'."),
  category: z.string().describe("The main category of the product (e.g., 'Kitchen Collection')."),
  groupName: z.string().describe("The sub-group within the category (e.g., 'Blenders')."),
  emoji: z.string().optional().describe("An emoji representing the product."),
  badge: z.string().optional().describe("A badge indicating popularity or new status (e.g., 'Popular', 'New')."),
});

const ProductInquiryChatInputSchema = z.object({
  query: z.string().describe("The user's question or request for product suggestions."),
  currentProductId: z.string().optional().describe("The ID of the product currently being viewed by the user, if any. Use this to provide context-specific answers or suggestions."),
  productCatalog: z.array(ProductCatalogItemSchema).describe("A JSON array of all available products with their details. This catalog is essential for answering questions and making informed suggestions."),
});
export type ProductInquiryChatInput = z.infer<typeof ProductInquiryChatInputSchema>;

const ProductInquiryChatOutputSchema = z.object({
  response: z.string().describe("The AI's answer to the user's question, detailed product information, or helpful suggestions."),
  suggestedProductIds: z.array(z.string()).optional().describe("An optional array of product IDs that the AI recommends, if applicable. These should be actual IDs from the product catalog."),
});
export type ProductInquiryChatOutput = z.infer<typeof ProductInquiryChatOutputSchema>;

// Raw catalog data extracted from the provided HTML. In a real application, this would ideally be loaded from a data source.
const RAW_CATALOG_DATA = {
  kitchen: {
    label: 'Kitchen Collection',
    title: 'Cook Smarter,\nLive Better.',
    sub: 'Premium kitchen appliances for every kind of cook — from morning coffee rituals to family feasts.',
    emoji: '🍳',
    theme: 'kh',
    navId: 'nb-kitchen',
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
            specs: [{l:'Capacity',v:'64 oz / 1.9L'},{l:'Motor',v:'1200W peak'},{l:'Blades',v:'6-tip hardened steel'},{l:'Speeds',v:'10 + pulse'},{l:'Noise',v:'< 70dB'},{l:'Weight',v:'4.2 kg'},{l:'Dimensions',v:'20×18×46 cm'},{l:'Warranty',v:'3 years'}]
          },
          {
            id: 'k-bl-2',
            emoji: '🫙',
            name: 'NutriBlend Compact 600',
            model: 'Model NB-600 / Personal',
            desc: 'A sleek personal blender perfect for single-serve smoothies and protein shakes. Lightweight, powerful, and easy to clean — just blend and go.',
            features: ['600W efficient motor', '500ml BPA-free travel cup with lid', 'One-touch blending operation', 'Dishwasher-safe cup and blade', 'Compact footprint for small kitchens'],
            specs: [{l:'Capacity',v:'500ml'},{l:'Motor',v:'600W'},{l:'Operation',v:'One-touch'},{l:'Weight',v:'1.1 kg'},{l:'Dimensions',v:'10×10×38 cm'},{l:'Dishwasher Safe',v:'Cup & blade'},{l:'Voltage',v:'220–240V'},{l:'Warranty',v:'1 year'}]
          }
        ]
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
            specs: [{l:'Capacity',v:'8 litres'},{l:'Temperature',v:'40°C–200°C'},{l:'Wattage',v:'2000W'},{l:'Controls',v:'Digital touchscreen'},{l:'Presets',v:'12'},{l:'Dimensions',v:'38×33×32 cm'},{l:'Weight',v:'5.8 kg'},{l:'Warranty',v:'1 year'}]
          },
          {
            id: 'k-fr-2',
            emoji: '🍗',
            name: 'SlimFry Compact 3.5L',
            model: 'Model SF-3.5 / Analogue',
            desc: 'A compact analogue air fryer ideal for 1–2 people. Simple dial controls, a 3.5-litre basket, and a smaller footprint perfect for studio kitchens.',
            features: ['3.5-litre basket', 'Analogue temperature and timer dials', 'Up to 200°C / 60-minute timer', 'Non-stick removable basket', 'Overheat auto-shutoff'],
            specs: [{l:'Capacity',v:'3.5 litres'},{l:'Temperature',v:'80°C–200°C'},{l:'Timer',v:'60 min max'},{l:'Wattage',v:'1400W'},{l:'Controls',v:'Analogue dials'},{l:'Dimensions',v:'28×25×30 cm'},{l:'Weight',v:'3.4 kg'},{l:'Warranty',v:'1 year'}]
          }
        ]
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
            desc: 'Craft café-quality espresso at home with precision temperature control, a built-in burr grinder, and a steam wand for lattes and cappuccinos.',
            features: ['15-bar pressure pump', 'Built-in conical burr grinder (5 settings)', 'Dual boiler — brew and steam simultaneously', 'PID temperature control ±1°C', 'Auto-clean and descale alerts', '2L removable water tank'],
            specs: [{l:'Tank',v:'2.0L'},{l:'Pressure',v:'15 bar'},{l:'Wattage',v:'1600W'},{l:'Grinder',v:'Burr, 5 settings'},{l:'Display',v:'LED'},{l:'Dimensions',v:'32×28×38 cm'},{l:'Weight',v:'8.4 kg'},{l:'Warranty',v:'2 years'}]
          },
          {
            id: 'k-co-2',
            emoji: '🫖',
            name: 'BrewMaster Drip Coffee Maker',
            model: 'Model BM-12 / 12-Cup',
            desc: 'A reliable 12-cup drip coffee maker with a thermal carafe to keep coffee hot for hours — no heating plate needed. Programmable timer sets your brew before you wake.',
            features: ['12-cup double-wall thermal carafe', '24-hour programmable timer', 'Adjustable brew strength', 'Pause & pour mid-brew', 'Auto-shutoff after 2 hours', 'Reusable gold-tone filter'],
            specs: [{l:'Capacity',v:'12 cups / 1.5L'},{l:'Carafe',v:'Thermal stainless'},{l:'Timer',v:'24-hour'},{l:'Filter',v:'Reusable gold-tone'},{l:'Wattage',v:'900W'},{l:'Dimensions',v:'22×18×36 cm'},{l:'Weight',v:'2.6 kg'},{l:'Warranty',v:'2 years'}]
          }
        ]
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
            desc: 'Extract maximum nutrients with this quiet slow-speed masticating juicer. Handles leafy greens, wheatgrass, and hard vegetables with near-silent operation.',
            features: ['80 RPM slow masticating motor', 'Handles leafy greens and wheatgrass', 'Ultra-quiet < 60dB', 'Auto-clean in 10 seconds', 'Wide 8.5cm feed chute', 'Juice and pulp separation'],
            specs: [{l:'Speed',v:'80 RPM'},{l:'Wattage',v:'200W'},{l:'Noise',v:'< 60dB'},{l:'Feed Chute',v:'8.5 cm'},{l:'Material',v:'BPA-free Tritan'},{l:'Dimensions',v:'18×32×42 cm'},{l:'Weight',v:'5.8 kg'},{l:'Warranty',v:'2 years'}]
          },
          {
            id: 'k-ju-2',
            emoji: '🍋',
            name: 'CitrusSpin Electric Juicer',
            model: 'Model CS-2 / Centrifugal',
            desc: 'A classic centrifugal juicer for quick, fresh citrus and soft fruit juice. Auto-reversing reamer adapts to any size fruit.',
            features: ['Two-speed motor for soft and hard fruits', 'Auto-reversing reamer', '2-litre pulp collector', 'Anti-drip spout', 'Dishwasher-safe parts', 'Matte white finish'],
            specs: [{l:'Motor',v:'100W centrifugal'},{l:'Speeds',v:'2'},{l:'Pulp Container',v:'2 litres'},{l:'Finish',v:'Matte white'},{l:'Dimensions',v:'15×15×28 cm'},{l:'Weight',v:'1.4 kg'},{l:'Dishwasher Safe',v:'All removable parts'},{l:'Warranty',v:'1 year'}]
          }
        ]
      }
    }
  },
  furniture: {
    label: 'Furniture Collection',
    title: 'Spaces That\nFeel Like Home.',
    sub: 'Thoughtfully designed furniture for every room — built to last, made to be lived in.',
    emoji: '🛋️',
    theme: 'fh',
    navId: 'nb-furniture',
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
            specs: [{l:'Dimensions',v:'240×90×82 cm'},{l:'Seat Height',v:'44 cm'},{l:'Frame',v:'Solid oak'},{l:'Upholstery',v:'Linen blend'},{l:'Cushion',v:'HD foam + fibre'},{l:'Weight Cap.',v:'300 kg'},{l:'Assembly',v:'Required'},{l:'Warranty',v:'5 years'}]
          },
          {
            id: 'f-so-2',
            emoji: '🪑',
            name: 'Velo Velvet Loveseat',
            model: 'Velvet / 2-Seater / Dusty Rose',
            desc: 'A compact two-seater loveseat in plush velvet with tapered solid wood legs and a low-profile silhouette — perfect for a living room or bedroom corner.',
            features: ['Plush velvet upholstery', 'Solid wood tapered legs', 'Sinuous spring suspension base', 'Removable cushion covers — machine washable', '6 velvet colourways available'],
            specs: [{l:'Dimensions',v:'158×80×78 cm'},{l:'Seat Height',v:'42 cm'},{l:'Legs',v:'Solid beech'},{l:'Upholstery',v:'Plush velvet'},{l:'Weight Cap.',v:'200 kg'},{l:'Assembly',v:'Legs only'},{l:'Seat Depth',v:'54 cm'},{l:'Warranty',v:'3 years'}]
          }
        ]
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
            desc: 'A low-profile platform bed in walnut veneer with a solid wood slat system. No box spring required. USB-A and USB-C ports integrated on both headboard sides.',
            features: ['Solid pine slat system — no box spring needed', 'Walnut veneer on engineered hardwood', 'Floating silhouette with concealed legs', 'USB-A & USB-C ports both sides', 'Button-tufted upholstered headboard', 'Clearance for under-bed storage'],
            specs: [{l:'Mattress Size',v:'King 183×203 cm'},{l:'Height',v:'90 cm'},{l:'Headboard',v:'110 cm tufted'},{l:'Frame',v:'Engineered + walnut veneer'},{l:'Slats',v:'Solid pine'},{l:'USB Ports',v:'2×USB-A, 2×USB-C'},{l:'Assembly',v:'2 persons recommended'},{l:'Warranty',v:'2 years'}]
          },
          {
            id: 'f-be-2',
            emoji: '🌙',
            name: 'Arcadia Storage Bed',
            model: 'Queen Size / White Oak',
            desc: 'A queen bed frame with four deep hydraulic-lift drawers built into the base — ideal for smaller bedrooms needing smart storage.',
            features: ['4 deep hydraulic-lift storage drawers', 'White oak veneer with matte lacquer', 'Reinforced centre support beam', 'Slatted base for mattress breathability', 'Woven fabric headboard panel'],
            specs: [{l:'Mattress Size',v:'Queen 160×200 cm'},{l:'Storage',v:'4 hydraulic drawers'},{l:'Finish',v:'White oak veneer'},{l:'Headboard',v:'Woven fabric'},{l:'Weight Cap.',v:'300 kg'},{l:'Assembly',v:'Required'},{l:'Assembly Time',v:'~90 min'},{l:'Warranty',v:'3 years'}]
          }
        ]
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
            desc: 'Work comfortably for hours with full lumbar support, adjustable headrest, 4D armrests, and a breathable 3D mesh back designed for all-day use.',
            features: ['Adjustable lumbar support system', '3D breathable mesh backrest', '4D armrests — height, depth, width, pivot', 'Seat height, depth, and tilt adjustment', 'Aluminium star base', 'Dual-wheel soft-roll PU casters'],
            specs: [{l:'Seat Width',v:'52 cm'},{l:'Back Height',v:'72 cm'},{l:'Seat Depth Adj.',v:'44–52 cm'},{l:'Weight Cap.',v:'150 kg'},{l:'Backrest',v:'3D mesh'},{l:'Base',v:'Aluminium alloy'},{l:'Casters',v:'Dual PU soft-roll'},{l:'Warranty',v:'3 years'}]
          },
          {
            id: 'f-ch-2',
            emoji: '🎋',
            name: 'Ren Dining Chair',
            model: 'Solid Ash / Set of 2',
            desc: 'A minimal, sturdy dining chair in solid ash with a contoured seat and angled backrest. Sold as a set of two. Stackable for easy storage.',
            features: ['Solid ash wood frame', 'Contoured seat for natural posture', 'Angled backrest for lumbar support', 'Floor-protecting rubber feet', 'Stackable up to 4 high', 'Available natural or walnut-stained'],
            specs: [{l:'Dimensions',v:'44×50×82 cm'},{l:'Seat Height',v:'46 cm'},{l:'Material',v:'Solid ash'},{l:'Weight Cap.',v:'120 kg each'},{l:'Sold As',v:'Set of 2'},{l:'Stackable',v:'Up to 4'},{l:'Finish',v:'Natural or walnut'},{l:'Warranty',v:'2 years'}]
          }
        ]
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
            desc: 'A statement dining table in solid acacia with natural live-edge detail and a matte oil finish. Seats 6 comfortably. Each piece is unique in grain pattern.',
            features: ['Solid acacia wood tabletop', 'Natural live-edge detail on one side', 'Matte food-safe oil finish', 'Powder-coated hairpin steel legs', 'Seats 6 comfortably', 'Unique grain per piece'],
            specs: [{l:'Dimensions',v:'180×90×76 cm'},{l:'Tabletop',v:'Solid acacia, 4cm thick'},{l:'Finish',v:'Matte food-safe oil'},{l:'Legs',v:'Powder-coated steel'},{l:'Seats',v:'6 people'},{l:'Weight',v:'38 kg'},{l:'Assembly',v:'Leg attachment only'},{l:'Warranty',v:'3 years'}]
          },
          {
            id: 'f-ta-2',
            emoji: '💻',
            name: 'Float Height-Adjustable Desk',
            model: 'Electric / 160cm / White',
            desc: 'A motorised sit-stand desk with programmable height presets and a wide 160cm surface — ideal for home office setups that demand flexibility.',
            features: ['Electric dual-motor height adjustment', '3 programmable height presets', '160×80cm tempered surface', 'Built-in cable management tray', 'Anti-collision auto-stop sensor', 'Height range: 62–128 cm'],
            specs: [{l:'Surface',v:'160×80 cm'},{l:'Height Range',v:'62–128 cm'},{l:'Motor',v:'Dual electric'},{l:'Presets',v:'3 programmable'},{l:'Max Load',v:'80 kg'},{l:'Noise',v:'< 50dB'},{l:'Frame',v:'Powder-coated steel'},{l:'Warranty',v:'5 years'}]
          }
        ]
      }
    }
  },
  gaming: {
    label: 'Gaming Collection',
    title: 'Play at the\nHighest Level.',
    sub: 'The latest consoles, controllers, and accessories — for every kind of gamer.',
    emoji: '🎮',
    theme: 'gh',
    navId: 'nb-gaming',
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
            desc: 'Experience lightning-fast loading, haptic feedback, and a new generation of PlayStation exclusives. The custom SSD and DualSense controller redefine what gaming feels like.',
            features: ['825GB custom NVMe SSD', 'DualSense — haptic feedback & adaptive triggers', 'Tempest 3D AudioTech', '4K gaming at up to 120fps', 'Backwards compatible with PS4', '4K UHD Blu-ray disc drive'],
            specs: [{l:'CPU',v:'AMD Zen 2, 8-core @ 3.5GHz'},{l:'GPU',v:'AMD RDNA 2, 10.3 TFLOPS'},{l:'RAM',v:'16GB GDDR6'},{l:'Storage',v:'825GB custom SSD'},{l:'Resolution',v:'Up to 8K'},{l:'Frame Rate',v:'Up to 120fps'},{l:'Connectivity',v:'Wi-Fi 6, BT 5.1'},{l:'Warranty',v:'1 year'}]
          },
          {
            id: 'g-co-2',
            badge: 'New',
            emoji: '🟢',
            name: 'Xbox Series X',
            model: '1TB Edition',
            desc: 'The most powerful Xbox ever — 12 teraflops of raw GPU power, Quick Resume, DirectX ray tracing, and access to thousands of titles across four generations of Xbox.',
            features: ['12 teraflops GPU — true 4K gaming', 'Quick Resume — switch games instantly', 'Xbox Velocity Architecture SSD', 'Auto HDR for all Xbox One titles', '4K UHD Blu-ray drive', 'Xbox Game Pass library access'],
            specs: [{l:'CPU',v:'AMD Zen 2, 8-core @ 3.8GHz'},{l:'GPU',v:'AMD RDNA 2, 12 TFLOPS'},{l:'RAM',v:'16GB GDDR6'},{l:'Storage',v:'1TB Custom NVMe SSD'},{l:'Resolution',v:'Up to 8K'},{l:'Frame Rate',v:'Up to 120fps'},{l:'Connectivity',v:'Wi-Fi 5, BT 5.0'},{l:'Warranty',v:'1 year'}]
          },
          {
            id: 'g-co-3',
            emoji: '🔴',
            name: 'Nintendo Switch OLED',
            model: 'White Edition',
            desc: 'The versatile Nintendo Switch with a vibrant 7-inch OLED screen. Play on TV, in tabletop mode, or take it anywhere in handheld mode.',
            features: ['7-inch OLED display — vivid colours', 'Wide adjustable stand for tabletop mode', 'Dock with wired LAN port', 'Enhanced speakers in handheld mode', '64GB internal storage', 'MicroSD expandable'],
            specs: [{l:'Screen',v:'7-inch OLED'},{l:'TV Resolution',v:'1080p'},{l:'Handheld Res.',v:'720p'},{l:'Storage',v:'64GB internal'},{l:'Battery',v:'4.5–9 hours'},{l:'Weight',v:'320g with Joy-Con'},{l:'Connectivity',v:'Wi-Fi, BT 4.1, LAN'},{l:'Warranty',v:'1 year'}]
          }
        ]
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
            desc: 'The DualSense for PS5 — adaptive triggers simulating real resistance, haptic feedback that puts sensation in your hands, and a built-in microphone for chat anywhere.',
            features: ['Adaptive triggers (L2/R2)', 'Haptic feedback via dual actuators', 'Built-in microphone array', 'Speaker with 3D audio support', 'USB-C charging + 3.5mm jack', '~12-hour battery life'],
            specs: [{l:'Connectivity',v:'Bluetooth 5.1 / USB-C'},{l:'Battery',v:'Li-ion, ~12 hours'},{l:'Charging',v:'USB-C'},{l:'Weight',v:'280g'},{l:'Dimensions',v:'16×10.5×6.5 cm'},{l:'Speaker',v:'Built-in'},{l:'Mic',v:'Built-in + 3.5mm jack'},{l:'Warranty',v:'1 year'}]
          },
          {
            id: 'g-ct-2',
            emoji: '💚',
            name: 'Xbox Elite Series 2',
            model: 'Carbon Black',
            desc: 'The professional-grade Xbox controller — adjustable thumbstick tension, hair trigger locks, rubber grip, 40 hours of battery life, and 4 interchangeable paddles.',
            features: ['Adjustable-tension thumbsticks', 'Short hair trigger locks', 'Wrap-around rubber grip', '40-hour rechargeable battery', '4 interchangeable paddles included', 'Bluetooth + USB-C + wireless adapter'],
            specs: [{l:'Connectivity',v:'BT / USB-C / Wireless'},{l:'Battery',v:'Li-ion, ~40 hours'},{l:'Paddles',v:'4 interchangeable'},{l:'Weight',v:'345g'},{l:'Thumbsticks',v:'Adjustable tension'},{l:'Trigger Locks',v:'Hair trigger locks'},{l:'Charging',v:'USB-C / dock'},{l:'Warranty',v:'1 year'}]
          }
        ]
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
            desc: 'Reference-class gaming headset with high-fidelity speakers, active noise cancellation, dual wireless, and hot-swap batteries for infinite playtime.',
            features: ['Hi-Fi grade 40mm speaker drivers', 'Active noise cancellation (ANC)', 'Dual wireless — 2.4GHz + BT 5.0', 'ClearCast noise-cancelling mic', 'Hot-swap dual batteries — infinite play', 'Compatible with PS5, Xbox, PC, Switch'],
            specs: [{l:'Drivers',v:'40mm neodymium'},{l:'Frequency',v:'10–40,000 Hz'},{l:'ANC',v:'Active noise cancellation'},{l:'Wireless',v:'2.4GHz + BT 5.0'},{l:'Mic',v:'ClearCast, retractable'},{l:'Battery',v:'Hot-swap dual cells'},{l:'Compat.',v:'PS5, Xbox, PC, Switch, Mobile'},{l:'Warranty',v:'1 year'}]
          },
          {
            id: 'g-ac-2',
            emoji: '💾',
            name: 'Seagate Game Drive 4TB',
            model: 'External SSD / USB 3.2',
            desc: 'Expand your console or PC storage with this ultra-fast external SSD. Plug-and-play on PS5 and Xbox Series X|S — no setup required, bus-powered.',
            features: ['4TB capacity for 100+ next-gen games', 'USB 3.2 Gen 2 — up to 1000MB/s', 'Plug-and-play on PS5 and Xbox', 'Bus-powered — no extra cable', 'Rugged aluminium enclosure', 'Pocket-compact size'],
            specs: [{l:'Capacity',v:'4TB'},{l:'Interface',v:'USB 3.2 Gen 2'},{l:'Speed',v:'Up to 1000MB/s'},{l:'Compat.',v:'PS5, Xbox, PC, Mac'},{l:'Power',v:'Bus-powered via USB'},{l:'Dimensions',v:'9×5.5×0.9 cm'},{l:'Weight',v:'55g'},{l:'Warranty',v:'3 years'}]
          }
        ]
      }
    }
  }
};

// Flatten the catalog data for easier AI consumption
const FLATTENED_CATALOG: z.infer<typeof ProductCatalogItemSchema>[] = [];
for (const categoryKey in RAW_CATALOG_DATA) {
  const category = RAW_CATALOG_DATA[categoryKey as keyof typeof RAW_CATALOG_DATA];
  for (const groupKey in category.groups) {
    const group = category.groups[groupKey as keyof typeof category.groups];
    for (const product of group.products) {
      FLATTENED_CATALOG.push({
        id: product.id,
        name: product.name,
        model: product.model,
        desc: product.desc,
        features: product.features,
        specs: product.specs.map(s => `${s.l}: ${s.v}`), // Simplify specs to strings
        category: category.label,
        groupName: group.name,
        emoji: product.emoji,
        badge: product.badge,
      });
    }
  }
}

const productInquiryPrompt = ai.definePrompt({
  name: 'productInquiryPrompt',
  input: { schema: ProductInquiryChatInputSchema },
  output: { schema: ProductInquiryChatOutputSchema },
  prompt: `You are an AI-powered chat assistant for MAISON, a curated home and lifestyle store.
Your goal is to assist customers by answering questions about products and providing relevant product suggestions.

Here is the full product catalog in JSON format:
{{{json productCatalog}}}

The user's current query is: "{{{query}}}"

If the user is currently viewing a specific product, its ID is: "{{{currentProductId}}}"
If 'currentProductId' is provided, prioritize answering questions related to that product or suggesting complementary items from the catalog. You can find the product details in the catalog using this ID.

When providing product suggestions, always use the exact 'id', 'name', and 'model' from the product catalog. Provide a brief explanation for each suggestion based on the user's query and the product's description or features. Aim to suggest 1-3 highly relevant products if suggestions are appropriate.

Keep your responses helpful, concise, and aligned with MAISON's elegant and personal brand voice. Focus on natural language responses unless specific product IDs are listed in 'suggestedProductIds'.

Output your response in JSON format according to the ProductInquiryChatOutputSchema. If no relevant product suggestions can be made, omit or provide an empty array for 'suggestedProductIds'.
`,
});

const productInquiryChatFlow = ai.defineFlow(
  {
    name: 'productInquiryChatFlow',
    inputSchema: ProductInquiryChatInputSchema,
    outputSchema: ProductInquiryChatOutputSchema,
  },
  async (input) => {
    const { output } = await productInquiryPrompt({
      query: input.query,
      currentProductId: input.currentProductId,
      productCatalog: FLATTENED_CATALOG, // Pass the pre-processed catalog to the prompt
    });
    return output!;
  }
);

export async function productInquiryChat(
  input: ProductInquiryChatInput
): Promise<ProductInquiryChatOutput> {
  return productInquiryChatFlow(input);
}
