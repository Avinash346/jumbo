'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCreateUserMutation, useUpdateUserMutation } from '@/hooks/useUsers';

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

export const UserFormDialog = ({ open, onOpenChange, user }: UserFormDialogProps) => {
  const isEditing = !!user;
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company.name || '',
  });

  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      updateMutation.mutate(
        {
          id: user.id,
          updates: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: { ...user.company, name: formData.company },
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          name: formData.name,
          username: formData.name.toLowerCase().replace(/\s/g, ''),
          email: formData.email,
          phone: formData.phone,
          website: '',
          address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: { lat: '', lng: '' },
          },
          company: {
            name: formData.company,
            catchPhrase: '',
            bs: '',
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        }
      );
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  // Update form when user prop changes
  if (open && user && formData.name === '' && user.name !== '') {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} title={isEditing ? 'Edit User' : 'Add User'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
