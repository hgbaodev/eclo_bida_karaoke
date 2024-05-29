import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editStaffSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  birthday: z.string().min(1, { message: messages.fullNameIsRequired }),
  phone: z.string().min(1, { message: messages.fullNameIsRequired }),
  idcard: z.string().min(1, { message: messages.fullNameIsRequired }),
  address: z.string().min(1, { message: messages.fullNameIsRequired }),
  position: z.string().min(1, { message: messages.roleIsRequired }),
});

// generate form types from zod validation schema
export type EditStaffInput = z.infer<typeof editStaffSchema>;
