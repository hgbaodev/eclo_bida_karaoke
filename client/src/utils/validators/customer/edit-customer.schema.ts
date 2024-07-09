import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editCustomerSchema = z.object({
  first_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  last_name: z.string().min(1, { message: messages.fullNameIsRequired }),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  email: z.string().min(1, { message: messages.emailIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditCustomerInput = z.infer<typeof editCustomerSchema>;
