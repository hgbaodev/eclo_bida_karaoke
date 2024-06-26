import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editProduct_ImportSchema = z.object({
  create_time: z.string().min(1, { message: messages.createtimeIsRequired }),
  receive_time: z.string().min(1, { message: messages.receivetimeIsRequired }),
  total_cost: z.number().min(1, { message: messages.totalcostimportIsRequired }),
  status: z.string().min(1, { message: messages.statusimportIsRequired }),
});

// generate form types from zod validation schema
export type EditProduc_ImporttInput = z.infer<typeof editProduct_ImportSchema>;