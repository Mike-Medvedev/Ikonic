import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = <T>({ key }: { key: string }) => {
  const retrieve = async (): Promise<T> => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) throw new Error("Error Retrieving Item ");
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const store = async (value: T): Promise<void> => {
    try {
      if (!value) throw new Error("Error item is null or undefined");
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error;
      throw error;
    }
  };

  return { retrieve, store };
};
export default useLocalStorage;
