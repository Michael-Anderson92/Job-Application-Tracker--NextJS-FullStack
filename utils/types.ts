/**
 * Types and Validation Schema File
 * 
 * This file defines:
 * - TypeScript types for job data
 * - Enums for job status and mode values
 * - Zod validation schema for form inputs
 * 
 * Zod is a TypeScript-first schema validation library that provides:
 * - Runtime validation (catches errors before they reach the database)
 * - Type inference (TypeScript types are generated from schemas)
 * - Clear error messages for invalid data
 */
import * as z from 'zod';

/**
 * JobType - TypeScript type matching the Prisma Job model
 * 
 * This type represents a job application record in the database.
 * All fields match the database schema defined in prisma/schema.prisma
 */
export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string; // User ID from Clerk authentication
  position: string; // Job title/position
  company: string; // Company name
  location: string; // Job location
  status: string; // Application status (pending, interview, declined)
  mode: string; // Employment type (full-time, part-time, internship)
};

/**
 * JobStatus Enum
 * 
 * Enum ensures type safety - only these values are allowed for job status.
 * Prevents typos and invalid status values.
 */
export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

/**
 * JobMode Enum
 * 
 * Enum ensures type safety for employment type.
 * Values match what's stored in the database.
 */
export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

/**
 * Zod Validation Schema for Job Creation/Editing
 * 
 * This schema validates form data before it's sent to the server.
 * 
 * Validation Rules:
 * - position: Minimum 2 characters
 * - company: Minimum 2 characters
 * - location: Minimum 2 characters
 * - status: Must be one of the JobStatus enum values
 * - mode: Must be one of the JobMode enum values
 * 
 * If validation fails, Zod returns clear error messages that can be
 * displayed to the user in the form.
 */
export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus), // Validates against JobStatus enum
  mode: z.nativeEnum(JobMode), // Validates against JobMode enum
});

/**
 * TypeScript type inferred from Zod schema
 * 
 * z.infer extracts the TypeScript type from the Zod schema.
 * This ensures the TypeScript type always matches the validation rules.
 * 
 * Usage: Used as the parameter type for createJobAction and updateJobAction
 */
export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
