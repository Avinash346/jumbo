import { describe, it, expect, beforeEach } from 'vitest';
import { useActivityLogStore } from '@/store/useActivityLogStore';

describe('useActivityLogStore', () => {
  beforeEach(() => {
    useActivityLogStore.setState({ logs: [] });
  });

  it('should initialize with empty logs', () => {
    const { logs } = useActivityLogStore.getState();
    expect(logs).toEqual([]);
  });

  it('should add a log entry', () => {
    const { addLog } = useActivityLogStore.getState();
    addLog({ type: 'ADD', userName: 'John Doe' });
    
    const { logs } = useActivityLogStore.getState();
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe('ADD');
    expect(logs[0].userName).toBe('John Doe');
    expect(logs[0].id).toBeDefined();
    expect(logs[0].timestamp).toBeDefined();
  });

  it('should add multiple log entries', () => {
    const { addLog } = useActivityLogStore.getState();
    addLog({ type: 'ADD', userName: 'User 1' });
    addLog({ type: 'EDIT', userName: 'User 2' });
    addLog({ type: 'DELETE', userName: 'User 3' });
    
    const { logs } = useActivityLogStore.getState();
    expect(logs).toHaveLength(3);
    expect(logs[0].userName).toBe('User 3'); // Most recent first
    expect(logs[1].userName).toBe('User 2');
    expect(logs[2].userName).toBe('User 1');
  });

  it('should limit logs to 50 entries', () => {
    const { addLog } = useActivityLogStore.getState();
    
    // Add 60 logs
    for (let i = 0; i < 60; i++) {
      addLog({ type: 'ADD', userName: `User ${i}` });
    }
    
    const { logs } = useActivityLogStore.getState();
    expect(logs).toHaveLength(50);
    expect(logs[0].userName).toBe('User 59'); // Most recent
    expect(logs[49].userName).toBe('User 10'); // Oldest kept
  });
});
