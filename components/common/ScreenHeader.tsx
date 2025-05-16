import BackButton from "components/BackButton";
import { Typography } from "components/common";
import { BACK_ICON_SIZE, SCREEN_WIDTH } from "constants/common";
import { Link } from "expo-router";
import { useColorScheme } from "hooks/useColorScheme";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";

const EditModeButton = ({ editModeUrl }: { editModeUrl: string }) => {
  return (
    <Link testID="edit_mode_btn" asChild replace href={editModeUrl as any}>
      <TouchableOpacity style={styles.editModeButton}>
        <Typography variant="body2">{"تعديل"}</Typography>
      </TouchableOpacity>
    </Link>
  );
};

export default function ScreenHeader({
  screenName,
  showBackButton = true,
  headerStyle,
  editModeUrl,
  secondaryTitle,
}: {
  screenName?: string;
  showBackButton?: boolean;
  headerStyle?: ViewProps["style"];
  editModeUrl?: string;
  secondaryTitle?: string;
}) {
  const theme = useColorScheme();
  const isEditMode = !!editModeUrl;

  const normalModeTitleWidth =
    SCREEN_WIDTH - DEFAULT_SPACING * 5 - BACK_ICON_SIZE;
  const editModeDetailsWidth =
    SCREEN_WIDTH - BACK_ICON_SIZE - DEFAULT_SPACING * 2 - spacing(1);

  const headerDetailsWidth =
    secondaryTitle || editModeUrl ? editModeDetailsWidth : normalModeTitleWidth;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette[theme].background.paper },
        headerStyle,
      ]}
    >
      <View style={[styles.topContainer]}>
        <View style={[styles.screenDetailsContainer]}>
          {showBackButton && <BackButton />}
          {screenName && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent:
                  isEditMode || secondaryTitle ? "space-between" : "center",
                width: showBackButton ? headerDetailsWidth : "100%",
              }}
            >
              <Typography variant={"heading4"}>{screenName}</Typography>
              {isEditMode && <EditModeButton editModeUrl={editModeUrl} />}
              {secondaryTitle && (
                <Typography variant="body2">{secondaryTitle}</Typography>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: spacing(3),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  screenDetailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: spacing(1),
  },
  editModeButton: {
    width: 60,
    height: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
