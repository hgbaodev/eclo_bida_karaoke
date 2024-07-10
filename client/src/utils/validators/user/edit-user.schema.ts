import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editUserSchema = z.object({
  first_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  last_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditUserInput = z.infer<typeof editUserSchema>;
