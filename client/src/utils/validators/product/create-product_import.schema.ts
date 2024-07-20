import { z } from 'zod';
import { messages } from '@/config/messages';
const productSchema = z.object({
  product: z.string().min(1, { message: messages.createtimeIsRequired }),
  quantity: z.string().min(1,{ message: messages.createtimeIsRequired }),
  cost_price: z.string().min(1,{ message: messages.createtimeIsRequired }),
  // supplier: z.string().min(1,{ message: messages.createtimeIsRequired }),
});
// form zod validation schema
export const createProduct_ImportSchema = z.object({
  import_day: z.string().min(1, { message: messages.createtimeIsRequired }),
  products: z.array(productSchema).min(1, { message: messages.createtimeIsRequired }),
});

// generate form types from zod validation schema
export type CreateProduc_ImporttInput = z.infer<typeof createProduct_ImportSchema>;