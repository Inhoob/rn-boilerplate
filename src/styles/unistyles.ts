import { breakpoints, lightTheme, darkTheme } from "@/styles/theme";
import { StyleSheet } from "react-native-unistyles";

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};
type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;
declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints: breakpoints,
});
