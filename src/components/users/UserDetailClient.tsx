'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUsers';
import { Button } from '@/components/ui/Button';

interface UserDetailClientProps {
  id: number;
}

export function UserDetailClient({ id }: UserDetailClientProps) {
  const router = useRouter();
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">User not found</p>
          <Button onClick={() => router.push('/')}>Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Button variant="secondary" onClick={() => router.push('/')} className="mb-6">
        ← Back
      </Button>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1 text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Contact
              </h2>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{user.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{user.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Website</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{user.website}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Company
              </h2>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Name</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{user.company.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Catchphrase</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{user.company.catchPhrase}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Address
            </h2>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Street</div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {user.address.street}, {user.address.suite}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">City</div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {user.address.city}, {user.address.zipcode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
