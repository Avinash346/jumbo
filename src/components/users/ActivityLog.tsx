'use client';

import { useActivityLogStore } from '@/store/useActivityLogStore';

export const ActivityLog = () => {
  const logs = useActivityLogStore((state) => state.logs);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">Activity</h2>
      </div>
      <div className="p-4">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No activity</p>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 10).map((log) => (
              <div key={log.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{log.type}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(log.timestamp)}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">{log.userName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
