/**
 * API Route: /api/jobs/download
 *
 * Handles job export/download requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllJobsForDownloadAction } from '@/utils/actions';

/**
 * GET /api/jobs/download
 * Fetches all jobs for download/export (no pagination)
 */
export async function GET(request: NextRequest) {
  try {
    const jobs = await getAllJobsForDownloadAction();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs for download:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs for download' },
      { status: 500 }
    );
  }
}
