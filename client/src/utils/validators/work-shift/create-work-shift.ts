import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createWorkShiftSchema = z.object({
  date_start: z.string().min(1, { message: messages.dateStartIsRequired }),
  date_end: z.string().min(1, { message: messages.dateEndIsRequired }),
});

// generate form types from zod validation schema
export type CreateWorkShiftInput = z.infer<typeof createWorkShiftSchema>;
