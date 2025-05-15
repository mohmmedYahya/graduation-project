import Image from "components/Image";
import { ImageProps } from "expo-image";
import { useColorScheme } from "hooks/useColorScheme";
import { View, ViewStyle } from "react-native";
import palette from "theme/palette";
import { spacing } from "theme/spacing";
import CustomAvatar from "./CustomAvatar";

export default function UserAvatarImage({
  url,
  size = spacing(13.5),
  style,
}: {
  url?: string;
  size?: number;
  style?: ViewStyle;
}) {
  const theme = useColorScheme();
  const imageStyle = {
    width: Math.floor(size),
    height: Math.floor(size),
    borderRadius: Math.floor(size) / 2,
    ...(style && { ...style }),
  };
  return (
    <View
      style={{
        ...imageStyle,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette[theme].common.white,
      }}
    >
      {!url && <CustomAvatar style={imageStyle} size={size} />}
      {url && <Image style={imageStyle as ImageProps["style"]} src={url} />}
    </View>
  );
}
