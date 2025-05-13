import { TypographyVariantType } from "components/common/Typography";
import { Dimensions, TextStyle } from "react-native";
import palette from "./palette";

const { fontScale } = Dimensions.get("window");

export const BOLD_FONT = "Main-Bold";
export const REGULAR_FONT = `Main-Regular`;
export const SEMI_BOLD_FONT = `Main-SemiBold`;

export type TypographyStyle = {
  [key in TypographyVariantType]: TextStyle;
};

const basicStyle: TextStyle = {
  fontFamily: SEMI_BOLD_FONT,
  color: palette["light"].text.primary,
  flexWrap: "wrap",
};

const typography: TypographyStyle = {
  heading1: {
    ...basicStyle,
    lineHeight: 44.8 / fontScale,
    fontSize: 32 / fontScale,
  },
  heading2: {
    ...basicStyle,
    lineHeight: 33.6 / fontScale,
    fontSize: 24 / fontScale,
  },
  heading3: {
    ...basicStyle,
    lineHeight: 28 / fontScale,
    fontSize: 20 / fontScale,
  },
  heading4: {
    ...basicStyle,
    fontFamily: SEMI_BOLD_FONT,
    lineHeight: 24.51 / fontScale,
    fontSize: 18 / fontScale,
  },
  heading5: {
    ...basicStyle,
    fontFamily: REGULAR_FONT,
    lineHeight: 24.51 / fontScale,
    fontSize: 18 / fontScale,
  },
  body: {
    ...basicStyle,
    lineHeight: 22.4 / fontScale,
    fontSize: 16 / fontScale,
  },
  body2: {
    ...basicStyle,
    fontFamily: REGULAR_FONT,
    lineHeight: 22.4 / fontScale,
    fontSize: 16 / fontScale,
  },
  placeholder1: {
    ...basicStyle,
    lineHeight: 22.4 / fontScale,
    fontSize: 14 / fontScale,
  },
  placeholder1Regular: {
    ...basicStyle,
    fontFamily: REGULAR_FONT,
    lineHeight: 22.4 / fontScale,
    fontSize: 14 / fontScale,
  },
  placeholder2: {
    ...basicStyle,
    fontFamily: REGULAR_FONT,
    lineHeight: 16.8 / fontScale,
    fontSize: 12 / fontScale,
  },
  label: {
    ...basicStyle,
    fontFamily: REGULAR_FONT,
    lineHeight: 19.7 / fontScale,
    fontSize: 14 / fontScale,
  },
} as const;

export default typography;
