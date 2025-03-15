import { router } from "expo-router";
import { useLocalSearchParams, useSegments } from "expo-router/build/hooks";
import { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface SelectionTabsProps {
  options: any[];
}

const SelectionTabs = ({ options }: SelectionTabsProps) => {
  const segments = useSegments();
  const currentTab = segments[segments.length - 1]?.toLowerCase();
  const params = useLocalSearchParams();
  const queryParam = params.selectedTrip;
  const handleOnPress = (option) => {
    const url = queryParam ? `trips/${queryParam}/${(option.label as string).toLowerCase()}` : "/";
    console.log(option.label);
    router.navigate(url as any);
  };

  const styles = StyleSheet.create({
    activeTab: { borderBottomColor: "blue", borderBottomWidth: 1, height: 50 },
    tab: { height: 50 },
  });
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
export default SelectionTabs;
