import React, { memo, forwardRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input, useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInputComponent = (props: Props, ref: React.Ref<any>) => {
  const { errorText, ...rest } = props;
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 12,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
    error: {
      fontSize: 14,
      color: theme.colors.error,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  });
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        ref={ref}
        {...rest}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default memo(forwardRef(TextInputComponent));
