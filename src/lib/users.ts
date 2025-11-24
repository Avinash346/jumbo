import axiosInstance from './axios';
import { User } from './types';

// API helper functions for user operations

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put<User>(`/users/${id}`, updates);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
