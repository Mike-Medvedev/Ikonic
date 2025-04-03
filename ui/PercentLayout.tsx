import React, { ReactElement } from "react";
import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

interface PercentLayoutProps {
  children: ReactElement<PercentViewProps, typeof PercentView> | ReactElement<PercentViewProps, typeof PercentView>[];
}
interface PercentViewProps {
  percent: `${number}`;
  styles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const PercentLayout = ({ children }: PercentLayoutProps) => {
  let percentCount = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const typeName = (child.type as any).displayName;
      if (typeName !== "PercentLayoutView") {
        throw new Error("Children of PercentLayout must be PercentLayout.View");
      }
      const percent = Number(child.props.percent);
      percentCount += percent;
    }
  });
  if (percentCount !== 100)
    throw new Error(
      `The Sum of the PercentView Percents must add up to 100% in a Percent Layout \n Current Percent: ${percentCount}`
    );
  return <View style={{ width: "100%", height: "100%" }}>{children}</View>;
};

function PercentView({ percent, styles, children }: PercentViewProps) {
  console.log(percent);
  return <View style={[{ height: `${percent}%` }, styles]}>{children}</View>;
}

PercentView.displayName = "PercentLayoutView";

PercentLayout.View = PercentView;

export default PercentLayout;
