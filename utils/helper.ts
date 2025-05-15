import { ANDROID_BOTTOM_PADDING } from "constants/common";
import { EdgeInsets } from "react-native-safe-area-context";
import { DEFAULT_SPACING } from "theme/spacing";

export const getSafeViewStyle = (insets: EdgeInsets) => {
  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom + ANDROID_BOTTOM_PADDING,
    paddingLeft: insets.left + DEFAULT_SPACING,
    paddingRight: insets.right + DEFAULT_SPACING,
  };
};
