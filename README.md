# Jobhead - Job Application Tracker

> A comprehensive job search management system built for my own tech job hunt. Forked and completely reimagined with neubrutalist design, expanded database architecture, and professional-grade data management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Why I Built This

As a career transitioner from HVAC to software engineering, I needed a robust system to track 100+ job applications. The original template was a good starting point, but I needed something more comprehensive for serious job hunting.

## 🚀 Live Demo

[View Live Application](#) <!-- Add your deployment URL -->

## 📸 Screenshots

<!-- Add screenshots of your neubrutalist design -->

---

## ⚡ What Makes This Different

This isn't just a fork - I've rebuilt major portions to fit my workflow:

### 🎨 Complete Design Overhaul
- **Neubrutalist UI** - Bold borders, hard shadows, high-contrast design system
- Redesigned dashboard with modern, functional aesthetics
- Custom AG Grid integration for professional data tables
- Responsive layouts optimized for job search workflow

### 🗄️ Expanded Database Architecture

**Original Schema:**
- 5 basic fields (position, company, location, status, mode)
- Simple CRUD operations
- No relationships

**My Schema:**
- **20+ fields** across multiple related tables
- **Resume management** - Version control, focus areas, file storage
- **Interview tracking** - Multiple rounds, outcomes, notes per job
- **Contact management** - Recruiters, hiring managers, networking contacts
- **Many-to-many relationships** - Jobs ↔ Contacts with role context
- **Timeline tracking** - Application dates, follow-ups, last contact
- **Compensation data** - Salary ranges, offer details
- **Application materials** - Resume versions, cover letters, links

### 🛠️ Technical Improvements
- Production-grade database on Railway with proper indexing
- AG Grid for advanced data manipulation (sorting, filtering, grouping)
- Enhanced Prisma schema with cascading deletes
- Optimized queries with strategic indexes
- Type-safe relationships throughout

---

## 🏗️ Database Schema

```prisma
Job {
  // Core Details
  position, company, location, status, mode
  jobUrl, website, salaryRange
  
  // Timeline
  appliedDate, lastContact, nextFollowUp
  
  // Relationships
  resume → Resume (which version used)
  interviews → Interview[] (all rounds)
  contacts → JobContact[] (recruiters, managers)
  
  // Materials & Notes
  coverLetterUrl, notes
}

Resume {
  name, version, focusArea, fileUrl
  jobs → Job[] (where this resume was used)
}

Interview {
  round, date, duration, interviewer
  notes, outcome
  job → Job
}

Contact {
  name, email, phone, title, company, linkedin
  jobs → JobContact[] (connected jobs)
}

JobContact {
  // Many-to-many link between Jobs and Contacts
  role (e.g., "Recruiter", "Hiring Manager")
  notes (about this specific connection)
}
```

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS (Neubrutalist design system)
- AG Grid (Professional data tables)
- shadcn/ui components
- React Hook Form + Zod validation

**Backend:**
- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Railway)
- Clerk Authentication

**Infrastructure:**
- Vercel deployment
- Railway PostgreSQL
- Vercel Blob (resume storage)

---

## ✨ Features

### Core Functionality (Retained)
✅ Create, edit, delete job applications  
✅ Search and filter by multiple criteria  
✅ Status tracking (applied, screening, interview, offer, rejected)  
✅ User authentication with Clerk  
✅ Responsive design  

### My Additions
✅ **Resume management** - Upload, version, and track which resume used for each job  
✅ **Interview tracking** - Log multiple rounds with dates, interviewers, outcomes  
✅ **Contact database** - Store recruiters, hiring managers, networking contacts  
✅ **Relationship mapping** - Connect contacts to jobs with role context  
✅ **Timeline management** - Track application dates, follow-ups, last contact  
✅ **Compensation tracking** - Log salary ranges and offers  
✅ **Application materials** - Link to cover letters, portfolios, job postings  
✅ **Advanced data grid** - AG Grid with sorting, filtering, grouping  
✅ **Neubrutalist design** - Modern, bold UI that's functional and beautiful  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/Michael-Anderson92/Job-Application-Tracker--NextJS-FullStack.git
cd Job-Application-Tracker--NextJS-FullStack
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Database (Railway PostgreSQL recommended)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

