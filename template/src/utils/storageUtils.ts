import { MMKV } from "react-native-mmkv";
import { getStorageKey } from "../constants/storageKeys";
import { StorageKeyValuePairs } from "../constants/storageKeys";
import { StorageKey } from "../constants/storageKeys";
export const storage = new MMKV();

export function setItem<K extends StorageKey>(
  key: K,
  value: StorageKeyValuePairs[K]
): void {
  storage.set(getStorageKey(key), JSON.stringify(value));
}

export function getItem<K extends StorageKey>(
  key: K
): StorageKeyValuePairs[K] | null {
  const storageKey = getStorageKey(key);
  const value = storage.getString(getStorageKey(key));
  return value ? (JSON.parse(value) as StorageKeyValuePairs[K]) : null;
}

export function removeItem(key: StorageKey): void {
  storage.delete(getStorageKey(key));
}
