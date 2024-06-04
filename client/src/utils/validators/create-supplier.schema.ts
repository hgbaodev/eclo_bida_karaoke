import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const CreateSupplierSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  address: z.string().min(1, { message: messages.addressIsRequired }),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreateSupplierInput = z.infer<typeof CreateSupplierSchema>;
