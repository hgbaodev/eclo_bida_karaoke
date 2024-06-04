import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editPositionSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  salary: z.string().min(1, { message: messages.birthdayIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditPositionInput = z.infer<typeof editPositionSchema>;
