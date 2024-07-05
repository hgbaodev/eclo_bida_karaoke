import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createPositionSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  base_salary: z.string().min(1, { message: messages.salaryIsRequired }),
  salary_structure: z.string(),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreatePositionInput = z.infer<typeof createPositionSchema>;
