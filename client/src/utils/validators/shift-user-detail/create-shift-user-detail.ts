import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createShiftUserDetailSchema = z.object({
  workshift: z.string().min(1, { message: messages.fullNameIsRequired }),
  shift: z.string().min(1, { message: messages.fullNameIsRequired }),
  day_of_week: z.string().min(1, { message: messages.fullNameIsRequired }),
  staff: z.string().min(1, { message: messages.fullNameIsRequired }),
  status:z.string().min(1, { message: messages.statusIsRequired }),
  day_off:z.string().min(1, { message: messages.DayoffIsRequired }),
  
});

// generate form types from zod validation schema
export type CreateShiftUserDetailInput = z.infer<typeof createShiftUserDetailSchema>;
