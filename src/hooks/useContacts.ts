import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
/**
 * Custom Hook for asking for contact permission and returning list of contacts
 */
export default function useContacts() {
  const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contacts = data;
          console.log(contacts);
          setContacts(contacts);
        }
      }
    })();
  }, []);
  return { contacts };
}
