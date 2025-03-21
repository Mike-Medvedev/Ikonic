import { Car } from "@/models/Car";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import useProfile from "./useProfile";
import User from "@/models/User";
import { Alert } from "react-native";

const useCarpool = () => {
  const selectedTripId = useLocalSearchParams().selectedTrip;
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { profile: owner } = useProfile();
  async function addCar() {
    try {
      const newCar = { owner, seatCount: 4 };
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedTripId}/create-car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      if (!response.ok) throw new Error("Error Creating Car");
      const result = await response.json();
      setCars((prev) => [...prev, result]);
    } catch (error) {
      setError(error as Error);
      console.error(error);
    }
  }
  async function removeCar(carId: number) {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${carId}/delete-car`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error Creating Car");
      console.log(cars);
      setCars((prev) => prev.filter((car) => car.id !== carId));
      Alert.alert("Successfully deleted!");
    } catch (error) {
      setError(error as Error);
      console.error(error);
    }
  }
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
        console.log(response);
        const result = await response.json();
        setCars(result);
        // setCars(result.cars);
      } catch (error: any) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  return { cars, removeCar, addCar, isLoading, error };
};

export default useCarpool;
