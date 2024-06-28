import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createProduct_ImportSchema = z.object({
  create_time: z.string().min(1, { message: messages.createtimeIsRequired }),
  receive_time: z.string().min(1, { message: messages.receivetimeIsRequired }), 

});

// generate form types from zod validation schema
export type CreateProduc_ImporttInput = z.infer<typeof createProduct_ImportSchema>;