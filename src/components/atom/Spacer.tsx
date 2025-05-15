import { commonColors } from "@/styles/theme";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface SpacerProps {
  h?: number;
  w?: number;
  color?: (typeof commonColors)[keyof typeof commonColors];
}

const Spacer = ({ h, w, color }: SpacerProps): React.ReactElement => {
  return <View style={styles.container({ h, w, color })}></View>;
};

export default Spacer;

const styles = StyleSheet.create((theme) => ({
  container: ({ h, w, color }) => ({
    height: h || "100%",
    width: w || "100%",
    backgroundColor: color ? color : "transparent",
  }),
}));
