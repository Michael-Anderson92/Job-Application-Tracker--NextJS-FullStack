/**
 * API Route: /api/charts
 *
 * Handles chart data requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { getChartsDataAction } from '@/utils/actions';

/**
 * GET /api/charts
 * Fetches chart data (job applications over last 6 months)
 */
export async function GET(request: NextRequest) {
  try {
    const chartData = await getChartsDataAction();
    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}
