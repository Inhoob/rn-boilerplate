import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CommonNavigatorParams = {};

export type BottomTabNavigatorParams = {};

export type AllNavigatorParams = CommonNavigatorParams &
  BottomTabNavigatorParams;

export type useNavigationProp = NativeStackNavigationProp<AllNavigatorParams>;
export type useRouteProp<T extends keyof AllNavigatorParams> = RouteProp<
  AllNavigatorParams,
  T
>;
