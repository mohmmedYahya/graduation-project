import React from "react";
import { View, ViewProps } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import palette from "../../theme/palette";
import shadow from "../../theme/shadow";
import { spacing } from "../../theme/spacing";

interface Props extends ViewProps {
  disableShadows?: boolean;
}
const Card = (props: Props) => {
  const { children, style, disableShadows = false } = props;
  const theme = useColorScheme();

  const shadowStyle = !disableShadows
    ? {
        shadowColor: palette[theme].shadow.color,
        ...shadow.shadow1,
      }
    : {};

  return (
    <View
      style={[
        {
          backgroundColor: palette[theme].common.white,
          opacity: 0.99,
          padding: spacing(3),
          borderRadius: spacing(3),
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
