import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const CreatePriceSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  pricePerHour: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseFloat(val as string);
    }
    return val;
  }, z.number().min(0, { message: 'Price per hour must be a positive number' })),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreatePriceInput = z.infer<typeof CreatePriceSchema>;
