import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createShiftUserDetailSchema = z.object({
  shift: z.string().min(1, { message: messages.fullNameIsRequired }),
  day_of_week: z.string().min(1, { message: messages.fullNameIsRequired }),
  staff: z.string().min(1, { message: messages.fullNameIsRequired }),
});

// generate form types from zod validation schema
export type CreateShiftUserDetailInput = z.infer<typeof createShiftUserDetailSchema>;
