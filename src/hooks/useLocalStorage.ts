import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLocalStorage() {
  async function get<T>({ key }: { key: string }): Promise<{ data: T | undefined; error: Error | undefined }> {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const parsedVal: T = JSON.parse(item);
        return { data: parsedVal, error: undefined };
      } else return { data: undefined, error: undefined };
    } catch (error) {
      return { data: undefined, error: error as Error };
    }
  }
  async function set<T>({ key, value }: { key: string; value: T }): Promise<{ error: Error | undefined }> {
    try {
      const stringifiedVal = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedVal);
      return { error: undefined };
    } catch (error) {
      return { error: error as Error };
    }
  }
  async function remove({ key }: { key: string }): Promise<{ error: Error | undefined }> {
    try {
      await AsyncStorage.removeItem(key);
      return { error: undefined };
    } catch (error) {
      return { error: error as Error };
    }
  }
  return { set, get, remove };
}
