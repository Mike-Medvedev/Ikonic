import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const user_id = await AsyncStorage.getItem("user_id");
        console.log(user_id);
        if (!user_id) throw new Error("WHERE IS THE USER ID?");
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/profile/${user_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "any" },
        });
        if (!response.ok) {
          throw new Error("Error fetching profile data");
        }
        const data = await response.json();
        setProfile(data.profile_data);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { profile, isLoading, error };
};

export default useProfile;
