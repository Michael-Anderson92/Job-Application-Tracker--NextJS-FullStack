import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

function AddJobPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Job Application</h1>
        {/* AddJobForm component would go here */}
      </div>
    </HydrationBoundary>
  );
}
export default AddJobPage;