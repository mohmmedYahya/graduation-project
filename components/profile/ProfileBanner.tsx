import PencilIcon from "assets/icons/PencilIcon";
import AvatarImage from "components/AvatarImage";
import { DebouncedTouchableOpacity, Typography } from "components/common";
import { isSmallScreen } from "constants/common";
import { useRouter } from "expo-router";
import { useColorScheme } from "hooks/useColorScheme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";
import { getSafeViewStyle } from "utils/helper";

export default function ProfileBanner() {
  const router = useRouter();
  const theme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isAllSidesSafeStyle = getSafeViewStyle(insets);

  const username = "محمد مجدي يحيى";
  const userPhoneNumber = "01111111111";

  const onOpenEditProfile = () => router.push("/profile/edit");

  const textColor = palette[theme].common.white;

  const userEmail = "mohammed@gmail.com";

  return (
    <View
      style={{
        ...styles.headerContainer,
        backgroundColor: palette[theme].primary.main,
        paddingTop: isAllSidesSafeStyle.paddingTop,
      }}
    >
      <View style={styles.infoContainer}>
        <ScrollView bounces={false} contentContainerStyle={styles.infoDetails}>
          <AvatarImage />
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: spacing(1),
              width: "100%",
              flex: 1,
            }}
          >
            <Typography variant={"heading3"} style={{ color: textColor }}>
              {username}
            </Typography>
            <Typography variant="placeholder2" style={{ color: textColor }}>
              {userEmail}
            </Typography>
            <Typography variant="placeholder2" style={{ color: textColor }}>
              {userPhoneNumber}
            </Typography>
          </View>
        </ScrollView>
        <DebouncedTouchableOpacity
          testID="profile_edit_btn"
          onPress={onOpenEditProfile}
        >
          <View
            style={{
              ...styles.editAction,
              backgroundColor: palette[theme].primary.light,
            }}
          >
            <Typography
              variant="placeholder1"
              style={{ color: palette[theme].common.white }}
            >
              تعديل
            </Typography>
            <PencilIcon />
          </View>
        </DebouncedTouchableOpacity>
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: isSmallScreen ? DEFAULT_SPACING : spacing(6),
    paddingTop: isSmallScreen ? DEFAULT_SPACING / 2 : DEFAULT_SPACING / 4,
  },
  infoDetails: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing(3),
    width: "100%",
  },
  editAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: spacing(1),
    paddingVertical: spacing(1.5),
    paddingHorizontal: DEFAULT_SPACING,
    borderRadius: spacing(1),
  },
});
