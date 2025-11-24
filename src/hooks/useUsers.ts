import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/lib/users';
import { User } from '@/lib/types';
import { useActivityLogStore } from '@/store/useActivityLogStore';

// Query keys
const USERS_KEY = ['users'];
const userKey = (id: number) => ['users', id];

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers,
  });
};

// Fetch single user by ID
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKey(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

// Create user mutation with optimistic update
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const addLog = useActivityLogStore((state) => state.addLog);

  return useMutation({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: USERS_KEY });

      // Snapshot previous value
      const previousUsers = queryClient.getQueryData<User[]>(USERS_KEY);

      // Optimistically update with temporary ID
      // Note: JSONPlaceholder always returns ID 11 for new items, so we use Date.now() for uniqueness in UI
      const tempUser = { ...newUser, id: Date.now() };
      queryClient.setQueryData<User[]>(USERS_KEY, (old = []) => [...old, tempUser]);

      return { previousUsers };
    },
    onSuccess: (data) => {
      addLog({ type: 'ADD', userName: data.name });
    },
    onError: (_err, _newUser, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(USERS_KEY, context.previousUsers);
      }
    },
    // Removed onSettled invalidation because JSONPlaceholder is read-only
    // Refetching would wipe out our local changes
  });
};

// Update user mutation with optimistic update
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const addLog = useActivityLogStore((state) => state.addLog);

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<User> }) =>
      updateUser(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: USERS_KEY });

      const previousUsers = queryClient.getQueryData<User[]>(USERS_KEY);

      // Optimistically update
      queryClient.setQueryData<User[]>(USERS_KEY, (old = []) =>
        old.map((user) => (user.id === id ? { ...user, ...updates } : user))
      );

      return { previousUsers };
    },
    onSuccess: (data) => {
      addLog({ type: 'EDIT', userName: data.name });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USERS_KEY, context.previousUsers);
      }
    },
    // Removed onSettled invalidation because JSONPlaceholder is read-only
  });
};

// Delete user mutation with optimistic update
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const addLog = useActivityLogStore((state) => state.addLog);

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: USERS_KEY });

      const previousUsers = queryClient.getQueryData<User[]>(USERS_KEY);
      const userToDelete = previousUsers?.find((u) => u.id === id);

      // Optimistically remove
      queryClient.setQueryData<User[]>(USERS_KEY, (old = []) =>
        old.filter((user) => user.id !== id)
      );

      return { previousUsers, userName: userToDelete?.name };
    },
    onSuccess: (_data, _id, context) => {
      if (context?.userName) {
        addLog({ type: 'DELETE', userName: context.userName });
      }
    },
    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USERS_KEY, context.previousUsers);
      }
    },
    // Removed onSettled invalidation because JSONPlaceholder is read-only
  });
};
