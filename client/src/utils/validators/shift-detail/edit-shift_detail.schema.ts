import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editShiftDetailSchema = z.object({
  shift_id: z.string().min(1, { message: messages.timeinIsRequired }),
  day_of_week: z.string().min(1, { message: messages.timeoutIsRequired }),
  quantity_of_staff: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditShiftDetailInput = z.infer<typeof editShiftDetailSchema>;
