import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createDayOffSchema = z.object({

  staff: z.string().min(1, { message: messages.isRequired }),
  type:z.string().min(1, { message: messages.statusIsRequired }),
  reason:z.string().nullable(),
  day_off:z.string().min(1, { message: messages.DayoffIsRequired }),
  
});

// generate form types from zod validation schema
export type CreateDayOffInput = z.infer<typeof createDayOffSchema>;