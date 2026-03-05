export const storage = {
  get: <T>(key: string, initial: T): T => {
    if (typeof window === 'undefined') return initial;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  },
  set: <T>(key: string, value: T) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
  }
};