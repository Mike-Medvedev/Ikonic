import useProfile from "@/hooks/useProfile";
import { phoneValidator } from "@/utils/validators";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { TextInput, Menu, Provider, Text, HelperText } from "react-native-paper";
type CountryCode = keyof typeof CountryCodeEmojiMap;

const CountryCodeEmojiMap: Record<string, string> = {
  AF: "🇦🇫",
  AX: "🇦🇽",
  AL: "🇦🇱",
  DZ: "🇩🇿",
  AS: "🇦🇸",
  AD: "🇦🇩",
  AO: "🇦🇴",
  AI: "🇦🇮",
  AQ: "🇦🇶",
  AG: "🇦🇬",
  AR: "🇦🇷",
  AM: "🇦🇲",
  AW: "🇦🇼",
  AU: "🇦🇺",
  AT: "🇦🇹",
  AZ: "🇦🇿",
  BS: "🇧🇸",
  BH: "🇧🇭",
  BD: "🇧🇩",
  BB: "🇧🇧",
  BY: "🇧🇾",
  BE: "🇧🇪",
  BZ: "🇧🇿",
  BJ: "🇧🇯",
  BM: "🇧🇲",
  BT: "🇧🇹",
  BO: "🇧🇴",
  BQ: "🇧🇶",
  BA: "🇧🇦",
  BW: "🇧🇼",
  BV: "🇧🇻",
  BR: "🇧🇷",
  IO: "🇮🇴",
  BN: "🇧🇳",
  BG: "🇧🇬",
  BF: "🇧🇫",
  BI: "🇧🇮",
  CV: "🇨🇻",
  KH: "🇰🇭",
  CM: "🇨🇲",
  CA: "🇨🇦",
  KY: "🇰🇾",
  CF: "🇨🇫",
  TD: "🇹🇩",
  CL: "🇨🇱",
  CN: "🇨🇳",
  CX: "🇨🇽",
  CC: "🇨🇨",
  CO: "🇨🇴",
  KM: "🇰🇲",
  CG: "🇨🇬",
  CD: "🇨🇩",
  CK: "🇨🇰",
  CR: "🇨🇷",
  CI: "🇨🇮",
  HR: "🇭🇷",
  CU: "🇨🇺",
  CW: "🇨🇼",
  CY: "🇨🇾",
  CZ: "🇨🇿",
  DK: "🇩🇰",
  DJ: "🇩🇯",
  DM: "🇩🇲",
  DO: "🇩🇴",
  EC: "🇪🇨",
  EG: "🇪🇬",
  SV: "🇸🇻",
  GQ: "🇬🇶",
  ER: "🇪🇷",
  EE: "🇪🇪",
  SZ: "🇸🇿",
  ET: "🇪🇹",
  FK: "🇫🇰",
  FO: "🇫🇴",
  FJ: "🇫🇯",
  FI: "🇫🇮",
  FR: "🇫🇷",
  GF: "🇬🇫",
  PF: "🇵🇫",
  TF: "🇹🇫",
  GA: "🇬🇦",
  GM: "🇬🇲",
  GE: "🇬🇪",
  DE: "🇩🇪",
  GH: "🇬🇭",
  GI: "🇬🇮",
  GR: "🇬🇷",
  GL: "🇬🇱",
  GD: "🇬🇩",
  GP: "🇬🇵",
  GU: "🇬🇺",
  GT: "🇬🇹",
  GG: "🇬🇬",
  GN: "🇬🇳",
  GW: "🇬🇼",
  GY: "🇬🇾",
  HT: "🇭🇹",
  HM: "🇭🇲",
  VA: "🇻🇦",
  HN: "🇭🇳",
  HK: "🇭🇰",
  HU: "🇭🇺",
  IS: "🇮🇸",
  IN: "🇮🇳",
  ID: "🇮🇩",
  IR: "🇮🇷",
  IQ: "🇮🇶",
  IE: "🇮🇪",
  IM: "🇮🇲",
  IL: "🇮🇱",
  IT: "🇮🇹",
  JM: "🇯🇲",
  JP: "🇯🇵",
  JE: "🇯🇪",
  JO: "🇯🇴",
  KZ: "🇰🇿",
  KE: "🇰🇪",
  KI: "🇰🇮",
  KP: "🇰🇵",
  KR: "🇰🇷",
  KW: "🇰🇼",
  KG: "🇰🇬",
  LA: "🇱🇦",
  LV: "🇱🇻",
  LB: "🇱🇧",
  LS: "🇱🇸",
  LR: "🇱🇷",
  LY: "🇱🇾",
  LI: "🇱🇮",
  LT: "🇱🇹",
  LU: "🇱🇺",
  MO: "🇲🇴",
  MG: "🇲🇬",
  MW: "🇲🇼",
  MY: "🇲🇾",
  MV: "🇲🇻",
  ML: "🇲🇱",
  MT: "🇲🇹",
  MH: "🇲🇭",
  MQ: "🇲🇶",
  MR: "🇲🇷",
  MU: "🇲🇺",
  YT: "🇾🇹",
  MX: "🇲🇽",
  FM: "🇫🇲",
  MD: "🇲🇩",
  MC: "🇲🇨",
  MN: "🇲🇳",
  ME: "🇲🇪",
  MS: "🇲🇸",
  MA: "🇲🇦",
  MZ: "🇲🇿",
  MM: "🇲🇲",
  NA: "🇳🇦",
  NR: "🇳🇷",
  NP: "🇳🇵",
  NL: "🇳🇱",
  NC: "🇳🇨",
  NZ: "🇳🇿",
  NI: "🇳🇮",
  NE: "🇳🇪",
  NG: "🇳🇬",
  NU: "🇳🇺",
  NF: "🇳🇫",
  MK: "🇲🇰",
  MP: "🇲🇵",
  NO: "🇳🇴",
  OM: "🇴🇲",
  PK: "🇵🇰",
  PW: "🇵🇼",
  PS: "🇵🇸",
  PA: "🇵🇦",
  PG: "🇵🇬",
  PY: "🇵🇾",
  PE: "🇵🇪",
  PH: "🇵🇭",
  PN: "🇵🇳",
  PL: "🇵🇱",
  PT: "🇵🇹",
  PR: "🇵🇷",
  QA: "🇶🇦",
  RE: "🇷🇪",
  RO: "🇷🇴",
  RU: "🇷🇺",
  RW: "🇷🇼",
  BL: "🇧🇱",
  SH: "🇸🇭",
  KN: "🇰🇳",
  LC: "🇱🇨",
  MF: "🇲🇫",
  PM: "🇵🇲",
  VC: "🇻🇨",
  WS: "🇼🇸",
  SM: "🇸🇲",
  ST: "🇸🇹",
  SA: "🇸🇦",
  SN: "🇸🇳",
  RS: "🇷🇸",
  SC: "🇸🇨",
  SL: "🇸🇱",
  SG: "🇸🇬",
  SX: "🇸🇽",
  SK: "🇸🇰",
  SI: "🇸🇮",
  SB: "🇸🇧",
  SO: "🇸🇴",
  ZA: "🇿🇦",
  GS: "🇬🇸",
  SS: "🇸🇸",
  ES: "🇪🇸",
  LK: "🇱🇰",
  SD: "🇸🇩",
  SR: "🇸🇷",
  SJ: "🇸🇯",
  SE: "🇸🇪",
  CH: "🇨🇭",
  SY: "🇸🇾",
  TW: "🇹🇼",
  TJ: "🇹🇯",
  TZ: "🇹🇿",
  TH: "🇹🇭",
  TL: "🇹🇱",
  TG: "🇹🇬",
  TK: "🇹🇰",
  TO: "🇹🇴",
  TT: "🇹🇹",
  TN: "🇹🇳",
  TR: "🇹🇷",
  TM: "🇹🇲",
  TC: "🇹🇨",
  TV: "🇹🇻",
  UG: "🇺🇬",
  UA: "🇺🇦",
  AE: "🇦🇪",
  GB: "🇬🇧",
  US: "🇺🇸",
  UM: "🇺🇲",
  UY: "🇺🇾",
  UZ: "🇺🇿",
  VU: "🇻🇺",
  VE: "🇻🇪",
  VN: "🇻🇳",
  VG: "🇻🇬",
  VI: "🇻🇮",
  WF: "🇼🇫",
  EH: "🇪🇭",
  YE: "🇾🇪",
  ZM: "🇿🇲",
  ZW: "🇿🇼",
};

