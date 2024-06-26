import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createStaffSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }),
  birthday: z.string().min(1, { message: messages.birthdayIsRequired }),
  phone: z.string().length(10, { message: messages.phoneIsRequired }),
  email: validateEmail,
  gender: z.string().min(1, { message: messages.isRequired }),
  idcard: z.string().length(12, { message: messages.idcardIsRequired }),
  address: z.string().min(1, { message: messages.addressIsRequired }).max(50, { message: messages.maxlenghtAddress }),
  position: z.string().min(1, { message: messages.positionIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  role: z.string().min(1, { message: messages.roleIsRequired }),
  password: z.string().min(6, { message: messages.passwordLengthMin }),
});

// generate form types from zod validation schema
export type CreateStaffInput = z.infer<typeof createStaffSchema>;
