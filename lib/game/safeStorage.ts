type StorageKind = 'local' | 'session';

function getStore(kind: StorageKind): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStorage(key: string, kind: StorageKind = 'local'): string | null {
  try {
    return getStore(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string, kind: StorageKind = 'local'): void {
  try {
    getStore(kind)?.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the setting just won't persist.
  }
}
