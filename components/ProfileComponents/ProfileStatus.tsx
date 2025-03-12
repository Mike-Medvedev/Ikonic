import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileStatus = () => {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const cachedStatus = await AsyncStorage.getItem("status");
        if (cachedStatus) {
          setStatus(cachedStatus);
          return;
        }
        const response = await fetch(
          "https://4317-2600-480a-33b3-8300-8929-fab4-fe2c-d649.ngrok-free.app/",
          {
            method: "GET",
            headers: {
              Accept: "application/text",
              "ngrok-skip-browser-warning": "1337",
            },
          }
        );
        if (!response.ok) throw new Error("Error fetching status");
        const result = await response.text();
        if (typeof result != "string")
          throw new Error("Response not a string!");
        setStatus(result);
        AsyncStorage.setItem("status", result);
      } catch (error) {
        console.log("error is ", error);
      }
    })();
  }, []);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#ffffff", fontSize: 50 }}>{status}</Text>
    </View>
  );
};
export default ProfileStatus;
