import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useColorScheme } from "hooks/useColorScheme";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Main-Bold": require("../assets/fonts/Almarai-Bold.ttf"),
    "Main-Regular": require("../assets/fonts/Almarai-Regular.ttf"),
    "Main-SemiBold": require("../assets/fonts/Almarai-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) {
      Updates.reloadAsync();
    }
  }, [error]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootLayoutNav />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const theme = useColorScheme();
  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
