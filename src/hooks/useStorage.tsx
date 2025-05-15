import { StorageKey, StorageKeyValuePairs } from "@/constants/storageKeys";
import { removeItem, setItem, getItem } from "@/utils/storageUtils";
import { useState, useEffect } from "react";

export function useStorage<K extends StorageKey>(key: K) {
  const [storageItem, setStorageItem] = useState<
    StorageKeyValuePairs[K] | null
  >(null);

  const getData = async () => {
    try {
      const value = getItem(key);
      setStorageItem(value);
      return value;
    } catch (e) {}
  };

  const saveStorageItem = async (value: StorageKeyValuePairs[K]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await setItem(key, value);
      setStorageItem(value);
    } catch (e) {}
  };

  const clearStorage = async () => {
    try {
      await removeItem(key);
      setStorageItem(null);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return [storageItem, saveStorageItem, clearStorage];
}
