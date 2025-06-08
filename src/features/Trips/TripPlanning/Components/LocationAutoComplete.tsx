import { LayoutRectangle, Pressable, ScrollView, View } from "react-native";
import { Icon, Surface, useTheme, IconButton } from "react-native-paper";
import { NewTripForm, TripComponentProps, TripUpdateForm } from "@/types";
import { TextInput, Text } from "@/design-system/components";
import { useRef, useState, useEffect } from "react";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

const LocationAutoComplete = <T extends NewTripForm | TripUpdateForm>({
  tripForm,
  setTripForm,
}: TripComponentProps<T>) => {
  const theme = useTheme();
  const [inputDimensions, setInputDimensions] = useState<LayoutRectangle | undefined>(undefined);
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const searchQuery = tripForm?.mountain?.value || "";
  const isSelectionRef = useRef(false);

  // Debounce the search query update
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearchQuery(value);
  }, 300);

  // Update debounced value when search query changes
  useEffect(() => {
    if (searchQuery.length > 2) {
      debouncedSearch(searchQuery);
    } else {
      debouncedSearch.cancel();
      setDebouncedSearchQuery("");
    }
  }, [searchQuery]);

  const {
    data: searchResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["predictions", debouncedSearchQuery], // Use debounced value
    queryFn: () => placesAutoComplete(debouncedSearchQuery),
    enabled: debouncedSearchQuery.length > 2 && isDropDownVisible,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  async function handleTextChange(text: string) {
    if (!isSelectionRef.current) {
      setIsDropDownVisible(true);
    }
    setTripForm((prev) => ({ ...prev, mountain: { value: text, error: "" } }));
  }

  function handleSelection(place: unknown) {
    isSelectionRef.current = true;
    setIsDropDownVisible(false);
    debouncedSearch.cancel(); // Cancel any pending API calls
    setTripForm((prev) => ({
      ...prev,
      mountain: { value: place as { description: string }, error: "" },
    }));
    // Reset the ref after a short delay to allow for the state update
    setTimeout(() => {
      isSelectionRef.current = false;
    }, 100);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <View>
      <TextInput
        label="Choose your destination"
        returnKeyType="search"
        value={tripForm?.mountain?.value as string}
        onLayout={(layout) => setInputDimensions(layout.nativeEvent.layout)}
        onChangeText={handleTextChange}
        error={!!tripForm?.mountain?.error}
        errorText={tripForm?.mountain?.error}
        autoCapitalize="words"
        keyboardType="default"
        mode="outlined"
        multiline={false}
        numberOfLines={1}
        style={{
          height: 56, // Fixed height - adjust if needed
        }}
        contentStyle={{
          paddingVertical: 0,
        }}
        rightIcon={() => (
          <IconButton
            icon="close"
            onPress={() => {
              debouncedSearch.cancel(); // Cancel pending searches
              setTripForm((prev) => ({
                ...prev,
                mountain: { value: "", error: "" },
              }));
            }}
          />
        )}
      />
      {searchResult?.predictions && isDropDownVisible && searchQuery.length > 2 && (
        <Surface
          elevation={2}
          mode="elevated"
          style={{
            position: "absolute",
            top: inputDimensions ? inputDimensions.y + inputDimensions.height + 4 : 0,
            left: inputDimensions?.x ?? 0,
            right: inputDimensions ? inputDimensions.x : 0,
            maxHeight: 300,
            borderRadius: theme.roundness,
          }}
        >
          <AsyncStateWrapper loading={isLoading} error={error}>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }} keyboardShouldPersistTaps="always">
              {searchResult.predictions.length > 0 ? (
                searchResult.predictions.map((p: unknown, index: number) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        padding: 12,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                    onPress={() => {
                      handleSelection(p);
                    }}
                  >
                    <Icon source="map-marker" size={20} />
                    <Text>{(p as { description: string }).description}</Text>
                  </Pressable>
                ))
              ) : (
                <View>
                  <Text>No Locations Found</Text>
                </View>
              )}
            </ScrollView>
          </AsyncStateWrapper>
        </Surface>
      )}
    </View>
  );
};

export default LocationAutoComplete;
