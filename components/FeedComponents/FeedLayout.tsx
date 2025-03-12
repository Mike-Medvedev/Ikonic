import { View, Text } from "react-native";
interface Props {
  children: React.ReactNode;
}
const FeedLayout = ({ children }: Props) => {
  return <View>{children}</View>;
};
export default FeedLayout;
