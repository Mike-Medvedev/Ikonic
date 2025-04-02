import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { HelperText, Text, useTheme } from "react-native-paper";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import React from "react";
import { NewTripForm } from "@/models/TripModel";
import CustomAutoCompleteInput from "@/ui/CustomAutoCompleteInput";
interface SelectMountainProps {
  tripForm: NewTripForm;
  setTripForm: React.Dispatch<React.SetStateAction<NewTripForm>>;
}

const newEnglandSkiResorts = [
  // Maine
  { id: "5", title: "Baker Mountain" },
  { id: "6", title: "Big Rock" },
  { id: "7", title: "Big Moose" },
  { id: "8", title: "Black Mountain of Maine" },
  { id: "9", title: "Camden Snow Bowl" },
  { id: "10", title: "Eaton Mountain" },
  { id: "11", title: "Hermon Mountain" },
  { id: "12", title: "Lonesome Pine Trails" },
  { id: "13", title: "Lost Valley" },
  { id: "14", title: "Mount Abram" },
  { id: "15", title: "Mount Jefferson Ski Area" },
  { id: "16", title: "Pinnacle Ski Club" },
  { id: "17", title: "Pleasant Mountain" },
  { id: "18", title: "Powderhouse Hill" },
  { id: "19", title: "Quoggy Jo" },
  { id: "20", title: "Saddleback Maine" },
  { id: "21", title: "Sugarloaf" },
  { id: "22", title: "Sunday River" },
  { id: "23", title: "Titcomb Mountain" },

  // Massachusetts
  { id: "24", title: "Berkshire East Ski Resort" },
  { id: "25", title: "Blue Hills Ski Area" },
  { id: "26", title: "Bousquet Ski Area" },
  { id: "27", title: "Butternut" },
  { id: "28", title: "Easton Ski Area at Eaglebrook School" },
  { id: "29", title: "Jiminy Peak" },
  { id: "30", title: "Mount Greylock Ski Club" },
  { id: "31", title: "Nashoba Valley Ski Area" },
  { id: "32", title: "Otis Ridge" },
  { id: "33", title: "Ski Bradford" },
  { id: "34", title: "Ski Ward" },
  { id: "35", title: "Wachusett Mountain" },

  // New Hampshire
  { id: "36", title: "Abenaki Ski Area" },
  { id: "37", title: "Arrowhead" },
  { id: "38", title: "Attitash" },
  { id: "39", title: "Black Mountain" },
  { id: "40", title: "Bretton Woods" },
  { id: "41", title: "Cannon Mountain" },
  { id: "42", title: "Campton Mountain" },
  { id: "43", title: "Cranmore Mountain Resort" },
  { id: "44", title: "Crotched Mountain" },
  { id: "45", title: "Dartmouth Skiway" },
  { id: "46", title: "Franklin Veterans Memorial Recreation Area" },
  { id: "47", title: "Granite Gorge" },
  { id: "48", title: "Gunstock Mountain Resort" },
  { id: "49", title: "Kanc Rec Area" },
  { id: "50", title: "King Pine" },
  { id: "51", title: "Loon Mountain" },
  { id: "52", title: "McIntyre Ski Area" },
  { id: "53", title: "Mount Eustis" },
  { id: "54", title: "Mount Prospect" },
  { id: "55", title: "Mount Sunapee Resort" },
  { id: "56", title: "Pats Peak" },
  { id: "57", title: "Ragged Mountain" },
  { id: "58", title: "Red Hill Ski Club" },
  { id: "59", title: "Storrs Hill" },
  { id: "60", title: "Tenney Mountain Ski Resort" },
  { id: "61", title: "The Balsams Wilderness" },
  { id: "62", title: "Waterville Valley Resort" },
  { id: "63", title: "Whaleback" },
  { id: "64", title: "Wildcat Mountain" },

  // Rhode Island
  { id: "65", title: "Yawgoo Valley" },

  // Vermont
  { id: "66", title: "Ascutney Outdoors" },
  { id: "67", title: "Bellows Falls Ski Tow" },
  { id: "68", title: "Bolton Valley Resort" },
  { id: "69", title: "Bromley Mountain" },
  { id: "70", title: "Burke Mountain" },
  { id: "71", title: "Cochran's Ski Area" },
  { id: "72", title: "Harrington Hill" },
  { id: "73", title: "Hard 'Ack" },
  { id: "74", title: "Haystack Mountain" },
  { id: "75", title: "Jay Peak Resort" },
  { id: "76", title: "Killington Ski Resort" },
  { id: "77", title: "Living Memorial Park" },
  { id: "78", title: "Lyndon Outing Club" },
  { id: "79", title: "Mad River Glen" },
  { id: "80", title: "Magic Mountain" },
  { id: "81", title: "Middlebury College Snow Bowl" },
  { id: "82", title: "Mount Snow" },
  { id: "83", title: "Northeast Slopes" },
  { id: "84", title: "Okemo Mountain" },
  { id: "85", title: "Pico Mountain" },
  { id: "86", title: "Plymouth Notch" },
  { id: "87", title: "Quechee Lakes Ski Area" },
  { id: "88", title: "Saskadena Six" },
  { id: "89", title: "Smugglers' Notch" },
  { id: "90", title: "Stowe Mountain Resort" },
  { id: "91", title: "Stratton Mountain Resort" },
  { id: "92", title: "Sugarbush Resort" },
];

const SelectMountain = ({ tripForm, setTripForm }: SelectMountainProps) => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const dropdownController = useRef<{ clear: () => void } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!tripForm.mountain && dropdownController.current) dropdownController.current.clear();
  }, [tripForm.mountain]);

  if (!isClient) return null; // Prevent rendering on the server

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        showClear={false}
        enableLoadingIndicator={false}
        onSelectItem={(item) => {
          setTripForm((prev) => ({ ...prev, mountain: { value: item?.title ?? "", error: "" } }));
        }}
        controller={(controller) => {
          dropdownController.current = controller;
        }}
        InputComponent={CustomAutoCompleteInput}
        textInputProps={{
          value: tripForm.mountain.value,
          placeholder: "Choose a mountain",
          placeholderTextColor: theme.colors.inverseSurface,
          style: {
            color: theme.colors.onSurface,
            paddingLeft: 18,
            borderColor: theme.colors.error,
            borderWidth: tripForm.mountain.error ? 1 : 0,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,

          alignSelf: "center",
        }}
        ItemSeparatorComponent={() => null}
        inputContainerStyle={{
          minWidth: 300,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.error,
          borderWidth: tripForm.mountain.error ? 1 : 0,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: theme.colors.surface,
        }}
        renderItem={(item) => <Text style={{ color: theme.colors.onSurface, padding: 15 }}>{item.title}</Text>}
        showChevron={false}
        dataSet={newEnglandSkiResorts}
      />
      <HelperText type="error" visible={!!tripForm.mountain.error}>
        Please Select A Mountain!
      </HelperText>
    </View>
  );
};

export default SelectMountain;
