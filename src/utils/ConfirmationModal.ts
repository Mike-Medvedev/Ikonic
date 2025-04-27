import { Alert, Platform } from "react-native";
/**
 * Renders a Pop up to confirm that a resource is about to be deleted
 */
export function DeleteConfirmation({ deleteFn }: { deleteFn: () => void }) {
  if (Platform.OS !== "web") {
    Alert.alert(
      "Confirm Delete", // Title
      "Are you sure you want to delete this?", // Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteFn() },
      ],
      { cancelable: false },
    );
  } else {
    if (window.confirm("Are you sure you want to delete this?")) {
      // User clicked OK
      deleteFn();
    } else {
      // User clicked Cancel
    }
  }
}
