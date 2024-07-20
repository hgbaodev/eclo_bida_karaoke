import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg'];
export const createProductSchema = z.object({
  name: z.string().min(1, { message: messages.ProductNameIsRequired }),
  product_type: z.string().min(1, { message: messages.placeTypeIsRequired }),
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
    selling_price: z.string().min(1, { message: messages.SellingPriceIsRequired }),
});

// generate form types from zod validation schema
export type CreateProductInput = z.infer<typeof createProductSchema>;