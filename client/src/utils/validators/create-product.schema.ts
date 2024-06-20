import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createProductSchema = z.object({
  name: z.string().min(1, { message: messages.ProductNameIsRequired }),
  // cost_price: z.string().min(1, { message: messages.CostPriceIsRequired }),
  selling_price: z.string().min(1, { message: messages.SellingPriceIsRequired }),
});

// generate form types from zod validation schema
export type CreateProductInput = z.infer<typeof createProductSchema>;