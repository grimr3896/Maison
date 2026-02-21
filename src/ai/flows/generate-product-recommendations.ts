'use server';
/**
 * @fileOverview A Genkit flow for generating product recommendations based on a viewed product.
 *
 * - generateProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationInput - The input type for the generateProductRecommendations function.
 * - ProductRecommendationOutput - The return type for the generateProductRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CATALOG_DATA = [
  // Kitchen
  { id: 'k-bl-1', name: 'ProBlend Vortex 1200', category: 'Kitchen', group: 'Blenders' },
  { id: 'k-bl-2', name: 'NutriBlend Compact 600', category: 'Kitchen', group: 'Blenders' },
  { id: 'k-fr-1', name: 'CrispMaster Air Fryer XL', category: 'Kitchen', group: 'Air Fryers' },
  { id: 'k-fr-2', name: 'SlimFry Compact 3.5L', category: 'Kitchen', group: 'Air Fryers' },
  { id: 'k-co-1', name: 'Barista Pro Espresso Machine', category: 'Kitchen', group: 'Coffee Machines' },
  { id: 'k-co-2', name: 'BrewMaster Drip Coffee Maker', category: 'Kitchen', group: 'Coffee Machines' },
  { id: 'k-ju-1', name: 'SlowPress Cold Juicer Pro', category: 'Kitchen', group: 'Juicers' },
  { id: 'k-ju-2', name: 'CitrusSpin Electric Juicer', category: 'Kitchen', group: 'Juicers' },
  // Furniture
  { id: 'f-so-1', name: 'Oslo Modular Sofa', category: 'Furniture', group: 'Sofas' },
  { id: 'f-so-2', name: 'Velo Velvet Loveseat', category: 'Furniture', group: 'Sofas' },
  { id: 'f-be-1', name: 'Haven Platform Bed Frame', category: 'Furniture', group: 'Beds' },
  { id: 'f-be-2', name: 'Arcadia Storage Bed', category: 'Furniture', group: 'Beds' },
  { id: 'f-ch-1', name: 'Ember Executive Chair', category: 'Furniture', group: 'Chairs' },
  { id: 'f-ch-2', name: 'Ren Dining Chair', category: 'Furniture', group: 'Chairs' },
  { id: 'f-ta-1', name: 'Slab Dining Table', category: 'Furniture', group: 'Tables' },
  { id: 'f-ta-2', name: 'Float Adjustable Desk', category: 'Furniture', group: 'Tables' },
  // Gaming
  { id: 'g-co-1', name: 'PlayStation 5 Console', category: 'Gaming', group: 'Consoles' },
  { id: 'g-co-2', name: 'Xbox Series X', category: 'Gaming', group: 'Consoles' },
  { id: 'g-co-3', name: 'Nintendo Switch OLED', category: 'Gaming', group: 'Consoles' },
  { id: 'g-ct-1', name: 'DualSense Wireless Controller', category: 'Gaming', group: 'Controllers' },
  { id: 'g-ct-2', name: 'Xbox Elite Series 2', category: 'Gaming', group: 'Controllers' },
  { id: 'g-ac-1', name: 'SteelSeries Arctis Nova Pro', category: 'Gaming', group: 'Accessories' },
  { id: 'g-ac-2', name: 'Seagate Game Drive 4TB', category: 'Gaming', group: 'Accessories' },
];

const ProductRecommendationInputSchema = z.object({
  currentProductId: z.string().describe('The ID of the product currently being viewed.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const RecommendedProductSchema = z.object({
  id: z.string().describe('The ID of the recommended product.'),
  reason: z.string().describe('A brief explanation for why this product is recommended.'),
});

const ProductRecommendationOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('A list of recommended products.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function generateProductRecommendations(
  input: ProductRecommendationInput
): Promise<ProductRecommendationOutput> {
  return generateProductRecommendationsFlow(input);
}

const generateProductRecommendationsPrompt = ai.definePrompt({
  name: 'generateProductRecommendationsPrompt',
  input: { schema: z.object({ currentProduct: z.any(), allProductsSummary: z.array(z.any()) }) },
  output: { schema: ProductRecommendationOutputSchema },
  prompt: `You are an expert recommendation engine for MAISON.
Suggest 3 complementary or alternative products for the user.

Current Product: {{{currentProduct.name}}} ({{{currentProduct.category}}})

Available Products:
{{#each allProductsSummary}}- ID: {{this.id}}, Name: {{this.name}}, Category: {{this.category}}, Group: {{this.group}}
{{/each}}
`,
});

const generateProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateProductRecommendationsFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async (input) => {
    const currentProduct = CATALOG_DATA.find((p) => p.id === input.currentProductId);
    if (!currentProduct) throw new Error(`Product ${input.currentProductId} not found.`);

    const allProductsSummary = CATALOG_DATA.filter((p) => p.id !== currentProduct.id);

    const { output } = await generateProductRecommendationsPrompt({
      currentProduct,
      allProductsSummary,
    });

    return { recommendations: output?.recommendations.slice(0, 3) || [] };
  }
);
