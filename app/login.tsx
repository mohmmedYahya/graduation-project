import TankLogo from "assets/icons/TankLogo";
import LoggedInUserWrapper from "components/auth/LoggedInUserWrapper";
import { KeyboardSafeScreenContainer, TextInput } from "components/common";
import Button from "components/common/Button";
import Typography from "components/common/Typography";
import { SCREEN_HEIGHT } from "constants/common";
import { useColorScheme } from "hooks/useColorScheme";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";
import typography from "theme/typography";

const phoneInputSize = spacing(9.5);

export default function LoginPhoneForm() {
  const theme = useColorScheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginHandler = () => {};

  return (
    <KeyboardSafeScreenContainer>
      <LoggedInUserWrapper>
        <View style={styles.container}>
          <TankLogo />
          <View style={styles.descriptionContainer}>
            <Typography
              center
              variant="heading4"
              style={{ color: palette[theme].text.secondary }}
            >
              الرجاء إدخال تفاصيل حسابك
            </Typography>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              height: SCREEN_HEIGHT * 0.22,
            }}
          >
            <View style={styles.inputContainer}>
              <TextInput
                testID="login_phone_input"
                placeholder={"البريد الالكتروني"}
                keyboardType="email-address"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                textContentType="emailAddress"
                autoComplete="email"
                enterKeyHint="done"
                style={{
                  height: phoneInputSize,
                  ...typography.heading5,
                  lineHeight: 21,
                }}
                fieldStyle={{ marginVertical: 0 }}
              />
              <TextInput
                testID="login_phone_input"
                placeholder={"كلمة السر"}
                keyboardType="default"
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                textContentType="password"
                autoComplete="password"
                enterKeyHint="done"
                style={{
                  height: phoneInputSize,
                  ...typography.heading5,
                  lineHeight: 21,
                }}
                fieldStyle={{ marginVertical: 0 }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Button
                testID="login_btn"
                text={"تسجيل الدخول"}
                onPress={loginHandler}
                disabled={isLoading}
                loading={isLoading}
              />
            </View>
          </View>
        </View>
      </LoggedInUserWrapper>
    </KeyboardSafeScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: SCREEN_HEIGHT * 0.1,
  },
  descriptionContainer: {
    marginTop: spacing(0),
    marginBottom: spacing(8),
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: DEFAULT_SPACING,
    minHeight: phoneInputSize * 2.5,
  },
});
