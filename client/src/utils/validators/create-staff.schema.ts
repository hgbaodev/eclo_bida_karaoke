import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createStaffSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  birthday: z.string().min(1, { message: messages.endDateIsRequired }),
  phone: z.string().min(1, { message: messages.fullNameIsRequired }),
  idcard: z.string().min(1, { message: messages.fullNameIsRequired }),
  address: z.string().min(1, { message: messages.fullNameIsRequired }),
  position: z.string().min(1, { message: messages.roleIsRequired }),
});

// generate form types from zod validation schema
export type CreateStaffInput = z.infer<typeof createStaffSchema>;
