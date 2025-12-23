/**
 * Jobs Page (Server Component)
 *
 * This is a Server Component that prefetches job data and passes it to Client Components.
 * It demonstrates the proper Next.js 14 pattern for SSR with React Query hydration.
 */

import { JobsGrid } from "@/components/grids/JobsGrid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import { colors, headerVariants } from "@/lib/design-system";

// ✅ Server Component (no 'use client')
async function AllJobsPage() {
  const queryClient = new QueryClient();

  // Prefetch jobs data on the server
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });

  const result = await getAllJobsAction({});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-6">
        <div className="mb-6">
          <h1
            className={headerVariants.h1}
            style={{ color: colors.white }} // White text on blue background
          >
            Job Applications
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: colors.white, opacity: 0.9 }} // White text with slight transparency
          >
            {result.count} applications tracked
          </p>
        </div>

        {/* JobsGrid is a Client Component */}
        <JobsGrid jobs={result.jobs} onAddJobClick={() => {}} />
      </div>
    </HydrationBoundary>
  );
}

export default AllJobsPage;