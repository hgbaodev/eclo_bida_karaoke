import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const CreatePriceSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  pricePerHour: z.string().min(1, { message: messages.priceIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreatePriceInput = z.infer<typeof CreatePriceSchema>;
