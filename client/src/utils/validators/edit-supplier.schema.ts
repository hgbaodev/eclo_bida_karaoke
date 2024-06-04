import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const EditSupplierSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  address: z.string().min(1, { message: messages.addressIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditSupplierInput = z.infer<typeof EditSupplierSchema>;
