import { z } from 'zod';

// form zod validation schema
export const rolePermissionSchema = z.object({
  user: z.array(z.string()).optional(),
  customer: z.array(z.string()).optional(),
  area: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type RolePermissionInput = z.infer<typeof rolePermissionSchema>;
