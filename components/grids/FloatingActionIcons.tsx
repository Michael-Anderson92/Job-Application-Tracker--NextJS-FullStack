"use client";

import { Eye, ExternalLink } from 'lucide-react';
import { colors } from '@/lib/design-system';

type Job = {
  id: string;
  jobUrl: string | null;
};

type FloatingActionIconsProps = {
  jobs: Job[];
  rowHeight: number; // Height of each row
  headerHeight: number; // Height of header
  currentPage: number; // Current pagination page
  pageSize: number; // Items per page
};

export function FloatingActionIcons({
  jobs,
  rowHeight,
  headerHeight,
  currentPage,
  pageSize
}: FloatingActionIconsProps) {
  // Calculate which jobs are visible on current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleJobs = jobs.slice(startIndex, endIndex);

  return (
    <div
      className="floating-actions-container"
      style={{
        position: 'absolute',
        right: '-90px', // Position to the right of grid
        top: `${headerHeight}px`, // Start below header
        width: '70px',
        zIndex: 10,
      }}
    >
      {visibleJobs.map((job, index) => {
        const topPosition = index * rowHeight;

        return (
          <div
            key={job.id}
            className="floating-action-icons"
            style={{
              position: 'absolute',
              top: `${topPosition}px`,
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              height: `${rowHeight}px`,
            }}
          >
            {/* Eye Icon - View */}
            <button
              onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
              className="floating-icon-button"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                border: `3px solid #9333EA`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `4px 4px 0px ${colors.text}`,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.text}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.text}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.text}`;
              }}
              aria-label="View job details"
            >
              <Eye size={20} color={colors.text} strokeWidth={2.5} />
            </button>

            {/* Web Icon - Job Posting (only if jobUrl exists) */}
            {job.jobUrl && (
              <button
                onClick={() => window.open(job.jobUrl || undefined, '_blank')}
                className="floating-icon-button"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FFFFFF',
                  border: `3px solid #9333EA`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: `4px 4px 0px ${colors.text}`,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.text}`;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.text}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.text}`;
                }}
                aria-label="View job posting"
              >
                <ExternalLink size={18} color={colors.text} strokeWidth={2.5} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
