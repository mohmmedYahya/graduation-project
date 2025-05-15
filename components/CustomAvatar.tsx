import { Ionicons } from "@expo/vector-icons";
import Image from "components/Image";
import { ImageProps } from "expo-image";
import { useColorScheme } from "hooks/useColorScheme";
import React from "react";
import { View, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import palette from "theme/palette";
import { spacing } from "theme/spacing";

const avatarSize = spacing(10);

export default function CustomAvatar({
  imageUrl,
  size = avatarSize,
  style,
}: {
  imageUrl?: string;
  size?: number;
  style?: ViewStyle;
}) {
  const theme = useColorScheme();

  const iconStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    ...(style && { ...style }),
  };
  const iconContainerStyle = {
    ...iconStyle,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette[theme].grey[200],
  };

  const iconSize = 0.7 * size;

  return (
    <View style={iconContainerStyle as ViewProps["style"]}>
      {!imageUrl && (
        <Ionicons
          name="person"
          size={iconSize}
          color={palette[theme].grey[500]}
        />
      )}
      {imageUrl && (
        <View style={iconStyle}>
          <Image style={iconStyle as ImageProps["style"]} src={imageUrl} />
        </View>
      )}
    </View>
  );
}
