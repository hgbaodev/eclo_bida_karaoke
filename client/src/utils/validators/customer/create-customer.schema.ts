import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const CreateCustomerSchema = z.object({
  first_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  last_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  email: validateEmail,
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
