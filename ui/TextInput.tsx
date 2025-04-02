import React, { memo, forwardRef, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, TextInput as Input, useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInputComponent = (props: Props, ref: React.Ref<any>) => {
  const { errorText, ...rest } = props;
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: "100%",
        marginVertical: 12,
      },
      input: {
        backgroundColor: theme.colors.surface,
      },
    });
  }, [theme]);
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
      <HelperText type="error" visible={!!errorText}>
        {errorText}
      </HelperText>
    </View>
  );
};

export default memo(forwardRef(TextInputComponent));
