import UserCard from "@/components/UserCard";
import useContacts from "@/hooks/useContacts";
import { FlatList, View, StyleSheet } from "react-native";
import { Checkbox } from "@/design-system/components";
import * as Contacts from "expo-contacts";
import { UserCardUser } from "@/types";

interface ContactsListProps {
  query: string;
  selectedUserIds: string[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<string[]>>;
}

/** Function to convert Expo Contact to User to display in a Contact Lists */
function serializeContact(contact: Contacts.Contact): UserCardUser | undefined {
  // Ensure there's at least one phone number
  const phoneNumber = contact.phoneNumbers?.[0]?.number;
  if (!phoneNumber) return;

  return {
    firstname: contact.firstName ?? contact.name ?? "",
    lastname: contact.lastName,
    avatarPublicUrl: contact.imageAvailable ? (contact.image?.uri ?? null) : null,
    phone: phoneNumber,
  };
}

/**
 * Render list of contacts from phones native contacts and filter out contacts without phone numbers or names
 */
export default function ContactsList({ query, selectedUserIds, setSelectedUserIds }: ContactsListProps) {
  const { contacts } = useContacts();
  console.log(query);
  const filteredContacts =
    contacts?.filter((c): c is Contacts.Contact & { id: string; phoneNumbers: Contacts.PhoneNumber[] } => {
      const hasId = !!c.id;
      const hasPhone = (c.phoneNumbers?.length ?? 0) > 0;

      if (!hasId || !hasPhone) return false;

      if (query && query.trim() !== "") {
        const name = c.name ?? "";
        const lowerCaseName = name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase().trim();

        return lowerCaseName.includes(lowerCaseQuery);
      }

      return true; // If no query (or query is empty), return all contacts
    }) ?? [];

  const styles = StyleSheet.create({
    container: {},
  });
  return (
    <View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const user = serializeContact(item);
          if (!user) return null;
          return (
            <UserCard
              onPress={() => {
                if (selectedUserIds.includes(item.id)) setSelectedUserIds((prev) => prev.filter((id) => id != item.id));
                else setSelectedUserIds((prev) => [...prev, item.id]);
              }}
              user={user}
              right={<Checkbox isSelected={selectedUserIds.includes(item.id)} />}
            />
          );
        }}
      />
    </View>
  );
}
