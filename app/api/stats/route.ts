/**
 * API Route: /api/stats
 *
 * Handles statistics-related requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStatsAction } from '@/utils/actions';

/**
 * GET /api/stats
 * Fetches job application statistics grouped by status
 */
export async function GET(request: NextRequest) {
  try {
    const stats = await getStatsAction();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
