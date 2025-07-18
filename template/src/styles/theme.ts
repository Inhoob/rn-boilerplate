export const commonColors = {
  background_white: "#FFFFFF",
  black: "#000000",
};

export const breakpoints = {
  xs: 0, // mobile devices
  sm: 480, // ipad and tablets
  md: 768, // laptop
  lg: 1024, //desktop
  xl: 1440, //extra large
} as const;

export const lightTheme = {
  colors: commonColors,
} as const;

export const darkTheme = {
  colors: commonColors,
} as const;
