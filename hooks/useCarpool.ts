import { Car } from "@/models/Car";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import useProfile from "./useProfile";

const useCarpool = () => {
  const selectedTripId = useLocalSearchParams().selectedTrip;
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { profile } = useProfile();
  const addCar = (): void => {
    setCars((prev) => [...prev, { owner: profile, passengers: [], seatCount: 4 }]);
  };
  useEffect(() => {
    if (!selectedTripId) {
      setError(new Error("Please provide a valid trip ID"));
      return;
    }
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedTripId}/cars`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "any",
          },
        });
        if (!response.ok) throw new Error("Error Fetching Cars");
        const result = await response.json();
        setCars(result.cars);
      } catch (error: any) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  return { cars, setCars, addCar, isLoading, error };
};

export default useCarpool;
