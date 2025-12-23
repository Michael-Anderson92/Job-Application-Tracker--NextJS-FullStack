/**
 * StatsContainer (Client Component)
 *
 * Fetches and displays job statistics via API route.
 * Uses 'use client' because it needs useQuery for data fetching.
 */
'use client';
import { useQuery } from '@tanstack/react-query';
import StatsCard, { StatsLoadingCard } from './StatsCard';

function StatsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return response.json();
    },
  });

  if (isPending)
    return (
      <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='applied jobs' value={data?.applied || 0} />
      <StatsCard title='interviews set' value={data?.interview || 0} />
      <StatsCard title='jobs rejected' value={data?.rejected || 0} />
    </div>
  );
}
export default StatsContainer;
