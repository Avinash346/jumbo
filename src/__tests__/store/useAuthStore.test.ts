import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/lib/types';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  phone: '123-456-7890',
  website: 'example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '10001',
    geo: { lat: '40.7128', lng: '-74.0060' },
  },
  company: {
    name: 'Test Company',
    catchPhrase: 'Testing is fun',
    bs: 'test business',
  },
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
  });

  it('should initialize with null user', () => {
    const { user } = useAuthStore.getState();
    expect(user).toBeNull();
  });

  it('should set user', () => {
    const { setUser } = useAuthStore.getState();
    setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('should clear user', () => {
    const { setUser } = useAuthStore.getState();
    setUser(mockUser);
    setUser(null);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
