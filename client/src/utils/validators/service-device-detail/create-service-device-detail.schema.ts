import { z } from 'zod';
import { messages } from '@/config/messages';
import serviceSlice from '@/store/slices/serviceSlice';

// Định nghĩa lược đồ với preprocess
export const CreateServiceDeviceDetailSchema = z.object({
  device: z.string().min(1, { message: messages.deviceIsRequired }),
  quantity: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseInt(val as string);
    }
    return val;
  }, z.number().min(0, { message: 'Quantity must be a positive number' })),
  maintenance_quantity: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseInt(val as string);
    }
    return val;
  }, z.number().min(0, { message: 'Quantity per hour must be a positive number' })),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// Tạo kiểu form từ lược đồ zod
export type CreateServiceDeviceDetailInput = z.infer<typeof CreateServiceDeviceDetailSchema>;
