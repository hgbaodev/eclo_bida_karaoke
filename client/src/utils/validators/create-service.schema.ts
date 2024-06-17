import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createServiceSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  area_active: z.string().min(1, { message: 'Area is required' }),
  service_type_active: z.string().min(1, { message: 'Service type active is required' }),
  price_active: z.string().min(1, { message: 'Price type is required' }),
});

// generate form types from zod validation schema
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
