import HomeIcon from "assets/icons/tab-bar/HomeIcon";
import TabPersonIcon from "assets/icons/tab-bar/TabPersonIcon";
import TabContainer from "components/tabs/TabContainer";
import { Tabs } from "expo-router";
import { useColorScheme } from "hooks/useColorScheme";
import React from "react";
import { Platform, View } from "react-native";
import palette from "theme/palette";
import shadow from "theme/shadow";
import { spacing } from "theme/spacing";

const BAR_BORDER_RADIUS = spacing(8);

export default function TabLayout() {
  const theme = useColorScheme();

  const TAB_BAR_STYLE = {
    backgroundColor: palette[theme].common.white,
    borderTopLeftRadius: BAR_BORDER_RADIUS,
    borderTopRightRadius: BAR_BORDER_RADIUS,
    borderTopWidth: 0,
    ...shadow.shadow2,
  };
  return (
    <View style={{ flex: 1, backgroundColor: palette[theme].background.paper }}>
      <Tabs
        initialRouteName="index"
        backBehavior={"initialRoute"}
        screenOptions={{
          tabBarActiveTintColor: palette[theme].primary.main,
          tabBarInactiveTintColor: palette[theme].text.secondary,
          headerShown: false,
          tabBarStyle: Platform.select({
            ...TAB_BAR_STYLE,
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
              ...TAB_BAR_STYLE,
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: () => null,
            tabBarButton: (props) => (
              <TabContainer Icon={HomeIcon} title={"الرئيسية"} {...props} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: () => null,
            tabBarButton: (props) => (
              <TabContainer
                Icon={TabPersonIcon}
                title={"الملف الشخصي"}
                {...props}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
