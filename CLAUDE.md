# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jobify is a full-stack job application tracking system built with Next.js 14+, TypeScript, Clerk authentication, Prisma ORM, React Query, and PostgreSQL. It allows users to track job applications, interviews, resumes, and contacts with advanced search, filtering, and analytics features.

Live Demo: https://jobify-tracker.vercel.app/

## Development Commands

### Core Commands
```bash
npm run dev              # Start development server on localhost:3000
npm run build            # Build for production (includes Prisma generate)
npm start                # Start production server
npm run lint             # Run ESLint
```

### Database Commands
```bash
npx prisma generate      # Generate Prisma Client after schema changes
npx prisma migrate dev   # Create and apply migrations in development
npx prisma db push       # Push schema changes to database (no migration files)
npx prisma studio        # Open Prisma Studio at localhost:5555
npm run db:seed          # Seed database with sample data using tsx
```

### Development Workflow
- After pulling schema changes: `npx prisma generate`
- Before committing schema changes: `npx prisma migrate dev --name descriptive_name`
- To view/edit database visually: `npx prisma studio`

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Clerk (handles user management, sessions)
- **State Management**: TanStack Query (React Query) v5
- **UI**: Tailwind CSS, shadcn/ui components, Radix UI primitives
- **Data Visualization**: Recharts, AG Grid
- **Forms**: React Hook Form + Zod validation

### Application Structure

```
app/
├── (dashboard)/          # Route group - wraps protected pages with dashboard layout
│   ├── layout.tsx        # Dashboard layout with Sidebar + Navbar
│   ├── add-job/          # Create new job application
│   ├── jobs/             # View/search all jobs
│   │   └── [id]/         # Edit specific job (dynamic route)
│   └── stats/            # Analytics dashboard
├── layout.tsx            # Root layout with Providers
├── providers.tsx         # React Query + Theme providers
└── page.tsx              # Landing page (public)

utils/
├── actions.ts            # Server actions (all database operations)
├── types.ts              # TypeScript types + Zod schemas
└── db.ts                 # Prisma client singleton

components/
├── ui/                   # shadcn/ui components (Button, Card, Form, etc.)
├── *Form.tsx             # Form components (CreateJobForm, EditJobForm, SearchForm)
├── *Grid.tsx             # AG Grid components (JobsGrid, ResumesGrid, InterviewsGrid)
├── JobsList.tsx          # Main jobs list with pagination
└── ChartsContainer.tsx   # Analytics visualizations

prisma/
├── schema.prisma         # Database schema (Job, Resume, Interview, Contact models)
├── migrations/           # Migration history
└── seed.ts               # Database seeding script
```

### Key Architectural Patterns

#### 1. Server Actions Pattern
All database operations are in `utils/actions.ts` as Next.js Server Actions:
- Marked with `"use server"` directive
- Called directly from client components (no API routes needed)
- Auto-authenticated via `auth()` from Clerk
- Example actions: `createJobAction`, `getAllJobsAction`, `updateJobAction`, `deleteJobAction`

```typescript
// Server Action (server-side)
export async function createJobAction(values: CreateAndEditJobType) {
  const userId = authenticateAndRedirect(); // Clerk auth check
  const job = await prisma.job.create({ data: { ...values, clerkId: userId } });
  return job;
}

// Client Component usage
const result = await createJobAction(formData);
```

#### 2. React Query for Data Fetching
All data fetching uses React Query with server-side hydration:
- Server prefetches data in page.tsx (Server Component)
- Data is hydrated into client cache via `HydrationBoundary`
- Client components use `useQuery` with matching keys
- Automatic caching, refetching, and optimistic updates

```typescript
// Server Component prefetches
const queryClient = new QueryClient();
await queryClient.prefetchQuery({
  queryKey: ['jobs', search, status, page],
  queryFn: () => getAllJobsAction({ search, status, page })
});

// Client Component consumes
const { data } = useQuery({
  queryKey: ['jobs', search, status, page],
  queryFn: () => getAllJobsAction({ search, status, page })
});
```

#### 3. Authentication Flow
- Middleware (`middleware.ts`) protects routes matching `/add-job`, `/jobs(.*)`, `/stats`
- Clerk's `auth().protect()` redirects unauthenticated users to sign-in
- Server actions verify `userId` from `auth()` before database operations
- All database queries filter by `clerkId` for user isolation

#### 4. Form Handling Pattern
- React Hook Form for state management
- Zod schemas for validation (defined in `utils/types.ts`)
- Server actions for submission
- Toast notifications for feedback

```typescript
const form = useForm<CreateAndEditJobType>({
  resolver: zodResolver(createAndEditJobSchema),
});

const onSubmit = async (data: CreateAndEditJobType) => {
  const result = await createJobAction(data);
  if (result) {
    toast({ description: 'Job created successfully' });
    router.push('/jobs');
  }
};
```

