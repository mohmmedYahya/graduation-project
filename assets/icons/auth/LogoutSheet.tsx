import { userSessionAtom } from "atoms/userSession";
import axios from "axios";
import { Button, DynamicSheetModal, Typography } from "components/common";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SESSION_KEY } from "providers/AuthProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { DEFAULT_SPACING } from "theme/spacing";

export default function LogoutSheet({
  visible,
  handleCloseSheet,
}: {
  visible: boolean;
  handleCloseSheet: () => void;
}) {
  const router = useRouter();
  const setUserSession = useSetRecoilState(userSessionAtom);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync(SESSION_KEY);
    axios.defaults.headers.common.Authorization = "";
    setUserSession(null);
    handleCloseSheet();
    // Delay for smooth transition
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        // Clear all routes
        router.dismissAll();
        router.push("/");
        resolve();
      }, 300);
    });
  };
  return (
    <DynamicSheetModal handleCloseSheet={handleCloseSheet} visible={visible}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography variant="heading3">تسجيل الخروج</Typography>
        </View>
        <Typography
          style={{
            paddingBottom: DEFAULT_SPACING * 3,
            paddingTop: DEFAULT_SPACING * 2,
          }}
          variant="body"
        >
          هل أنت متأكد من تسجيل الخروج؟
        </Typography>
        <View style={{ width: "100%", gap: DEFAULT_SPACING }}>
          <Button loading={loading} text={"نعم"} onPress={handleLogout} />
          <Button variant="outlined" text={"لا"} onPress={handleCloseSheet} />
        </View>
      </View>
    </DynamicSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: DEFAULT_SPACING,
    alignItems: "center",
    gap: DEFAULT_SPACING,
  },
});
