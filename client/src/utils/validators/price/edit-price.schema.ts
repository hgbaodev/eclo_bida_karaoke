import { z } from 'zod';
import { messages } from '@/config/messages';

// Định nghĩa lược đồ với preprocess
export const EditPriceSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  pricePerHour: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseFloat(val as string);
    }
    return val;
  }, z.number().min(0, { message: 'Price per hour must be a positive number' })),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// Tạo kiểu form từ lược đồ zod
export type EditPriceInput = z.infer<typeof EditPriceSchema>;
