import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editShiftSchema = z.object({
  time_in: z.string().min(1, { message: messages.timeinIsRequired }),
  time_out: z.string().min(1, { message: messages.timeoutIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditShiftInput = z.infer<typeof editShiftSchema>;
