import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const editPositionSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  base_salary: z.number().min(1, { message: messages.birthdayIsRequired }),
  salary_structure: z.string(),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditPositionInput = z.infer<typeof editPositionSchema>;
