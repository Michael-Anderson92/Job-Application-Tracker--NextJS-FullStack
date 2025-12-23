/**
 * Server Actions File
 *
 * This file contains all server-side actions for job management.
 * Server actions in Next.js run on the server, providing secure database access
 * and authentication checks without exposing API routes.
 *
 * Key Concepts:
 * - "use server" directive marks functions as server actions
 * - All database operations use Prisma ORM
 * - Clerk authentication ensures only authenticated users can access data
 * - All actions validate user identity before performing operations
 * - Zod validation ensures data integrity
 */
"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { 
  JobType, 
  CreateAndEditJobType, 
  createAndEditJobSchema,
  sanitizeJobInput 
} from "./types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

/**
 * Helper function to authenticate user and redirect if not authenticated
 *
 * This is a reusable authentication check used by all server actions.
 * It ensures that only logged-in users can perform database operations.
 *
 * @returns The authenticated user's Clerk ID
 * @throws Redirects to home page if user is not authenticated
 */
function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

/**
 * Server Action: Create a new job application
 *
 * This function:
 * 1. Authenticates the user
 * 2. Validates input data using Zod schema
 * 3. Sanitizes optional fields (converts empty strings to null)
 * 4. Creates a new job record in the database
 * 5. Associates the job with the authenticated user's Clerk ID
 *
 * @param values - Job data (all fields from CreateAndEditJobType)
 * @returns The created job object, or null if creation fails
 */
export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    // Validate input data with Zod
    const validatedData = createAndEditJobSchema.parse(values);
    
    // Sanitize data (convert empty strings to null)
    const sanitizedData = sanitizeJobInput(validatedData);

    // Create job in database
    const job: JobType = await prisma.job.create({
      data: {
        ...sanitizedData,
        clerkId: userId,
      },
    });

    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/jobs');

    return job;
  } catch (error) {
    console.error('Error creating job:', error);
    return null;
  }
}

/**
 * Type definition for getAllJobsAction parameters
 * All fields are optional to support flexible querying
 */
type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

/**
 * Server Action: Get paginated list of jobs with optional search and filter
 *
 * This is the main query function for the jobs list page. It supports:
 * - Search by position or company name
 * - Filter by job status
 * - Pagination (page number and limit)
 * - User-specific data (only returns jobs for authenticated user)
 *
 * @param search - Optional search term to filter by position or company
 * @param jobStatus - Optional status filter
 * @param page - Page number (default: 1)
 * @param limit - Number of items per page (default: 10)
 * @returns Object containing jobs array, total count, current page, and total pages
 */
export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    // Build where clause
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    // Add search filter
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Add status filter
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;

    // Fetch jobs with all relationships
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        appliedDate: "desc", // Sort by application date, newest first
      },
    });

    const count: number = await prisma.job.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

/**
 * Server Action: Delete a job application
 *
 * Security: Only deletes jobs that belong to the authenticated user
 * (checked via clerkId in where clause)
 *
 * @param id - The ID of the job to delete
 * @returns The deleted job object, or null if deletion fails
 */
export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    revalidatePath('/');
    revalidatePath('/jobs');
    
    return job;
  } catch (error) {
    console.error('Error deleting job:', error);
    return null;
  }
}

/**
 * Server Action: Get a single job by ID
 *
 * Used for the job detail/edit page. Ensures user can only access their own jobs.
 * Redirects to jobs list if job not found or doesn't belong to user.
 *
 * @param id - The ID of the job to retrieve
 * @returns The job object, or redirects to /jobs if not found
 */
export async function getSingleJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });

    if (!job) {
      redirect("/jobs");
    }

    return job;
  } catch (error) {
    console.error('Error fetching job:', error);
    redirect("/jobs");
  }
}

/**
 * Server Action: Update an existing job application
 *
 * Updates job data while ensuring user can only update their own jobs.
 * Uses the same validation schema as createJobAction.
 *
 * @param id - The ID of the job to update
 * @param values - Updated job data
 * @returns The updated job object, or null if update fails
 */
export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    // Validate input
    const validatedData = createAndEditJobSchema.parse(values);
    
    // Sanitize data
    const sanitizedData = sanitizeJobInput(validatedData);

    // Update job
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: sanitizedData,
    });

    revalidatePath('/');
    revalidatePath('/jobs');
    revalidatePath(`/jobs/${id}`);

    return job;
  } catch (error) {
    console.error('Error updating job:', error);
    return null;
  }
}

/**
 * Server Action: Get statistics grouped by job status
 *
 * Uses Prisma's groupBy to count jobs by status.
 * Used for the stats dashboard page.
 *
 * @returns Object with counts for each status
 */
export async function getStatsAction(): Promise<{
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rejected: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        clerkId: userId,
      },
    });

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    // Return all statuses with default 0
    const defaultStats = {
      applied: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    redirect("/jobs");
  }
}

/**
 * Server Action: Get job application data for charts (last 6 months)
 *
 * Fetches jobs from the last 6 months and groups them by month.
 * Used for displaying application trends over time in charts.
 *
 * @returns Array of objects with date (formatted as "MMM YY") and count
 */
export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        appliedDate: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        appliedDate: "asc",
      },
    });

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.appliedDate).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    redirect("/jobs");
  }
}

/**
 * Server Action: Get all jobs for download/export
 *
 * This function fetches ALL jobs for the authenticated user (no pagination).
 * Used by the download functionality to generate CSV/Excel reports.
 *
 * @returns Array of all job records for the user, newest first
 */
export async function getAllJobsForDownloadAction(): Promise<JobType[]> {
  const userId = authenticateAndRedirect();

  try {
    const jobs: JobType[] = await prisma.job.findMany({
      where: {
        clerkId: userId,
      },
      orderBy: {
        appliedDate: "desc",
      },
    });
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs for download:', error);
    return [];
  }
}