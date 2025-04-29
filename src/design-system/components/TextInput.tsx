import React, { memo, forwardRef, useMemo, Ref } from "react";
import { View, StyleSheet, TextInput as NativeTextInput } from "react-native";
import { HelperText, TextInput as Input, useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

function TextInput(props: Props, ref: Ref<NativeTextInput>) {
  const { errorText, ...rest } = props;
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: "100%",
      },
      input: {
        backgroundColor: theme.colors.surface,
      },
    });
  }, [theme]);
  return (
    <View style={styles.container}>
      <Input style={styles.input} underlineColor="transparent" mode="outlined" ref={ref} {...rest} />
      <HelperText type="error" visible={!!true}>
        {errorText || " "}
      </HelperText>
    </View>
  );
}

export default memo(forwardRef(TextInput));
