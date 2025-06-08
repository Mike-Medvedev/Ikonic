import { View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";
import { NewTripForm, TripComponentProps, TripUpdateForm } from "@/types";
import { TextInput, Text } from "@/design-system/components";
import { useEffect, useState } from "react";

const LocationAutoComplete = <T extends NewTripForm | TripUpdateForm>({
  tripForm,
  setTripForm,
}: TripComponentProps<T>) => {
  const theme = useTheme();
  const [searchResult, setSearchResult] = useState<{ predictions: { description: string }[] } | undefined>(undefined);

  async function handleTextChange(text: string) {
    setTripForm((prev) => ({ ...prev, mountain: { value: text, error: "" } }));
    const res = await placesAutoComplete(tripForm?.mountain?.value as string);
    setSearchResult(res);
  }

  async function placesAutoComplete(query: string) {
    const url =
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
      `input=${encodeURIComponent(query)}` +
      `&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}` +
      // Remove types entirely, or use broad categories:
      // `&types=establishment|lodging|tourist_attraction|geocode` +
      `&language=en`; // Optional: force English results
    const response = await fetch(url);
    return await response.json();
  }

  return (
    <View>
      <TextInput
        label="Choose your destination"
        returnKeyType="next"
        value={tripForm?.mountain?.value as string}
        onChangeText={handleTextChange}
        error={!!tripForm?.mountain?.error}
        errorText={tripForm?.mountain?.error}
        autoCapitalize="words"
        keyboardType="default"
        mode="outlined"
      />
      <View style={{ width: "100%", height: 200, borderWidth: 2, borderColor: "black" }}>
        {searchResult?.predictions &&
          searchResult?.predictions.map((p, index) => <Text key={index}>{p.description}</Text>)}
      </View>
    </View>
  );
};

export default LocationAutoComplete;
