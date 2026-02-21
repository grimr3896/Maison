'use server';
/**
 * @fileOverview An AI chat assistant for product inquiries and suggestions for MAISON store.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductCatalogItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  category: z.string(),
  groupName: z.string(),
});

const ProductInquiryChatInputSchema = z.object({
  query: z.string(),
  currentProductId: z.string().optional(),
});
export type ProductInquiryChatInput = z.infer<typeof ProductInquiryChatInputSchema>;

const ProductInquiryChatOutputSchema = z.object({
  response: z.string(),
  suggestedProductIds: z.array(z.string()).optional(),
});
export type ProductInquiryChatOutput = z.infer<typeof ProductInquiryChatOutputSchema>;

const CATALOG_DATA = [
  { id: 'k-bl-1', name: 'ProBlend Vortex 1200', desc: 'High-performance blender.', category: 'Kitchen', groupName: 'Blenders' },
  { id: 'k-bl-2', name: 'NutriBlend Compact 600', desc: 'Sleek personal blender.', category: 'Kitchen', groupName: 'Blenders' },
  { id: 'k-fr-1', name: 'CrispMaster Air Fryer XL', desc: 'Family-sized air fryer.', category: 'Kitchen', groupName: 'Air Fryers' },
  { id: 'k-fr-2', name: 'SlimFry Compact 3.5L', desc: 'Analogue air fryer for two.', category: 'Kitchen', groupName: 'Air Fryers' },
  { id: 'k-co-1', name: 'Barista Pro Espresso Machine', desc: 'Café-quality espresso at home.', category: 'Kitchen', groupName: 'Coffee Machines' },
  { id: 'k-co-2', name: 'BrewMaster Drip Coffee Maker', desc: 'Programmable drip coffee.', category: 'Kitchen', groupName: 'Coffee Machines' },
  { id: 'k-ju-1', name: 'SlowPress Cold Juicer Pro', desc: 'Quiet masticating juicer.', category: 'Kitchen', groupName: 'Juicers' },
  { id: 'k-ju-2', name: 'CitrusSpin Electric Juicer', desc: 'Quick citrus juicer.', category: 'Kitchen', groupName: 'Juicers' },
  { id: 'f-so-1', name: 'Oslo Modular Sofa', desc: 'Scandinavian modular sofa.', category: 'Furniture', groupName: 'Sofas' },
  { id: 'f-so-2', name: 'Velo Velvet Loveseat', desc: 'Plush velvet 2-seater.', category: 'Furniture', groupName: 'Sofas' },
  { id: 'f-be-1', name: 'Haven Platform Bed Frame', desc: 'Walnut bed with USB.', category: 'Furniture', groupName: 'Beds' },
  { id: 'f-be-2', name: 'Arcadia Storage Bed', desc: 'Storage bed with drawers.', category: 'Furniture', groupName: 'Beds' },
  { id: 'f-ch-1', name: 'Ember Executive Chair', desc: 'Ergonomic mesh office chair.', category: 'Furniture', groupName: 'Chairs' },
  { id: 'f-ch-2', name: 'Ren Dining Chair', desc: 'Solid ash dining chair.', category: 'Furniture', groupName: 'Chairs' },
  { id: 'f-ta-1', name: 'Slab Dining Table', desc: 'Live-edge acacia table.', category: 'Furniture', groupName: 'Tables' },
  { id: 'f-ta-2', name: 'Float Adjustable Desk', desc: 'Electric sit-stand desk.', category: 'Furniture', groupName: 'Tables' },
  { id: 'g-co-1', name: 'PlayStation 5 Console', desc: 'Next-gen gaming console.', category: 'Gaming', groupName: 'Consoles' },
  { id: 'g-co-2', name: 'Xbox Series X', desc: 'Powerful Xbox console.', category: 'Gaming', groupName: 'Consoles' },
  { id: 'g-co-3', name: 'Nintendo Switch OLED', desc: 'Handheld OLED gaming.', category: 'Gaming', groupName: 'Consoles' },
  { id: 'g-ct-1', name: 'DualSense Wireless Controller', desc: 'Haptic PS5 controller.', category: 'Gaming', groupName: 'Controllers' },
  { id: 'g-ct-2', name: 'Xbox Elite Series 2', desc: 'Pro-grade Xbox controller.', category: 'Gaming', groupName: 'Controllers' },
  { id: 'g-ac-1', name: 'SteelSeries Arctis Nova Pro', desc: 'Hi-Fi gaming headset.', category: 'Gaming', groupName: 'Accessories' },
  { id: 'g-ac-2', name: 'Seagate Game Drive 4TB', desc: 'External game storage.', category: 'Gaming', groupName: 'Accessories' },
];

const productInquiryPrompt = ai.definePrompt({
  name: 'productInquiryPrompt',
  input: { schema: z.object({ query: z.string(), catalog: z.array(z.any()) }) },
  output: { schema: ProductInquiryChatOutputSchema },
  prompt: `You are the MAISON AI assistant. Answer the user's query using the catalog.
Suggest 1-2 product IDs if relevant.

Catalog:
{{{json catalog}}}

User Query: "{{{query}}}"
`,
});

export async function productInquiryChat(
  input: ProductInquiryChatInput
): Promise<ProductInquiryChatOutput> {
  const { output } = await productInquiryPrompt({
    query: input.query,
    catalog: CATALOG_DATA,
  });
  return output!;
}
