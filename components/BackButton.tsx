import ArrowRight from "assets/icons/ArrowRight";
import { BACK_ICON_SIZE } from "constants/common";
import { useRouter } from "expo-router";
import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { DebouncedTouchableOpacity } from "./common";

export default function BackButton({
  style,
  arrowColor,
  customBackHandler,
  customIcon,
  iconSize,
  size,
}: {
  iconSize?: number;
  size?: number;
  arrowColor?: string;
  style?: ViewProps["style"];
  customBackHandler?: () => void;
  customIcon?: ReactElement;
}) {
  const router = useRouter();
  const handleGoBack = () => router.back();

  const handlePress = () => {
    if (customBackHandler) {
      customBackHandler();
    } else {
      handleGoBack();
    }
  };
  return (
    <DebouncedTouchableOpacity
      testID="back_btn"
      style={[styles.iconContainer, style, { width: size, height: size }]}
      onPress={handlePress}
    >
      {!customIcon && (
        <ArrowRight width={iconSize} height={iconSize} color={arrowColor} />
      )}
      {customIcon}
    </DebouncedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: BACK_ICON_SIZE,
    height: BACK_ICON_SIZE,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
