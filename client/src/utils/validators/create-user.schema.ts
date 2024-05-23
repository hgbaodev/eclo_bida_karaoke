import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  first_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  last_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  password: z.string().min(6, { message: messages.passwordLengthMin }),
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
