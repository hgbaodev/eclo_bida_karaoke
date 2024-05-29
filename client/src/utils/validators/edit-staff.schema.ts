import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const editStaffSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  birthday: z.string().min(1, { message: messages.birthdayIsRequired }),
  phone: z.string().length(10, { message: messages.phoneIsRequired }),
  idcard: z.string().length(12, { message: messages.idcardIsRequired }),
  address: z.string().min(1, { message: messages.addressIsRequired }).max(50, { message: messages.maxlenghtAddress }),
  position: z.string().min(1, { message: messages.positionIsRequired }),
});

// generate form types from zod validation schema
export type EditStaffInput = z.infer<typeof editStaffSchema>;
