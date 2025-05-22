import UserCard from "@/components/UserCard";
import useContacts from "@/hooks/useContacts";
import { FlatList, View, StyleSheet, Linking, Platform } from "react-native";
import { Checkbox } from "@/design-system/components";
import * as Contacts from "expo-contacts";
import { ExternalInvitee, RegisteredInvitee, UserPublic } from "@/types";
import { standardizeUSPhoneNumber } from "@/utils/validators";

interface ContactsListProps {
  query: string;
  selectedInvitees: (RegisteredInvitee | ExternalInvitee)[];
  setSelectedInvitees: React.Dispatch<React.SetStateAction<(RegisteredInvitee | ExternalInvitee)[]>>;
}

/** Function to convert Expo Contact to User to display in a Contact Lists */
function serializeContact(contact: Contacts.Contact): UserPublic | undefined {
  // Ensure there's at least one phone number
  const phoneNumber = contact.phoneNumbers?.[0]?.number;
  if (!phoneNumber) return;

  return {
    firstname: contact.firstName ?? contact.name ?? "",
    lastname: contact.lastName as string | null,
    avatarPublicUrl: contact.imageAvailable ? (contact.image?.uri ?? null) : null,
    phone: phoneNumber,
  } as UserPublic;
}

/**
 * Render list of contacts from phones native contacts and filter out contacts without phone numbers or names
 */
export default function ContactsList({ query, selectedInvitees, setSelectedInvitees }: ContactsListProps) {
  const { contacts } = useContacts();
  const filteredContacts =
    contacts?.filter((contact): contact is Contacts.Contact & { id: string; phoneNumbers: Contacts.PhoneNumber[] } => {
      const hasId = !!contact.id;
      const hasPhone = contact.phoneNumbers && (contact.phoneNumbers?.length ?? 0) > 0;

      if (!hasId || !hasPhone) return false;

      if (contact.phoneNumbers?.[0]?.countryCode !== "us") return false;
      const originalNumber = contact.phoneNumbers[0]?.number || contact.phoneNumbers[0]?.digits;
      const standardizedNumber = standardizeUSPhoneNumber(originalNumber);

      if (!standardizedNumber) return false;

      if (query && query.trim() !== "") {
        const name = contact.name ?? "";
        const lowerCaseName = name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase().trim();

        return lowerCaseName.includes(lowerCaseQuery);
      }

      return true; // If no query (or query is empty), return all contacts
    }) ?? [];
  function openAppSettings() {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    }
  }

  const styles = StyleSheet.create({
    container: {},
  });
  return (
    <View>
      {/* <Button onPress={openAppSettings} mode="contained">
        Enable Contacts in Settings
      </Button> */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const user = serializeContact(item);
          if (!user) return null;
          return (
            <UserCard
              onPress={() => {
                const isAlreadySelected = selectedInvitees.some(
                  (invitee) => invitee.type === "external" && invitee.phoneNumber === user.phone,
                );
                if (isAlreadySelected) {
                  setSelectedInvitees((prev) =>
                    prev.filter((invitee) => invitee.type === "external" && invitee.phoneNumber !== user.phone),
                  );
                } else {
                  setSelectedInvitees((prev) => [...prev, { type: "external", phoneNumber: user.phone }]);
                }
              }}
              user={user}
              right={
                <Checkbox
                  isSelected={selectedInvitees.some(
                    (invitee) => invitee.type === "external" && invitee.phoneNumber === user.phone,
                  )}
                />
              }
            />
          );
        }}
      />
    </View>
  );
}
