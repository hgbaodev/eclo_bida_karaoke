import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createPositionSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  salary: z.string().min(1, { message: messages.salaryIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreatePositionInput = z.infer<typeof createPositionSchema>;
