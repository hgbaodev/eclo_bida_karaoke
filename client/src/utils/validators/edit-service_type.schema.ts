import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const EditServiceTypeSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type EditServiceTypeInput = z.infer<typeof EditServiceTypeSchema>;
