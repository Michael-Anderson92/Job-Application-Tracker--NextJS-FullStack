// /**
//  * JobsList Component
//  *
//  * This component displays a paginated list of job applications with search and filter capabilities.
//  * It uses React Query for data fetching and caching, and integrates with Next.js routing
//  * for URL-based search parameters.
//  *
//  * Key Features:
//  * - URL-based search and filtering (search params in URL)
//  * - Pagination support
//  * - Loading states
//  * - Empty state handling
//  * - Download functionality integration
//  */
// "use client";
// import JobCard from "./JobCard";
// import { useSearchParams } from "next/navigation";
// import { getAllJobsAction } from "@/utils/actions";
// import { useQuery } from "@tanstack/react-query";
// import ButtonContainer from "./ButtonContainer";
// import ComplexButtonContainer from "./ComplexButtonContainer";
// import DownloadDropdown from "./DownloadDropdown";

// function JobsList() {
//   // useSearchParams hook reads URL query parameters
//   // This allows users to bookmark/share filtered/searched views
//   // Example: /jobs?search=developer&jobStatus=pending&page=2
//   const searchParams = useSearchParams();

//   // Extract search parameters from URL with default values
//   // get() returns null if param doesn't exist, so we use || "" for empty string default
//   const search = searchParams.get("search") || "";
//   const jobStatus = searchParams.get("jobStatus") || "all";

//   // Parse page number from URL, default to page 1 if not provided or invalid
//   const pageNumber = Number(searchParams.get("page")) || 1;

//   /**
//    * React Query hook for data fetching
//    *
//    * useQuery provides:
//    * - Automatic caching (same queryKey = cached result)
//    * - Background refetching
//    * - Loading states
//    * - Error handling
//    *
//    * queryKey: Unique identifier for this query
//    * - Includes search, jobStatus, and pageNumber so each combination is cached separately
//    * - When any of these change, React Query knows to fetch new data
//    *
//    * queryFn: The function that fetches the data
//    * - Calls server action getAllJobsAction with current filters
//    */
//   const { data, isPending } = useQuery({
//     queryKey: ["jobs", search ?? "", jobStatus, pageNumber],
//     queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
//   });

//   // Extract data with safe defaults using optional chaining and nullish coalescing
//   // This prevents errors if data is undefined or null
//   const jobs = data?.jobs || [];
//   const count = data?.count || 0;
//   const page = data?.page || 0;
//   const totalPages = data?.totalPages || 0;

//   // Early return for loading state
//   // isPending is true while the query is fetching data
//   if (isPending) return <h2 className="text-xl">Please Wait...</h2>;

//   // Early return for empty state
//   // Shows message when no jobs match the current filters
//   if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

//   /**
//    * Main render
//    *
//    * Layout structure:
//    * - Header row: Job count + Download button on left, Pagination on right
//    * - Grid: Responsive 2-column layout (1 column on mobile, 2 on medium+ screens)
//    */
//   return (
//     <>
//       {/* Header section with job count, download button, and pagination */}
//       <div className="flex items-center justify-between mb-8">
//         {/* Left side: Job count and download dropdown */}
//         <div className="flex items-center gap-4">
//           <h2 className="text-xl font-semibold capitalize ">
//             {count} jobs found
//           </h2>
//           {/* Download dropdown component for CSV/Excel export */}
//           <DownloadDropdown />
//         </div>
//         {/* Right side: Pagination (only shown if more than 1 page) */}
//         {/* Conditional rendering: null means nothing is rendered */}
//         {totalPages < 2 ? null : (
//           <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
//         )}
//       </div>
//       {/* Job cards grid */}
//       {/* Tailwind classes:
//           - grid: CSS Grid layout
//           - md:grid-cols-2: 2 columns on medium screens and up
//           - gap-8: 8-unit gap between grid items
//       */}
//       <div className="grid md:grid-cols-2  gap-8">
//         {/* Map over jobs array and render JobCard for each */}
//         {/* key prop is required by React for list items - helps with efficient re-rendering */}
//         {jobs.map((job) => {
//           return <JobCard key={job.id} job={job} />;
//         })}
//       </div>
//     </>
//   );
// }
// export default JobsList;
