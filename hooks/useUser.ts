import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Trip } from "@/models/TripModel";

export default function useUser() {
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const id = await retrieve();
      if (id) setUserId(id);
    })();
  }, []);

  function isOwner(trip: Trip): boolean {
    return trip.owner === userId;
  }

  return { isOwner, userId };
}
