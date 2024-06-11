import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createShiftUserDetailSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
});

// generate form types from zod validation schema
export type CreateShiftUserDetailInput = z.infer<typeof createShiftUserDetailSchema>;
