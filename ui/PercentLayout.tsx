import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface PercentLayoutProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  percentLayout: Array<[number, StyleProp<ViewStyle>?]>;
}

const PercentLayout = ({ children, percentLayout, styles }: PercentLayoutProps) => {
  const percentSum = percentLayout.reduce((a, b) => a + b[0], 0);
  if (percentSum !== 100) {
    throw new Error(
      `The Sum of the PercentView Percents must add up to 100% in a Percent Layout \n Current Percent: ${percentSum}`
    );
  }
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length !== percentLayout.length)
    throw new Error("Error The Number of Children must match the percentLayout Length");

  return (
    <View style={[{ flex: 1, width: "100%" }, styles]}>
      {childrenArray.map((child, index) => (
        <View style={[{ height: `${percentLayout[index][0]}%` }, percentLayout[index][1]]} key={index}>
          {child}
        </View>
      ))}
    </View>
  );
};

export default PercentLayout;