4. **Run database migrations**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── add-job/          # Add new job application
│   │   ├── jobs/              # All jobs + individual job pages
│   │   ├── stats/             # Analytics dashboard
│   │   └── layout.tsx         # Dashboard layout (redesigned)
│   └── page.tsx               # Landing page (being redesigned)
├── components/
│   ├── ui/                    # shadcn/ui + custom components
│   ├── JobsList.tsx           # AG Grid implementation
│   ├── CreateJobForm.tsx      # Enhanced form with new fields
│   └── ...
├── prisma/
│   └── schema.prisma          # Expanded database schema
└── utils/
    ├── actions.ts             # Server actions (CRUD + new features)
    └── types.ts               # TypeScript types + Zod schemas
```

---

## 🎨 Design Philosophy

**Neubrutalism** - A design trend characterized by:
- Bold, thick borders
- Hard drop shadows
- High contrast colors
- Brutalist typography
- Functional, no-nonsense layouts
- Raw, unpolished aesthetic

I chose this style because:
1. It's distinctive and memorable
2. It's highly functional for data-heavy applications
3. It reflects my direct, practical approach to problem-solving
4. It stands out in a sea of minimalist designs

---

## 🔄 Roadmap

**In Progress:**
- [ ] Landing page redesign
- [ ] Inner dashboard page redesigns
- [ ] Resume upload and storage (Vercel Blob)
- [ ] Interview scheduling calendar view

**Planned:**
- [ ] Email integration (auto-import job emails)
- [ ] Analytics dashboard expansion
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] AI-powered job matching suggestions

---

## 🙏 Attribution

This project is a heavily modified fork of [Job Application Tracker](https://github.com/arnobt78/Job-Application-Tracker--NextJS-FullStack) by [@arnobt78](https://github.com/arnobt78).

**My Fork:** [github.com/Michael-Anderson92/Job-Application-Tracker--NextJS-FullStack](https://github.com/Michael-Anderson92/Job-Application-Tracker--NextJS-FullStack)

**What I kept:**
- Authentication scaffolding with Clerk
- Basic CRUD structure
- Some UI components from shadcn/ui

**What I changed:**
- Complete database schema redesign (5 fields → 20+ fields, 4 new tables)
- Full UI/UX overhaul with neubrutalist design
- AG Grid integration for professional data management
- Added resume management, interview tracking, contact database
- Expanded server actions for new features
- Production infrastructure on Railway

The original template provided a solid foundation, but this version represents hundreds of hours of custom development tailored to my specific job search needs.

---

## 📝 Why Open Source This?

As a career changer, I benefited from open-source learning resources. This project demonstrates:

1. **Real-world problem solving** - Not a tutorial project, but a tool I actually use daily
2. **Database design** - How to structure relationships for complex data
3. **Full-stack TypeScript** - Type safety from database to UI
4. **Modern Next.js patterns** - Server Actions, React Query, App Router
5. **Career transition story** - Proof that career changers can build production apps

If you're job hunting in tech, feel free to fork this and adapt it for your needs. If you're a hiring manager, this shows how I approach problems: identify needs, research solutions, build iteratively, and ship.

---

## 📧 Contact

**Michael Anderson**  
Former HVAC Technician → Software Engineer  
[LinkedIn](https://linkedin.com/in/Michael-Anderson92) | [Portfolio](https://michaelanderson.dev) | [Email](mailto:Michael_Anderson92@gmail.com)

---

## 📄 License

MIT License - feel free to use this for your own job search.

---

## 🎯 Current Status

**Using this daily** to track my job search. As of December 2024:
- 50+ applications tracked
- 3 resume versions managed
- 12 interviews logged
- 20+ contacts stored

This is a living project that evolves with my job search needs.

---

**⭐ If this helps you, give it a star! If you're hiring, let's talk.**
