import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createShiftSchema = z.object({
  time_in: z.string().min(1, { message: messages.timeinIsRequired }),
  time_out: z.string().min(1, { message: messages.timeoutIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  shift_type: z.string().min(1, { message: messages.shiftTypeIsRequired }),
});

// generate form types from zod validation schema
export type CreateShiftInput = z.infer<typeof createShiftSchema>;
