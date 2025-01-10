import { z } from 'zod';
import { createFileSchema } from '../utils/schemas/file.schema';

export type CreateFileRequest = z.infer<typeof createFileSchema>;