export default function PhoneNumberForm() {
  const { profile } = useProfile();
  const [phoneNumber, setPhoneNumber] = useState<{ value: string; error: string }>({ value: "", error: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("🇺🇸");

  async function handleSave() {
    const phoneError = phoneValidator(phoneNumber.value);
    if (phoneError) {
      setPhoneNumber((prev) => ({ ...prev, error: phoneError }));
      return;
    }
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${profile.user_id}/update-phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phoneNumber.value }),
      });
      if (!response.ok) throw new Error("Error updating phone number");
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredFlags = Object.entries(CountryCodeEmojiMap)
    .filter(([code]) => {
      if (searchTerm.trim() === "") return true;
      return code.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .map(([code, flag], index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedItem(flag);
          setModalVisible(false);
        }}
      >
        <Text style={styles.flagItem}>
          {flag} {code}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Enter Phone Number"
        value={phoneNumber.value}
        error={!!phoneNumber.error}
        onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
        mode="outlined"
        placeholder="Enter Phone Number"
        inputMode="tel"
        returnKeyType="done"
        right={
          <TextInput.Icon onPress={handleSave} icon={(props) => <AntDesign name="save" size={24} color="black" />} />
        }
      />
      <HelperText type="error" visible={!!phoneNumber.error}>
        {phoneNumber.error}
      </HelperText>
      <Text style={{ marginTop: 10, color: "black" }}>
        {"\t"}*By entering your number you agree to recieve RSVP texts from Ikonic
      </Text>
      {/* <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                mode="outlined"
                label="Search Country"
                right={
                  <TextInput.Icon icon={({ size, color }) => <AntDesign name="search1" size={24} color="black" />} />
                }
                style={{ marginBottom: 15 }}
              />
              <ScrollView>{filteredFlags}</ScrollView>
            </View>
          </TouchableOpacity>
        </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  flagItem: {
    fontSize: 28,
    padding: 10,
  },
});
