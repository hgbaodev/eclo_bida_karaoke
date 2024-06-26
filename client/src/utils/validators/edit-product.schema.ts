import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editProductSchema = z.object({
  name: z.string().min(1, { message: messages.ProductNameIsRequired }),
  selling_price: z.number().min(1, { message: messages.SellingPriceIsRequired }),
  product_type: z.string().min(1, { message: messages.placeTypeIsRequired })
});
  
// generate form types from zod validation schema
export type EditProductInput = z.infer<typeof editProductSchema>;