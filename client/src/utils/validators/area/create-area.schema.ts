import { z } from 'zod';

// form zod validation schema
export const createAreaSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name' }).max(50, { message: 'Name must not exceed 50 characters' }),
  description: z
    .string()
    .min(1, { message: 'Please enter description' })
    .max(100, { message: 'Description must not exceed 100 characters' }),
});

// generate form types from zod validation schema
export type CreateAreaInput = z.infer<typeof createAreaSchema>;
