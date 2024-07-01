import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editAttendanceSchema = z.object({
  uuid: z.string().min(1, { message: messages.isRequired }),
  day: z.string().min(1, { message: messages.isRequired }),
  check_in: z.string().nullable(),
  check_out: z.string().nullable(),
});

// generate form types from zod validation schema
export type EditAttendanceInput = z.infer<typeof editAttendanceSchema>;
