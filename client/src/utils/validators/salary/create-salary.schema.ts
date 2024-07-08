import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createSalarySchema = z.object({
  month: z.number().min(1, { message: messages.fullNameIsRequired }),
  year: z.number().min(1, { message: messages.salaryIsRequired }),
});

// generate form types from zod validation schema
export type CreateSalaryInput = z.infer<typeof createSalarySchema>;
