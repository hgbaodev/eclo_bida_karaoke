import { z } from 'zod';

import { messages } from '@/config/messages';
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg'];
// form zod validation schema
export const editDeviceSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name' }).max(50, { message: 'Name must not exceed 50 characters' }),
  description: z
    .string()
    .min(1, { message: 'Please enter description' })
    .max(100, { message: 'Description must not exceed 100 characters' }),
  image: z
    .any()
    .nullable()
    .refine((files) => {
      if (files === null || files.length === 0) return true; // Allow null or empty value
      return files[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine((files) => {
      if (files === null || files.length === 0) return true; // Allow null or empty value
      return ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type);
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  value: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseFloat(val as string);
    }
    return val;
  }, z.number().min(0, { message: 'Value hour must be a positive number' })),
});

// generate form types from zod validation schema
export type EditDeviceInput = z.infer<typeof editDeviceSchema>;
