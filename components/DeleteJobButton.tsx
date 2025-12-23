/**
 * DeleteJobButton (Client Component)
 *
 * Button for deleting job applications.
 * Uses 'use client' because it needs:
 * - useMutation for delete operations
 * - Event handlers for button clicks
 */
'use client';

import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { colors } from '@/lib/design-system';

function DeleteJobBtn({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'job removed' });
    },
  });
  return (
    <Button
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
      style={{
        backgroundColor: colors.error,
        color: colors.white,
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}
export default DeleteJobBtn;
