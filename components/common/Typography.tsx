import { Text, TextProps, TextStyle } from "react-native";
import typography from "theme/typography";

export type TypographyVariantType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "body"
  | "body2"
  | "placeholder1"
  | "placeholder1Regular"
  | "placeholder2"
  | "label";

interface ITypography {
  variant?: TypographyVariantType;
  center?: boolean;
  isLTR?: boolean;
}

const Typography = (props: ITypography & TextProps) => {
  const { variant = "body", style, children, center, isLTR, ...other } = props;

  let styled: TextStyle = {};
  if (variant) {
    styled = {
      ...typography[variant],
    };
  }

  return (
    <Text
      style={[
        {
          textAlign: center ? "center" : "auto",
          writingDirection: isLTR ? "ltr" : "rtl",
        },
        styled,
        style,
      ]}
      {...other}
    >
      {children}
    </Text>
  );
};

export default Typography;
