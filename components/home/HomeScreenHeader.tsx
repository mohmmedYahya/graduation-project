import AvatarImage from "components/AvatarImage";
import { Typography } from "components/common";
import { isSmallScreen } from "constants/common";
import { useColorScheme } from "hooks/useColorScheme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";
import { getSafeViewStyle } from "utils/helper";

export default function HomeScreenHeader() {
  const theme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isAllSidesSafeStyle = getSafeViewStyle(insets);

  const textColor = palette[theme].common.white;

  const name = "محمد";

  return (
    <View
      style={{
        ...styles.headerContainer,
        paddingTop: isAllSidesSafeStyle.paddingTop,
        backgroundColor: "#3B82F6",
      }}
    >
      <View style={styles.infoContainer}>
        <ScrollView bounces={false} contentContainerStyle={styles.infoDetails}>
          <AvatarImage />
          <View
            style={{
              alignItems: "flex-start",
              gap: spacing(1),
              width: "100%",
              flex: 1,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="heading2" style={{ color: textColor }}>
              {`مرحبا ${name}`}
            </Typography>
            <Typography variant="label" style={{ color: textColor }}>
              جنين شارع الناصرة
            </Typography>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: spacing(8),
    borderBottomRightRadius: spacing(8),
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: DEFAULT_SPACING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: isSmallScreen ? DEFAULT_SPACING / 2 : DEFAULT_SPACING / 4,
    marginBottom: isSmallScreen ? DEFAULT_SPACING : spacing(6),
  },
  infoDetails: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing(3),
    width: "100%",
  },
});
