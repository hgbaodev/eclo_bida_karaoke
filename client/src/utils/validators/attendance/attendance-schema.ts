import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const AttendanceSchema = z.object({
  time: z.string(),
  uuid: z.string().min(1, { message: messages.isRequired }),
  day: z.string().min(1, { message: messages.isRequired }),
});

// generate form types from zod validation schema
export type AttendanceInput = z.infer<typeof AttendanceSchema>;
