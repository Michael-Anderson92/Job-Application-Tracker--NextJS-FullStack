/**
 * API Route: /api/jobs/[id]
 *
 * Handles operations on individual job records
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSingleJobAction, updateJobAction, deleteJobAction } from '@/utils/actions';
import { CreateAndEditJobType } from '@/utils/types';

/**
 * GET /api/jobs/[id]
 * Fetches a single job by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getSingleJobAction(params.id);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/jobs/[id]
 * Updates a job by ID
 *
 * Body: CreateAndEditJobType
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: CreateAndEditJobType = await request.json();

    const job = await updateJobAction(params.id, body);

    if (!job) {
      return NextResponse.json(
        { error: 'Failed to update job' },
        { status: 400 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/jobs/[id]
 * Deletes a job by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await deleteJobAction(params.id);

    if (!job) {
      return NextResponse.json(
        { error: 'Failed to delete job' },
        { status: 400 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
