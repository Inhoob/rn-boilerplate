import { registerRootComponent } from "expo";
import "@/styles/unistyles";
import App from "./App";
import { LogBox } from "react-native";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

const IGNORED_LOGS = [
  "Non-serializable values were found in the navigation state",
  "new NativeEventEmitter()",
];

LogBox.ignoreLogs(IGNORED_LOGS);

if (__DEV__) {
  const withoutIgnored =
    (logger: (...args: any[]) => void) =>
    (...args: any[]) => {
      const output = args.join(" ");

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
