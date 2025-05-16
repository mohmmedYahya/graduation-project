import { ANDROID_BOTTOM_PADDING } from "constants/common";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getSafeViewStyle } from "utils/helper";
import { useColorScheme } from "../../hooks/useColorScheme";
import palette from "../../theme/palette";
import { DEFAULT_SPACING, spacing } from "../../theme/spacing";
import ScreenHeader from "./ScreenHeader";

export interface ScreenContainerProps {
  screenName?: string;
  showBackButton?: boolean;
  showHeader?: boolean;
  customHeader?: React.ReactNode;
  isThereHorizontalPadding?: boolean;
  isThereBottomPadding?: boolean;
  headerContainerStyleProp?: ViewProps["style"];
  headerStyle?: ViewProps["style"];
  editModeUrl?: string;
  secondaryTitle?: string;
}

const ScreenContainer = (props: ViewProps & ScreenContainerProps) => {
  const {
    children,
    style,
    screenName,
    showBackButton,
    customHeader,
    showHeader = true,
    isThereHorizontalPadding = true,
    isThereBottomPadding = true,
    headerContainerStyleProp,
    headerStyle,
    editModeUrl,
    secondaryTitle,
    ...other
  } = props;
  const theme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isAllSidesSafeStyle = getSafeViewStyle(insets);

  const headerContainerStyle = {
    ...styles.headerContainer,
    paddingTop: isAllSidesSafeStyle.paddingTop,
    backgroundColor: palette[theme].background.paper,
  };

  const contentContainerStyle = {
    ...styles.contentContainer,
    paddingBottom: isThereBottomPadding
      ? insets.bottom + ANDROID_BOTTOM_PADDING
      : 0,
    paddingLeft: isThereHorizontalPadding ? insets.left + DEFAULT_SPACING : 0,
    paddingRight: isThereHorizontalPadding ? insets.right + DEFAULT_SPACING : 0,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette[theme].background.paper,
      }}
      {...other}
    >
      {showHeader && (
        <View style={[headerContainerStyle, headerContainerStyleProp]}>
          {!customHeader && (
            <ScreenHeader
              secondaryTitle={secondaryTitle}
              headerStyle={headerStyle}
              showBackButton={showBackButton}
              screenName={screenName}
              editModeUrl={editModeUrl}
            />
          )}
          {customHeader}
        </View>
      )}
      <View style={[contentContainerStyle, style]}>{children}</View>
      <StatusBar style={"dark"} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: DEFAULT_SPACING,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing(6),
  },
});

export default ScreenContainer;
