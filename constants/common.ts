import { Dimensions, Platform } from "react-native";

export const isIOSDevice = Platform.OS === "ios";
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
