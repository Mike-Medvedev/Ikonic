import { Alert, Platform } from "react-native";
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
