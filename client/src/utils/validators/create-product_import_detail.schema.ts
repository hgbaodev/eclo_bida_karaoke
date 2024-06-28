import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createProduct_Import_DetailSchema = z.object({
  product: z.string().min(1, { message: messages.productNameIsRequired }),
  supplier: z.string().min(1, { message: messages.supplierisRequired }),
  cost_price: z.string().min(1, { message: messages.CostPriceIsRequired }),
  selling_price: z.string().min(1, { message: messages.SellingPriceIsRequired }),
  quantity: z.string().min(1, { message: messages.itemQtyIsRequired }),
  import: z.string().min(1, { message: messages.startDateIsRequired }),
});

// generate form types from zod validation schema
export type CreateProduct_Import_DetailtInput = z.infer<typeof createProduct_Import_DetailSchema>;