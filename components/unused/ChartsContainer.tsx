/**
 * ChartsContainer (Client Component)
 *
 * Fetches and displays chart data via API route.
 * Uses 'use client' because it needs:
 * - useQuery for data fetching
 * - Recharts library (client-side charting)
 */
'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useQuery } from '@tanstack/react-query';

function ChartsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['charts'],
    queryFn: async () => {
      const response = await fetch('/api/charts');
      if (!response.ok) {
        throw new Error('Failed to fetch chart data');
      }
      return response.json();
    },
  });

  if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;
  if (!data || data.length < 1) return null;
  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        Monthly Applications
      </h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2563eb' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
export default ChartsContainer;
