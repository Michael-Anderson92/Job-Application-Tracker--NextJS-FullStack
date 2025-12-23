/**
 * API Route: /api/jobs
 *
 * Handles job-related HTTP requests and wraps Server Actions.
 * This route allows Client Components to fetch data without directly calling Server Actions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllJobsAction, createJobAction } from '@/utils/actions';
import { CreateAndEditJobType } from '@/utils/types';

/**
 * GET /api/jobs
 * Fetches all jobs with optional search, filter, and pagination
 *
 * Query Parameters:
 * - search: string (optional) - Search term for position/company
 * - jobStatus: string (optional) - Filter by status
 * - page: number (optional) - Page number for pagination
 * - limit: number (optional) - Items per page
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get('search') || undefined;
    const jobStatus = searchParams.get('jobStatus') || undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const result = await getAllJobsAction({
      search,
      jobStatus,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/jobs
 * Creates a new job application
 *
 * Body: CreateAndEditJobType
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateAndEditJobType = await request.json();

    const job = await createJobAction(body);

    if (!job) {
      return NextResponse.json(
        { error: 'Failed to create job' },
        { status: 400 }
      );
    }

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
