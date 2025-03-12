import { useTripContext } from "@/context/TripContext";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";

const newEnglandSkiResorts = [
  { id: "1", title: "Killington Resort" },
  { id: "2", title: "Stowe Mountain Resort" },
  { id: "3", title: "Sunday River" },
  { id: "4", title: "Sugarloaf" },
  { id: "5", title: "Jay Peak" },
  { id: "6", title: "Okemo Mountain Resort" },
  { id: "7", title: "Mount Snow" },
  { id: "8", title: "Loon Mountain Resort" },
  { id: "9", title: "Bretton Woods" },
  { id: "10", title: "Stratton Mountain Resort" },
  { id: "11", title: "Sugarbush Resort" },
  { id: "12", title: "Cannon Mountain" },
  { id: "13", title: "Attitash Mountain Resort" },
  { id: "14", title: "Wildcat Mountain" },
  { id: "15", title: "Smugglers' Notch Resort" },
];

const SelectMountain = () => {
  const theme = useTheme();
  const { setMountain } = useTripContext();
  const [selectedItem, setSelectedItem] =
    useState<AutocompleteDropdownItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent rendering on the server

  return (
    <View>
      <Text>Select a Destination</Text>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={"1"}
        onSelectItem={(item) => {
          setSelectedItem(item);
          setMountain(item?.title ?? "");
        }}
        textInputProps={{
          style: {
            color: theme.colors.onSurface,
            paddingLeft: 18,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,

          alignSelf: "center",
        }}
        useFilter={false}
        inputContainerStyle={{
          minWidth: 200,
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: 25,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: theme.colors.primaryContainer,
        }}
        containerStyle={{}}
        renderItem={(item) => (
          <Text style={{ color: theme.colors.onSurface, padding: 15 }}>
            {item.title}
          </Text>
        )}
        showChevron={false}
        dataSet={newEnglandSkiResorts}
      />
    </View>
  );
};

export default SelectMountain;
