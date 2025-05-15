import { Dimensions, Platform } from "react-native";
import { spacing } from "theme/spacing";

export const isIOSDevice = Platform.OS === "ios";
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const isSmallScreen = SCREEN_HEIGHT < 700;
export const ANDROID_BOTTOM_PADDING = !isIOSDevice ? spacing(5.5) : 0;
