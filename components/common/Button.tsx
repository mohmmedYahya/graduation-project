import { useColorScheme } from "hooks/useColorScheme";
import React, { JSX } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import palette from "theme/palette";
import { spacing } from "theme/spacing";
import { DebouncedTouchableOpacity, Typography } from ".";

export type ButtonColor = "primary" | "info" | "success" | "warning" | "error";

export interface IButton {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  icon?: JSX.Element;
  color?: ButtonColor;
  variant?: "contained" | "outlined";
  isSmall?: boolean;
  isDebounced?: boolean;
  isView?: boolean;
}

const ButtonContent = (props: IButton & TouchableOpacityProps) => {
  const theme = useColorScheme();
  const {
    text,
    textStyle,
    color = "primary",
    variant = "contained",
    disabled,
    loading,
    icon,
    isSmall = false,
  } = props;
  const typographyVariant = isSmall ? "placeholder1" : "body";
  const isButtonContained = variant === "contained";

  const iconGap = !!icon ? spacing(3) : 0;

  const contentWidth = (() => {
    if (isSmall) {
      if (icon) {
        return "60%";
      }
    }
    return undefined;
  })();

  const buttonTextColor = (() => {
    if (!isButtonContained && disabled) return palette[theme].button.disabled;
    if (isButtonContained || loading || disabled)
      return palette[theme].common.white;
    return palette[theme][color].main;
  })();

  return (
    <>
      {loading ? (
        <ActivityIndicator color={palette[theme].common.white} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing(1),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: contentWidth,
            }}
          >
            {icon && <View style={{ marginRight: iconGap }}>{icon}</View>}
            <Typography
              variant={typographyVariant}
              style={[
                {
                  color: buttonTextColor,
                },
                textStyle,
              ]}
            >
              {text}
            </Typography>
          </View>
        </View>
      )}
    </>
  );
};

const Button = (props: IButton & TouchableOpacityProps) => {
  const {
    text,
    style,
    textStyle,
    color = "primary",
    variant = "contained",
    disabled,
    loading,
    icon,
    isSmall = false,
    onPress,
    isDebounced = true,
    isView = false,
    ...other
  } = props;

  const theme = useColorScheme();

  const handleButtonPress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  const isButtonContained = variant === "contained";

  const isOutlinedStyle = {
    ...(!isButtonContained && {
      borderWidth: 1,
      borderColor: disabled
        ? palette[theme].button.disabled
        : palette[theme][color].main,
    }),
  };

  const buttonBackgroundColor = (() => {
    if (!isButtonContained && disabled) return "transparent";
    if (disabled || loading) return palette[theme].button.disabled;
    if (isButtonContained) return "#3B82F6";
    return "transparent";
  })();

  const paddingVertical = isSmall ? spacing(2) : spacing(3.5);
  const paddingHorizontal = isSmall ? spacing(4) : spacing(5);
  const borderRadius = isSmall ? spacing(1.5) : spacing(2);

  const buttonStyle = [
    {
      alignItems: "center",
      paddingVertical: paddingVertical,
      paddingHorizontal,
      borderRadius: borderRadius,
      backgroundColor: buttonBackgroundColor,
      flexDirection: "row",
      justifyContent: "center",
    },
    style,
    isOutlinedStyle,
  ];

  if (isView) {
    return (
      <View style={buttonStyle as TouchableOpacityProps["style"]}>
        <ButtonContent {...props} />
      </View>
    );
  }
  if (!isDebounced) {
    return (
      <TouchableOpacity
        style={buttonStyle as TouchableOpacityProps["style"]}
        onPress={handleButtonPress}
        disabled={disabled || loading}
        {...other}
      >
        <ButtonContent {...props} />
      </TouchableOpacity>
    );
  }
  return (
    <DebouncedTouchableOpacity
      style={buttonStyle as TouchableOpacityProps["style"]}
      onPress={handleButtonPress}
      disabled={disabled || loading}
      {...other}
    >
      <ButtonContent {...props} />
    </DebouncedTouchableOpacity>
  );
};

export default Button;
