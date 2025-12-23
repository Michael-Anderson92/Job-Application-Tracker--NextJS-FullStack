import * as z from 'zod';

export type JobType = {
  id: string;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  appliedDate: Date;
  lastContact: Date | null;
  nextFollowUp: Date | null;
  salaryRange: string | null;
  jobUrl: string | null;
  website: string | null;
  resumeId: string | null;
  coverLetterUrl: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum JobStatus {
  Applied = 'applied',
  Screening = 'screening',
  Interview = 'interview',
  Offer = 'offer',
  Rejected = 'rejected',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  Remote = 'remote',
  Hybrid = 'hybrid',
}

export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, { message: 'Position must be at least 2 characters' })
    .max(200, { message: 'Position must not exceed 200 characters' })
    .trim(),
  
  company: z
    .string()
    .min(2, { message: 'Company must be at least 2 characters' })
    .max(200, { message: 'Company must not exceed 200 characters' })
    .trim(),
  
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters' })
    .max(200, { message: 'Location must not exceed 200 characters' })
    .trim(),
  
  status: z.nativeEnum(JobStatus, {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  
  mode: z.nativeEnum(JobMode, {
    errorMap: () => ({ message: 'Please select a valid employment type' }),
  }),
  
  salaryRange: z
    .string()
    .max(100, { message: 'Salary range must not exceed 100 characters' })
    .trim()
    .optional()
    .or(z.literal('')),
  
  jobUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .max(500, { message: 'URL must not exceed 500 characters' })
    .optional()
    .or(z.literal('')),
  
  website: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .max(500, { message: 'URL must not exceed 500 characters' })
    .optional()
    .or(z.literal('')),
  
  coverLetterUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .max(500, { message: 'URL must not exceed 500 characters' })
    .optional()
    .or(z.literal('')),
  
  resumeId: z
    .string()
    .uuid({ message: 'Invalid resume ID format' })
    .optional()
    .or(z.literal('')),
  
  notes: z
    .string()
    .max(5000, { message: 'Notes must not exceed 5000 characters' })
    .trim()
    .optional()
    .or(z.literal('')),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;

export function sanitizeJobInput(input: CreateAndEditJobType) {
  return {
    position: input.position,
    company: input.company,
    location: input.location,
    status: input.status,
    mode: input.mode,
    salaryRange: input.salaryRange || null,
    jobUrl: input.jobUrl || null,
    website: input.website || null,
    coverLetterUrl: input.coverLetterUrl || null,
    resumeId: input.resumeId || null,
    notes: input.notes || null,
  };
}