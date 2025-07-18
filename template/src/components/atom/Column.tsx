import { View, type ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export interface ColumnProps extends ViewProps {
  gap?: number;
  flex?: boolean;
}

export const Column = (props: ColumnProps) => (
  <View
    {...props}
    style={[{ gap: props.gap }, props.flex && { flex: 1 }, props.style]}
  />
);
export const AlignedColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.aligned, props.style]} />
);
export const RightAlignedColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.rightAligned, props.style]} />
);
export const JustifiedColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.justified, props.style]} />
);
export const EndJustifiedColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.endJustified, props.style]} />
);
export const CenteredColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.centered, props.style]} />
);
export const SpacedColumn = (props: ColumnProps) => (
  <Column {...props} style={[styles.spaced, props.style]} />
);

const styles = StyleSheet.create({
  aligned: {
    alignItems: "center",
  },
  rightAligned: {
    alignItems: "flex-end",
  },
  justified: {
    justifyContent: "center",
  },
  endJustified: {
    justifyContent: "flex-end",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  spaced: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
