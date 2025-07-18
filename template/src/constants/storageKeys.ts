export const StorageKeys = {
  THEME: "theme",
} as const;
export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
export type StorageKeyValuePairs = {
  [StorageKeys.THEME]: "light" | "dark";
};

export function getStorageKey<K extends StorageKey>(key: K): K {
  return key;
}
