import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createShiftDetailSchema = z.object({
  shift_id: z.string().min(1, { message: messages.timeinIsRequired }),
  day_of_week: z.string().min(1, { message: messages.timeoutIsRequired }),
  quantity_of_staff: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreateShiftDetailInput = z.infer<typeof createShiftDetailSchema>;
