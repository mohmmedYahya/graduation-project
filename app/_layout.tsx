import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import NetInfo from "@react-native-community/netinfo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import axios from "axios";
import { HTTP_STATUSES } from "constants/status";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useColorScheme } from "hooks/useColorScheme";
import AuthProvider from "providers/AuthProvider";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { SWRConfig } from "swr";

// تأكيد الانتظار قبل عرض التطبيق
SplashScreen.preventAutoHideAsync().catch(() => {});

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

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <RecoilRoot>
        <RecoilNexus />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <SWRConfig
              value={{
                fetcher: (url: string) =>
                  axios.get(url).then((res) => res.data),
                onErrorRetry: (error, key) => {
                  if (error.statusCode === HTTP_STATUSES.NOT_FOUND) return;
                },
                provider: () => new Map(),
                isVisible: () => true,
                initReconnect(callback) {
                  // Subscribe to network state updates
                  const unsubscribe = NetInfo.addEventListener((state) => {
                    // Trigger revalidation if the network is reachable
                    if (state.isInternetReachable) {
                      callback();
                    }
                  });
                  // Unsubscribe from the event listener
                  return () => {
                    unsubscribe();
                  };
                },
                initFocus(callback) {
                  let appState = AppState.currentState;

                  const onAppStateChange = (nextAppState: AppStateStatus) => {
                    /* If it's resuming from background or inactive mode to active one */
                    if (
                      appState.match(/inactive|background/) &&
                      nextAppState === "active"
                    ) {
                      callback();
                    }
                    appState = nextAppState;
                  };

                  // Subscribe to the app state change events
                  const subscription = AppState.addEventListener(
                    "change",
                    onAppStateChange
                  );

                  return () => {
                    subscription.remove();
                  };
                },
              }}
            >
              <BottomSheetModalProvider>
                <RootLayoutNav />
              </BottomSheetModalProvider>
            </SWRConfig>
          </AuthProvider>
        </GestureHandlerRootView>
      </RecoilRoot>
    </SafeAreaProvider>
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
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
