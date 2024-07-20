import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editProduct_Import_DetailSchema = z.object({
  product: z.string().min(1, { message: messages.productNameIsRequired }),
  cost_price: z.string().min(1, { message: messages.CostPriceIsRequired }),
  quantity: z.string().min(1, { message: messages.itemQtyIsRequired }),
  import: z.string().min(1, { message: messages.startDateIsRequired }),
});

// generate form types from zod validation schema
export type EditProduct_Import_DetailtInput = z.infer<typeof editProduct_Import_DetailSchema>;