## Database Schema

### Core Models
- **Job**: Main job application tracking (position, company, status, mode, dates, salary, notes)
- **Resume**: Resume versions with file URLs (linked to jobs via resumeId)
- **Interview**: Interview rounds for each job (date, round, interviewer, outcome)
- **Contact**: Networking contacts (name, email, company, LinkedIn)
- **JobContact**: Many-to-many link between jobs and contacts
- **Token**: AI credit balance for future features

### Important Relationships
- Job → Resume: Many-to-one (one resume can be used for multiple jobs)
- Job → Interview: One-to-many (cascade delete when job is deleted)
- Job ↔ Contact: Many-to-many via JobContact (cascade delete)

### Migration Strategy
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive_name`
3. Run `npx prisma generate` to update types
4. Update TypeScript types in `utils/types.ts` if needed
5. Update server actions in `utils/actions.ts` if needed

## Important Implementation Details

### URL-Based State Management
Search and filter state is stored in URL search params, not component state:
- Search term: `?search=engineer`
- Job status filter: `?jobStatus=pending`
- Pagination: `?page=2`
- Benefits: Shareable URLs, browser back/forward support, SSR compatibility

```typescript
const searchParams = useSearchParams();
const search = searchParams.get('search') || '';
const router = useRouter();

// Update URL params (triggers React Query refetch)
router.push(`/jobs?search=${search}&jobStatus=${status}`);
```

### React Query Cache Keys
Query keys MUST include all variables that affect the data:
```typescript
['jobs', search, status, page] // Changes to any parameter refetches data
['stats'] // Static data
['job', id] // Single job by ID
```

### Prisma Best Practices
- Use `prisma.job.findMany()` for lists with filtering/pagination
- Use `prisma.job.findUnique()` for single records by ID
- Always filter by `clerkId` for user isolation: `where: { clerkId: userId }`
- Use compound `where` for security: `where: { id: jobId, clerkId: userId }`
- Use `include` for relations: `include: { resume: true, interviews: true }`

### AG Grid Integration (New Feature)
Three grid components use AG Grid for advanced data tables:
- `JobsGrid.tsx`: Job applications table
- `ResumesGrid.tsx`: Resume versions table
- `InterviewsGrid.tsx`: Interview schedule table

AG Grid features enabled:
- Pagination, sorting, filtering
- Column resizing, reordering
- Custom cell renderers
- Theme: Custom theme in `lib/ag-grid-theme.ts`

## Environment Variables

Required in `.env.local`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/database?schema=public"
```

Get Clerk keys from: https://dashboard.clerk.com → API Keys

## Common Patterns & Examples

### Adding a New Server Action
1. Define function in `utils/actions.ts` with `"use server"`
2. Authenticate with `authenticateAndRedirect()`
3. Validate input with Zod schema
4. Execute Prisma query with `clerkId` filter
5. Return data or null on error

### Adding a New Protected Route
1. Create page in `app/(dashboard)/new-route/page.tsx`
2. Middleware automatically protects routes under `(dashboard)`
3. Use React Query to fetch data (prefetch in Server Component if needed)

### Creating a New Form
1. Define Zod schema in `utils/types.ts`
2. Create form component using React Hook Form
3. Use shadcn/ui form components (`Form`, `FormField`, `FormControl`)
4. Submit to server action
5. Show toast notification on success/error

### Adding a New Database Model
1. Add model to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_model_name`
3. Create TypeScript type in `utils/types.ts`
4. Add server actions in `utils/actions.ts`
5. Create UI components for CRUD operations

## Debugging Tools

- **React Query Devtools**: Automatically enabled in dev mode (bottom-left icon)
- **Prisma Studio**: Visual database browser at `localhost:5555`
- **Next.js Dev Overlay**: Shows errors and warnings in browser
- **Server Logs**: Check terminal for server action errors

## Testing Workflow

To test locally:
1. Ensure PostgreSQL is running
2. Run `npx prisma migrate dev` (applies migrations)
3. Run `npm run db:seed` (optional: seed test data)
4. Run `npm run dev`
5. Sign in with Clerk test account
6. Verify features in browser with React Query Devtools open

## Known Gotchas

- **Prisma Client must be regenerated** after schema changes (`npx prisma generate`)
- **React Query cache keys** must match between server prefetch and client useQuery
- **Server actions** can only return serializable data (no functions, Date objects need special handling)
- **Middleware runs on ALL routes** matching config.matcher, not just protected ones
- **Search params** trigger re-renders; use them carefully to avoid infinite loops
- **AG Grid license**: Currently using Community Edition (free); ensure no Enterprise features are used

## Production Deployment

Deployed on Vercel:
1. Environment variables set in Vercel dashboard
2. Database hosted on Railway
3. Build command: `npx prisma generate && next build` (defined in package.json)
4. Automatic deployments on git push to main branch
