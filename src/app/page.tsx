'use client';

import { useState, useMemo, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { UserFilters } from '@/components/users/UserFilters';
import { UserTable } from '@/components/users/UserTable';
import { UserFormDialog } from '@/components/users/UserFormDialog';
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog';
import { ActivityLog } from '@/components/users/ActivityLog';

export default function HomePage() {
  const { data: users = [], isLoading, error } = useUsers();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (users.length > 0) {
      setUser(users[0]);
    }
  }, [users, setUser]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const ITEMS_PER_PAGE = 10;

  const companies = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.company.name)));
  }, [users]);

  const processedUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCompany !== 'all') {
      filtered = filtered.filter((user) => user.company.name === selectedCompany);
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });

    return filtered;
  }, [users, searchQuery, selectedCompany, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedUsers, currentPage]);

  const totalPages = Math.ceil(processedUsers.length / ITEMS_PER_PAGE);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-12 text-red-600 dark:text-red-400">Error loading users</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
            <Button variant="success" onClick={() => setIsAddDialogOpen(true)}>+ Add User</Button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <UserFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCompany={selectedCompany}
                onCompanyChange={setSelectedCompany}
                companies={companies}
              />
            </div>

            <UserTable
              users={paginatedUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortOrder={sortOrder}
              onSortChange={handleSortToggle}
            />

            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>

      <UserFormDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <UserFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
      />
      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
      />
    </div>
  );
}
