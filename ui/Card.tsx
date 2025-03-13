import { View, StyleSheet } from "react-native";

const Card = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
  },

  left: {
    justifyContent: "center",
    marginRight: 16,
    height: 40,
    width: 40,
  },

  titles: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    minHeight: 30,
    paddingRight: 16,
  },

  subtitle: {
    minHeight: 20,
    marginVertical: 0,
    paddingRight: 16,
  },
});

export default Card;
