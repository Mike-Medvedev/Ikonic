import { RelativePathString, router } from "expo-router";
import { useLocalSearchParams, useSegments } from "expo-router/build/hooks";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type option = { value: string; label: string };

interface SelectionTabsProps {
  options: option[];
}

const SelectionTabs = ({ options }: SelectionTabsProps) => {
  const segments = useSegments();
  const currentTab = segments[segments.length - 1]?.toLowerCase();
  const params = useLocalSearchParams();
  const queryParam = params.selectedTrip;
  const handleOnPress = (option: option) => {
    router.replace({
      pathname: "/trips/[selectedTrip]/[option]" as RelativePathString,
      params: { selectedTrip: queryParam, option: option.label.toLowerCase() },
    });
  };

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {options.map((option, index) => (
        <View style={currentTab === (option.label as string).toLowerCase() ? styles.activeTab : styles.tab} key={index}>
          <Pressable onPress={() => handleOnPress(option)}>
            <Text>{option.label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  activeTab: { borderBottomColor: "blue", borderBottomWidth: 1, height: 50 },
  tab: { height: 50 },
});
export default SelectionTabs;
