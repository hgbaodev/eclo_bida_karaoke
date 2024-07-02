import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createAttendanceSchema = z.object({
  time_in: z.string().nullable(),
  time_out: z.string().nullable(),
  uuid: z.string().min(1, { message: messages.isRequired }),
  day: z.string().min(1, { message: messages.isRequired }),
});

// generate form types from zod validation schema
export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>;
