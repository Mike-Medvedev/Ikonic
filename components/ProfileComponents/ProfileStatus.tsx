import { Suspense, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SMS from "expo-sms";

interface movie {
  id: string;
  title: string;
  releaseYear: string;
}

interface movies {
  title: string;
  description: string;
  movies: movie[];
}

const Loader = () => {
  return <Text>Loading...</Text>;
};

const sendSms = async () => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(["2038587135"], "My sample HelloWorld message");
    console.log(result);
  } else {
    console.log("SMS is not avaliable");
  }
};

const getStatusValue = async (): Promise<movies | null> => {
  try {
    const status = await AsyncStorage.getItem("status");
    if (status) return JSON.parse(status);
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const storeStatusValue = async (movies: movies) => {
  try {
    await AsyncStorage.setItem("status", JSON.stringify(movies));
  } catch (e) {
    console.error(e);
  }

  console.log("Done.");
};
const ProfileStatus = () => {
  const [status, setStatus] = useState<movies>();

  useEffect(() => {
    (async () => {
      try {
        const cachedStatus = await getStatusValue();
        if (cachedStatus) {
          const status = cachedStatus;
          setStatus(status);
        } else {
          const response = await fetch("https://reactnative.dev/movies.json", {
            method: "GET",
          });
          if (!response.ok) throw new Error("Error fetching status");
          const result = await response.json();
          setStatus(result);
          storeStatusValue(result);
        }
      } catch (error) {
        console.log("error is ", error);
      }
    })();
  }, []);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {status ? <Text style={{ color: "#ffffff", fontSize: 50 }}>{status.title}</Text> : <Loader />}
      <Button onPress={sendSms} title="Send A Text" color="#841584" accessibilityLabel="Send A Text" />
    </View>
  );
};
export default ProfileStatus;
