import React, { memo } from "react";
import { View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { Card as PaperCard, Chip } from "react-native-paper";
type CardProps = {
  date: string;
  children: React.ReactNode;
  coverSource?: ImageSourcePropType;
  overlayContent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardComponent = ({ date, children }: CardProps) => {
  const styles = StyleSheet.create({
    card: {
      margin: 16,
    },
    coverContainer: {
      position: "relative",
    },
    cover: {},
    overlay: {
      ...StyleSheet.absoluteFillObject, //shorthand for abs position over parent
      padding: 16,
      alignItems: "flex-end",
    },
    content: {
      paddingTop: 8,
    },
  });

  return (
    <PaperCard style={{ width: "98%" }}>
      <View style={styles.coverContainer}>
        <PaperCard.Cover style={styles.cover} />
        <View style={styles.overlay}>
          <Chip style={{ borderRadius: 20 }}>{date}</Chip>
        </View>
      </View>
      <PaperCard.Content style={{ padding: 16 }}>{children}</PaperCard.Content>
    </PaperCard>
  );
};

export default memo(CardComponent);
