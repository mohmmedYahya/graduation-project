import HomeScreenHeader from "components/home/HomeScreenHeader";
import WaterTank from "components/home/water-tank/WaterTank";
import { useColorScheme } from "hooks/useColorScheme";
import { StyleSheet, View } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING } from "theme/spacing";
// import HomeScreenHeader from '../../../components/HomeScreenHeader';

export default function BusinessHomeScreen() {
  const theme = useColorScheme();

  const contentContainerStyle = {
    ...styles.container,
    backgroundColor: palette[theme].background.paper,
  };

  return (
    <View style={contentContainerStyle}>
      <HomeScreenHeader />
      <View style={styles.scheduleContainer}>
        <WaterTank />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scheduleContainer: {
    width: "100%",
    flex: 1,
    paddingTop: DEFAULT_SPACING,
    justifyContent: "flex-start",
  },
});
