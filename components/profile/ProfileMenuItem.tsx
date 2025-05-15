import { AntDesign } from "@expo/vector-icons";
import { Card, Typography } from "components/common";
import { Link } from "expo-router";
import { useColorScheme } from "hooks/useColorScheme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";
import { REGULAR_FONT } from "theme/typography";
import { IProfileMenuItem } from "./types";

const ProfileMenuItem = ({
  text,
  icon,
  href,
  onPress,
  showLeftArrowIcon = true,
  isVisible = true,
}: IProfileMenuItem) => {
  const theme = useColorScheme();

  if (!isVisible) return null;

  const Content = () => (
    <Card style={[styles.container]}>
      <View style={[styles.rightSection, { gap: spacing(3) }]}>
        <View style={{ width: spacing(6), alignItems: "center" }}>{icon}</View>
        <Typography variant="heading4" style={{ fontFamily: REGULAR_FONT }}>
          {text}
        </Typography>
      </View>
      {showLeftArrowIcon && (
        <AntDesign name="left" size={20} color={palette[theme].primary.main} />
      )}
    </Card>
  );

  const testIDItemValue = `${text}_menu_item`;

  return href ? (
    <Link testID={testIDItemValue} asChild href={href as any}>
      <TouchableOpacity>
        <Content />
      </TouchableOpacity>
    </Link>
  ) : (
    <TouchableOpacity testID={testIDItemValue} onPress={onPress}>
      <Content />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: DEFAULT_SPACING,
    paddingVertical: DEFAULT_SPACING,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfileMenuItem;
