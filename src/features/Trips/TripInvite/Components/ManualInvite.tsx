import { Pressable, View, TextInput as NativeInput, StyleSheet } from "react-native";
import { Icon, TextInput as PaperTextInput, useTheme } from "react-native-paper";
import { DividerText, Text, TextInput } from "@/design-system/components";
import * as Clipboard from "expo-clipboard";
import useToast from "@/hooks/useToast";
/**
 *
 */
export default function ManualInvite() {
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const inviteLink = "https://tripapp.com/invite/winter-shred-2025";

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(inviteLink);
      showSuccess({ message: "Copied! Invite link copied to clipboard" });
    } catch (e) {
      console.error("Failed to copy text to clipboard", e);
      showFailure({ message: "Error, Could not copy link." });
    }
  };
  const styles = StyleSheet.create({
    label: { marginVertical: 8, color: theme.colors.secondary },
    linkLabel: { marginVertical: 8 },
    nativeInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.roundness,
      paddingHorizontal: 12,
      height: 50,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceVariant,
      overflow: "hidden",
    },
    nativeInput: {
      flex: 1,
      marginRight: 8,
      fontSize: 16,
      color: theme.colors.primary,
      textAlignVertical: "center",
    },
    iconContainer: {
      padding: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: { flexDirection: "row" },
  });
  return (
    <View>
      <Text style={styles.label}>Invite By Phone</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter phone number"
          right={
            <PaperTextInput.Icon
              icon={() => (
                <Pressable onPress={() => console.log("Invited Users via SMS")}>
                  <Icon source="send-circle" size={28} />
                </Pressable>
              )}
            />
          }
        />
      </View>
      <DividerText text="Or" />
      <Text style={[styles.linkLabel, styles.label]}>Share Link</Text>
      <View style={styles.nativeInputContainer}>
        <NativeInput value={inviteLink} style={styles.nativeInput} editable={false} />
        <Pressable onPress={copyToClipboard} style={styles.iconContainer}>
          <Icon source="content-copy" size={24} color={theme.colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}
