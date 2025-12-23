"use client";

/**
 * CreateJobForm (Client Component)
 *
 * Form for creating new job applications.
 * Uses 'use client' because it needs:
 * - useState for form state and error handling
 * - Event handlers for form submission
 * - useQueryClient for cache invalidation
 */
import { useState } from 'react';
import { colors, buttonVariants, inputVariants } from '@/lib/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { JobStatus, JobMode, CreateAndEditJobType } from '@/utils/types';

type CreateJobFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    
    // Convert FormData to typed object
    const jobData: CreateAndEditJobType = {
      position: formData.get('position') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      status: formData.get('status') as JobStatus,
      mode: formData.get('mode') as JobMode,
      salaryRange: formData.get('salaryRange') as string || '',
      jobUrl: formData.get('jobUrl') as string || '',
      website: formData.get('website') as string || '',
      notes: formData.get('notes') as string || '',
    };
    
    try {
      // Call API route instead of Server Action
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      // Success! Invalidate queries and switch back to grid
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      onSuccess();
    } catch (error) {
      console.error('Failed to create job:', error);
      setErrors({ submit: 'Failed to create job. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div 
      className="w-full p-8"
      style={{ 
        backgroundColor: colors.componentBg,
        minHeight: '600px'
      }}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Error message */}
        {errors.submit && (
          <div 
            className="p-4 rounded border-2"
            style={{
              backgroundColor: '#FEE2E2',
              borderColor: '#DC2626',
              color: '#991B1B'
            }}
          >
            {errors.submit}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Position */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Position *
            </label>
            <input
              type="text"
              name="position"
              required
              className={inputVariants.default}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          {/* Company */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Company *
            </label>
            <input
              type="text"
              name="company"
              required
              className={inputVariants.default}
              placeholder="e.g., Google"
            />
          </div>

          {/* Location */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              className={inputVariants.default}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          {/* Status */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Status *
            </label>
            <select
              name="status"
              required
              className={inputVariants.default}
              defaultValue={JobStatus.Applied}
            >
              <option value={JobStatus.Applied}>Applied</option>
              <option value={JobStatus.Screening}>Screening</option>
              <option value={JobStatus.Interview}>Interview</option>
              <option value={JobStatus.Offer}>Offer</option>
              <option value={JobStatus.Rejected}>Rejected</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Employment Type *
            </label>
            <select
              name="mode"
              required
              className={inputVariants.default}
              defaultValue={JobMode.FullTime}
            >
              <option value={JobMode.FullTime}>Full-time</option>
              <option value={JobMode.PartTime}>Part-time</option>
              <option value={JobMode.Contract}>Contract</option>
              <option value={JobMode.Hybrid}>Hybrid</option>
              <option value={JobMode.Remote}>Remote</option>
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Salary Range
            </label>
            <input
              type="text"
              name="salaryRange"
              className={inputVariants.default}
              placeholder="e.g., $120k-150k"
            />
          </div>

          {/* Job URL */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Job Posting URL
            </label>
            <input
              type="url"
              name="jobUrl"
              className={inputVariants.default}
              placeholder="https://..."
            />
          </div>

          {/* Website */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Company Website
            </label>
            <input
              type="url"
              name="website"
              className={inputVariants.default}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Notes - Full Width */}
        <div>
          <label 
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            className={inputVariants.default}
            placeholder="Additional details about this application..."
          />
        </div>

        {/* Action Buttons */}
        <div 
          className="flex gap-4 pt-4 border-t-2"
          style={{ borderColor: colors.border }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonVariants.primary}
          >
            {isSubmitting ? 'Creating...' : 'Create Job'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={buttonVariants.outline}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}