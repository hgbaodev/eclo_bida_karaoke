import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg'];
// form zod validation schema
export const editStaffSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }),
  birthday: z.string().min(1, { message: messages.birthdayIsRequired }),
  phone: z.string().length(10, { message: messages.phoneIsRequired }),
  idcard: z.string().length(12, { message: messages.idcardIsRequired }),
  address: z.string().min(1, { message: messages.addressIsRequired }).max(50, { message: messages.maxlenghtAddress }),
  position: z.string().min(1, { message: messages.positionIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  password: z.string().min(6, { message: messages.passwordLengthMin }),
  gender: z.string().min(1, { message: messages.isRequired }),
  image: z
    .any()
    .refine((files) => {
      return files?.length > 0;
    }, 'Please select an image.')
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

// generate form types from zod validation schema
export type EditStaffInput = z.infer<typeof editStaffSchema>;
