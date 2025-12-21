/**
 * Providers Component - Global Context Providers
 *
 * This component wraps the entire app with necessary providers:
 * - ThemeProvider: Dark/light mode theming
 * - QueryClientProvider: React Query for data fetching and caching
 * - Toaster: Toast notification system
 *
 * Why "use client"?
 * - React Query and ThemeProvider use client-side hooks (useState, useEffect)
 * - This component must be a Client Component to use these hooks
 * - However, it wraps Server Components (children) which is allowed in Next.js
 */
'use client';
import { ThemeProvider } from '@/components/theme-provider';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';

/**
 * Providers Component
 *
 * This is a wrapper component that provides global context to all child components.
 * It's used in the root layout to make these providers available app-wide.
 *
 * @param children - All child components (pages, layouts, etc.)
 */
const Providers = ({ children }: { children: React.ReactNode }) => {
  /**
   * QueryClient Singleton Pattern
   *
   * useState with function initializer ensures QueryClient is only created once.
   * This is important because:
   * - QueryClient should be a singleton (one instance for the app)
   * - useState(() => value) only calls the function on first render
   * - Prevents creating multiple QueryClient instances on re-renders
   *
   * staleTime: 5 minutes (60 * 1000 * 5 milliseconds)
   * - Data is considered "fresh" for 5 minutes after fetching
   * - React Query won't refetch during this time
   * - Important for SSR: Prevents unnecessary refetch when component hydrates on client
   * - Without this, data fetched on server would be refetched immediately on client
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // 5 minutes = data stays fresh for 5 minutes before refetch
            staleTime: 60 * 1000 * 5,
          },
        },
      })
  );

  /**
   * Render all providers in a nested structure
   *
   * Provider nesting order matters:
   * 1. ThemeProvider (outermost) - provides theme context
   * 2. Toaster - toast notifications (needs theme for styling)
   * 3. QueryClientProvider - React Query data fetching
   * 4. ReactQueryDevtools - Development tool for React Query (only in dev)
   * 5. children - All app pages and components
   */
  return (
    <ThemeProvider
      attribute='class' // Theme stored in HTML class attribute (e.g., <html class="dark">)
      defaultTheme='system' // Use system preference (light/dark) by default
      enableSystem // Allow system theme detection
      disableTransitionOnChange // Disable CSS transitions when theme changes (prevents flash)
    >
      {/* Toast notification system - shows success/error messages */}
      <Toaster />
      {/* React Query provider - enables useQuery, useMutation hooks in all children */}
      <QueryClientProvider client={queryClient}>
        {children}
        {/* React Query Devtools - only visible in development */}
        {/* Shows query cache, active queries, and allows manual refetching */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default Providers;
