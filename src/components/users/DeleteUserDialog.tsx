'use client';

import { AlertDialog } from '@/components/ui/AlertDialog';
import { User } from '@/lib/types';
import { useDeleteUserMutation } from '@/hooks/useUsers';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export const DeleteUserDialog = ({ open, onOpenChange, user }: DeleteUserDialogProps) => {
  const deleteMutation = useDeleteUserMutation();

  const handleConfirm = () => {
    if (user) {
      deleteMutation.mutate(user.id, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete User"
      description={`Are you sure you want to delete ${user?.name}? This action cannot be undone.`}
      onConfirm={handleConfirm}
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
};
