'use client';

import { User } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

export const UserTable = ({ users, onEdit, onDelete, sortOrder, onSortChange }: UserTableProps) => {
  const router = useRouter();

  const handleRowClick = (userId: number, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/users/${userId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onSortChange}
            >
              Email {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Company</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={(e) => handleRowClick(user.id, e)}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.phone}</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.company.name}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                    className="text-xs px-3 py-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user);
                    }}
                    className="text-xs px-3 py-1"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
          No users found
        </div>
      )}
    </div>
  );
};
