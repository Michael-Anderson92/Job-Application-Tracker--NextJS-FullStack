// /**
//  * JobCard Component
//  *
//  * Displays a single job application as a card with:
//  * - Job position (title) and company name
//  * - Job details (mode, location, date, status)
//  * - Action buttons (edit, delete)
//  *
//  * This is a presentational component that receives job data as props.
//  * Used in the jobs list page to display each job application.
//  */
// import { JobType } from '@/utils/types';
// import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

// import Link from 'next/link';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Separator } from './ui/separator';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import JobInfo from './JobInfo';
// import DeleteJobButton from './DeleteJobButton';
// import { colors, getStatusColor } from '@/lib/design-system';

// /**
//  * JobCard Component
//  *
//  * @param job - Job application data to display
//  */
// function JobCard({ job }: { job: JobType }) {
//   // Format the creation date as a localized date string
//   // toLocaleDateString() converts Date to user's locale format (e.g., "12/21/2025")
//   const date = new Date(job.createdAt).toLocaleDateString();
//   const statusColor = getStatusColor(job.status);

//   return (
//     <Card
//       className='border-2'
//       style={{
//         backgroundColor: colors.background,
//         borderColor: colors.border,
//       }}
//     >
//       <CardHeader>
//         <CardTitle style={{ color: colors.text }}>{job.position}</CardTitle>
//         <CardDescription style={{ color: colors.text, opacity: 0.7 }}>
//           {job.company}
//         </CardDescription>
//       </CardHeader>
//       <Separator style={{ backgroundColor: colors.border }} />
//       <CardContent className='mt-4 grid grid-cols-2 gap-4'>
//         <JobInfo icon={<Briefcase />} text={job.mode} />
//         <JobInfo icon={<MapPin />} text={job.location} />
//         <JobInfo icon={<CalendarDays />} text={date} />
//         <Badge
//           className='w-32 justify-center uppercase font-semibold'
//           style={{
//             backgroundColor: statusColor,
//             color: job.status === 'applied' ? colors.foreground : colors.white,
//           }}
//         >
//           <JobInfo
//             icon={<RadioTower className='w-4 h-4' />}
//             text={job.status}
//           />
//         </Badge>
//       </CardContent>
//       <CardFooter className='flex gap-4'>
//         <Button
//           asChild
//           size='sm'
//           style={{
//             backgroundColor: colors.accent, // Teal (accent is now teal)
//             color: colors.white,
//           }}
//         >
//           <Link href={`/jobs/${job.id}`}>edit</Link>
//         </Button>
//         <DeleteJobButton id={job.id} />
//       </CardFooter>
//     </Card>
//   );
// }
// export default JobCard;
