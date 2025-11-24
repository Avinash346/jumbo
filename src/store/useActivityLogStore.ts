import { create } from 'zustand';
import { ActivityLog } from '@/lib/types';

interface ActivityLogStore {
  logs: ActivityLog[];
  addLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

export const useActivityLogStore = create<ActivityLogStore>((set) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [
        {
          ...log,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        ...state.logs,
      ].slice(0, 50), // Keep only last 50 logs
    })),
}));
