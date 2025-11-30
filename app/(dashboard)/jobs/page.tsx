/**
 * All Jobs Page Component
 *
 * This is a Next.js Server Component that pre-fetches job data on the server
 * before sending the page to the client. This improves initial page load performance.
 *
 * Key Features:
 * - Server-side data prefetching using React Query
 * - Hydration: Server data is "hydrated" into client-side React Query cache
 * - This prevents loading spinners on initial page load
 *
 * React Query Hydration Pattern:
 * 1. Prefetch data on server
 * 2. Dehydrate (serialize) the query cache
 * 3. Send dehydrated state to client
 * 4. Hydrate client-side React Query with server data
 */
import JobsList from "@/components/JobsList";
import SearchForm from "@/components/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";

async function AllJobsPage() {
  // Create a new QueryClient instance for server-side prefetching
  const queryClient = new QueryClient();

  // Prefetch the initial jobs data on the server
  // This runs before the page is sent to the client
  // queryKey matches the one used in JobsList component for cache matching
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1], // Empty search, 'all' status, page 1
    queryFn: () => getAllJobsAction({}), // Fetch all jobs (no filters)
  });

  /**
   * HydrationBoundary wraps the client components and provides them with
   * the prefetched data from the server.
   *
   * dehydrate() serializes the query cache so it can be sent to the client
   * The client-side React Query will hydrate this data, making it immediately
   * available without a loading state.
   */
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
}

export default AllJobsPage;
