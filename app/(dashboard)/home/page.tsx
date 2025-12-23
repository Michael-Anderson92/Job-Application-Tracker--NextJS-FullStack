"use client";

import { JobsGrid } from '@/components/grids/JobsGrid';
import { CreateJobForm } from '@/components/forms/CreateJobForm';
import { NeoButton } from '@/components/buttons/Neobutton'
import { useState } from 'react';
import { colors, buttonVariants } from '@/lib/design-system';
import { useQuery } from '@tanstack/react-query';
import { Archivo_Black } from 'next/font/google';

// Add Archivo Black font
const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type ViewState = 'grid' | 'create';

function HomePage() {
  const [view, setView] = useState<ViewState>('grid');

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: async () => {
      const response = await fetch('/api/jobs?page=1&limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p style={{ color: colors.text }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header with action buttons */}
      <div>
      <div 
        className="mb-6 p-6 border-solid border-4"
        style={{ 
          backgroundColor: 'rgb(174, 195, 232)',
          borderColor: colors.border,
          boxShadow: `8px 8px 0px ${colors.border}`
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 
              className={`text-4xl ${archivoBlack.className}`}
              style={{ 
                color: colors.text,
                letterSpacing: '0.05em'
              }}
            >
              {view === 'grid' ? 'JOB APPLICATIONS' : 'ADD NEW JOB'}
            </h1>
            {view === 'grid' && (
              <p className="text-sm mt-2" style={{ color: colors.text }}>
                {count} applications tracked
              </p>
            )}
          </div>

          {/* View Toggle Buttons */}
          <div className="flex gap-3">
            {view === 'create' && (
              <button
                onClick={() => setView('grid')}
                className={buttonVariants.outline}
              >
                ← Back to Grid
              </button>
            )}
            {view === 'grid' && count > 0 && (
              <NeoButton onClick={() => setView('create')}>
                + Add New Job
              </NeoButton>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Main Content Area */}
      <div>
        {view === 'grid' && (
          <JobsGrid 
            jobs={jobs} 
            onAddJobClick={() => setView('create')}
          />
        )}
        
        {view === 'create' && (
          <CreateJobForm 
            onSuccess={() => setView('grid')}
            onCancel={() => setView('grid')}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;