import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg'];
// form zod validation schema
export const createDeviceSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name' }).max(50, { message: 'Name must not exceed 50 characters' }),
  description: z
    .string()
    .min(1, { message: 'Please enter description' })
    .max(100, { message: 'Description must not exceed 100 characters' }),
  image: z
    .any()
    .refine((files) => {
      return files?.length > 0;
    }, 'Please select an image.')
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

// generate form types from zod validation schema
export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;
