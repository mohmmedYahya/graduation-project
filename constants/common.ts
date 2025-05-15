import { Dimensions, Platform } from "react-native";
import { spacing } from "theme/spacing";

export const MOBILE_BUNDLE_VERSION = "1.0.000"; // to be used with updates

export const isIOSDevice = Platform.OS === "ios";
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const isSmallScreen = SCREEN_HEIGHT < 700;
export const ANDROID_BOTTOM_PADDING = !isIOSDevice ? spacing(5.5) : 0;
export const TERMS_AND_CONDITIONS_URL = `https://wrsm.com/terms-conditions`;
export const PRIVACY_POLICY_URL = `https://wrsm.com/policy`;
