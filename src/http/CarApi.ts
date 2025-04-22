import { Car, NewCar } from "@/models/Car";
import Requestor from "./Requestor";

export async function fetchCars(selectedTripId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const cars = (await Requestor<Car[]>(`/trips/${selectedTripId}/cars`, "json", requestOptions)).data;
    return cars;
  } catch (error) {
    throw new Error(String(error));
  }
}
export async function createCar(selectedTripId: string, newCar: NewCar) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
  };
  try {
    await Requestor<Car[]>(`/trips/${selectedTripId}/cars`, "json", requestOptions);
  } catch (error) {
    throw new Error(String(error));
  }
}
export async function deleteCar(carId: number, selectedTripId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
  };
  try {
    await Requestor<Car[]>(`/trips/${selectedTripId}/cars/${carId}`, "json", requestOptions);
  } catch (error) {
    throw new Error(String(error));
  }
}
export async function addPassenger(carId: number, selectedTripId: string, seatPosition: number) {
  const payload = { seatPosition };
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(payload),
    },
  };
  try {
    await Requestor<Car[]>(`/trips/${selectedTripId}/cars/${carId}/passengers`, "json", requestOptions);
  } catch (error) {
    throw new Error(String(error));
  }
}
