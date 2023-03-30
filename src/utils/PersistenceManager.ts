export class PersistenceManager<TData> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(data: TData) {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(this.key, serializedState);
  }
  get() {
    if (typeof window !== 'undefined') {
      const peristedData = localStorage.getItem(this.key);
      return peristedData ? (JSON.parse(peristedData) as TData) : null;
    }
  }
  clear() {
    const peristedData = localStorage.getItem(this.key);
    return peristedData ? localStorage.removeItem(this.key) : null;
  }
}
