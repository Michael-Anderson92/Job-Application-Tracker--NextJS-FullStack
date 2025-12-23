import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ============================================
  // CONFIGURATION
  // ============================================
  // Replace with your actual Clerk user ID
  const clerkId = 'user_37E1L8tl50NXv6y4Bwqgq5qtoZU';

  console.log('🌱 Starting seed...');
  console.log(`📝 Using Clerk ID: ${clerkId}`);

  // ============================================
  // CLEAN UP EXISTING DATA (Optional)
  // ============================================
  console.log('🧹 Cleaning up existing data...');
  
  await prisma.jobContact.deleteMany({ where: { job: { clerkId } } });
  await prisma.interview.deleteMany({ where: { job: { clerkId } } });
  await prisma.job.deleteMany({ where: { clerkId } });
  await prisma.resume.deleteMany({ where: { clerkId } });
  await prisma.contact.deleteMany({ where: { clerkId } });
  await prisma.token.deleteMany({ where: { clerkId } });

  console.log('✅ Cleanup complete');

  // ============================================
  // CREATE RESUMES
  // ============================================
  console.log('📄 Creating resumes...');

  const resume1 = await prisma.resume.create({
    data: {
      clerkId,
      name: 'Full-Stack Developer Resume',
      version: 'v2.1',
      focusArea: 'Full-Stack',
      fileUrl: 'https://example.com/resumes/fullstack-v2.1.pdf',
    },
  });

  const resume2 = await prisma.resume.create({
    data: {
      clerkId,
      name: 'Frontend Specialist Resume',
      version: 'v1.5',
      focusArea: 'Frontend',
      fileUrl: 'https://example.com/resumes/frontend-v1.5.pdf',
    },
  });

  const resume3 = await prisma.resume.create({
    data: {
      clerkId,
      name: 'Backend Engineer Resume',
      version: 'v3.0',
      focusArea: 'Backend',
      fileUrl: null, // Example of resume without file URL
    },
  });

  console.log(`✅ Created ${3} resumes`);

  // ============================================
  // CREATE CONTACTS
  // ============================================
  console.log('👥 Creating contacts...');

  const contact1 = await prisma.contact.create({
    data: {
      clerkId,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@google.com',
      phone: '555-0101',
      title: 'Senior Technical Recruiter',
      company: 'Google',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      notes: 'Very responsive, prefers email contact',
    },
  });

  const contact2 = await prisma.contact.create({
    data: {
      clerkId,
      name: 'Michael Chen',
      email: 'mchen@apple.com',
      phone: null,
      title: 'Engineering Manager',
      company: 'Apple',
      linkedin: 'https://linkedin.com/in/michaelchen',
      notes: 'Connected through mutual friend',
    },
  });

  const contact3 = await prisma.contact.create({
    data: {
      clerkId,
      name: 'Emily Rodriguez',
      email: 'emily.r@meta.com',
      phone: '555-0103',
      title: 'Talent Acquisition Specialist',
      company: 'Meta',
      linkedin: null,
      notes: null,
    },
  });

  const contact4 = await prisma.contact.create({
    data: {
      clerkId,
      name: 'David Park',
      email: null,
      phone: '555-0104',
      title: 'HR Director',
      company: 'Netflix',
      linkedin: 'https://linkedin.com/in/davidpark',
      notes: 'Met at tech conference in 2024',
    },
  });

  console.log(`✅ Created ${4} contacts`);

  // ============================================
  // CREATE JOBS
  // ============================================
  console.log('💼 Creating jobs...');

  const job1 = await prisma.job.create({
    data: {
      clerkId,
      position: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      status: 'interview',
      mode: 'full-time',
      jobUrl: 'https://careers.google.com/jobs/123456',
      website: 'https://google.com',
      salaryRange: '$150k-180k',
      resumeId: resume1.id,
      coverLetterUrl: 'https://example.com/cover-letters/google-swe.pdf',
      notes: 'Focus on distributed systems experience. Team works on Google Cloud infrastructure.',
      appliedDate: new Date('2024-12-01'),
      lastContact: new Date('2024-12-15'),
      nextFollowUp: new Date('2024-12-28'),
    },
  });

  const job2 = await prisma.job.create({
    data: {
      clerkId,
      position: 'Frontend Developer',
      company: 'Apple',
      location: 'Cupertino, CA',
      status: 'applied',
      mode: 'full-time',
      jobUrl: 'https://jobs.apple.com/en-us/details/200498765',
      website: 'https://apple.com',
      salaryRange: '$130k-160k',
      resumeId: resume2.id,
      coverLetterUrl: 'https://example.com/cover-letters/apple-frontend.pdf',
      notes: 'Working on Apple Music web interface. SwiftUI experience is a plus.',
      appliedDate: new Date('2024-12-05'),
      lastContact: null,
      nextFollowUp: new Date('2024-12-22'),
    },
  });

  const job3 = await prisma.job.create({
    data: {
      clerkId,
      position: 'Full Stack Engineer',
      company: 'Meta',
      location: 'Menlo Park, CA',
      status: 'offer',
      mode: 'full-time',
      jobUrl: 'https://www.metacareers.com/jobs/987654321',
      website: 'https://meta.com',
      salaryRange: '$140k-170k',
      resumeId: resume1.id,
      coverLetterUrl: null,
      notes: 'Offer received! Need to respond by Dec 30. React and GraphQL stack.',
      appliedDate: new Date('2024-11-15'),
      lastContact: new Date('2024-12-18'),
      nextFollowUp: new Date('2024-12-30'),
    },
  });

  const job4 = await prisma.job.create({
    data: {
      clerkId,
      position: 'Software Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      status: 'rejected',
      mode: 'full-time',
      jobUrl: 'https://jobs.netflix.com/jobs/456789',
      website: 'https://netflix.com',
      salaryRange: '$160k-200k',
      resumeId: resume3.id,
      coverLetterUrl: 'https://example.com/cover-letters/netflix-backend.pdf',
      notes: 'Rejected after technical round. Focus more on microservices architecture next time.',
      appliedDate: new Date('2024-11-20'),
      lastContact: new Date('2024-12-10'),
      nextFollowUp: null,
    },
  });

  const job5 = await prisma.job.create({
    data: {
      clerkId,
      position: 'Backend Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      status: 'screening',
      mode: 'full-time',
      jobUrl: 'https://amazon.jobs/en/jobs/11223344',
      website: 'https://amazon.com',
      salaryRange: '$145k-175k',
      resumeId: resume3.id,
      coverLetterUrl: null,
      notes: 'Phone screen scheduled for next week. AWS experience is crucial.',
      appliedDate: new Date('2024-12-10'),
      lastContact: new Date('2024-12-17'),
      nextFollowUp: new Date('2024-12-24'),
    },
  });

  const job6 = await prisma.job.create({
    data: {
      clerkId,
      position: 'React Developer',
      company: 'Airbnb',
      location: 'Remote',
      status: 'applied',
      mode: 'remote',
      jobUrl: 'https://careers.airbnb.com/positions/5566778',
      website: 'https://airbnb.com',
      salaryRange: '$120k-150k',
      resumeId: resume2.id,
      coverLetterUrl: 'https://example.com/cover-letters/airbnb-react.pdf',
      notes: 'Fully remote position. Focus on component library development.',
      appliedDate: new Date('2024-12-12'),
      lastContact: null,
      nextFollowUp: null,
    },
  });

  console.log(`✅ Created ${6} jobs`);

  // ============================================
  // CREATE INTERVIEWS
  // ============================================
  console.log('🎤 Creating interviews...');

  // Job 1 (Google) - Multiple interview rounds
  await prisma.interview.create({
    data: {
      jobId: job1.id,
      round: 'Phone Screen',
      date: new Date('2024-12-08T10:00:00'),
      duration: 45,
      interviewer: 'Sarah Johnson',
      outcome: 'passed',
      notes: 'Discussed background and experience. Very positive conversation.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job1.id,
      round: 'Technical Round 1',
      date: new Date('2024-12-15T14:00:00'),
      duration: 60,
      interviewer: 'Alex Kim',
      outcome: 'passed',
      notes: 'Coding challenge on distributed systems. Solved 2/2 problems.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job1.id,
      round: 'System Design',
      date: new Date('2024-12-20T15:00:00'),
      duration: 90,
      interviewer: 'Jennifer Lee',
      outcome: 'waiting',
      notes: 'Designed a scalable notification system. Waiting for feedback.',
    },
  });

  // Job 3 (Meta) - Completed interview process
  await prisma.interview.create({
    data: {
      jobId: job3.id,
      round: 'Recruiter Call',
      date: new Date('2024-11-22T11:00:00'),
      duration: 30,
      interviewer: 'Emily Rodriguez',
      outcome: 'passed',
      notes: 'Initial screening. Discussed role expectations.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job3.id,
      round: 'Technical Interview',
      date: new Date('2024-12-02T13:00:00'),
      duration: 75,
      interviewer: 'Marcus Johnson',
      outcome: 'passed',
      notes: 'React and GraphQL questions. Built a small component live.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job3.id,
      round: 'Behavioral Round',
      date: new Date('2024-12-09T10:00:00'),
      duration: 60,
      interviewer: 'Lisa Chen',
      outcome: 'passed',
      notes: 'Discussed team collaboration and past projects.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job3.id,
      round: 'Final Round',
      date: new Date('2024-12-16T16:00:00'),
      duration: 45,
      interviewer: 'Director of Engineering',
      outcome: 'passed',
      notes: 'Met with director. Received offer same day!',
    },
  });

  // Job 4 (Netflix) - Rejected after technical
  await prisma.interview.create({
    data: {
      jobId: job4.id,
      round: 'Phone Screen',
      date: new Date('2024-11-28T09:00:00'),
      duration: 30,
      interviewer: 'David Park',
      outcome: 'passed',
      notes: 'Brief technical discussion.',
    },
  });

  await prisma.interview.create({
    data: {
      jobId: job4.id,
      round: 'Technical Round',
      date: new Date('2024-12-05T14:00:00'),
      duration: 90,
      interviewer: 'Senior Engineer',
      outcome: 'rejected',
      notes: 'Struggled with microservices architecture question. Need to study more.',
    },
  });

  // Job 5 (Amazon) - Scheduled interview
  await prisma.interview.create({
    data: {
      jobId: job5.id,
      round: 'Phone Screen',
      date: new Date('2024-12-24T10:00:00'),
      duration: null,
      interviewer: null,
      outcome: null,
      notes: 'Scheduled for Dec 24. Prepare AWS and system design questions.',
    },
  });

  console.log(`✅ Created ${10} interviews`);

  // ============================================
  // LINK JOBS TO CONTACTS (JobContact)
  // ============================================
  console.log('🔗 Linking jobs to contacts...');

  // Google job - Recruiter
  await prisma.jobContact.create({
    data: {
      jobId: job1.id,
      contactId: contact1.id,
      role: 'Recruiter',
      notes: 'Primary point of contact. Very helpful throughout process.',
    },
  });

  // Apple job - Hiring Manager
  await prisma.jobContact.create({
    data: {
      jobId: job2.id,
      contactId: contact2.id,
      role: 'Hiring Manager',
      notes: 'Will be my manager if hired. Seems like great mentor.',
    },
  });

  // Meta job - Recruiter
  await prisma.jobContact.create({
    data: {
      jobId: job3.id,
      contactId: contact3.id,
      role: 'Recruiter',
      notes: 'Coordinated all interviews. Send thank you note!',
    },
  });

  // Netflix job - HR
  await prisma.jobContact.create({
    data: {
      jobId: job4.id,
      contactId: contact4.id,
      role: 'HR Director',
      notes: 'Delivered rejection news. Keep in touch for future opportunities.',
    },
  });

  console.log(`✅ Created ${4} job-contact links`);

  // ============================================
  // CREATE AI TOKENS
  // ============================================
  console.log('🪙 Creating AI tokens...');

  await prisma.token.create({
    data: {
      clerkId,
      tokens: 1000,
    },
  });

  console.log(`✅ Created token record`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n✨ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   • Resumes: 3`);
  console.log(`   • Contacts: 4`);
  console.log(`   • Jobs: 6`);
  console.log(`   • Interviews: 10`);
  console.log(`   • Job-Contact Links: 4`);
  console.log(`   • Token Records: 1`);
  console.log('\n🎯 Status breakdown:');
  console.log(`   • Applied: 2 jobs`);
  console.log(`   • Screening: 1 job`);
  console.log(`   • Interview: 1 job`);
  console.log(`   • Offer: 1 job`);
  console.log(`   • Rejected: 1 job`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });