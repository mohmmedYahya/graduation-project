import TankLogo from "assets/icons/TankLogo";
import axios from "axios";
import { KeyboardSafeScreenContainer } from "components/common";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import Typography from "components/common/Typography";
import LoggedInUserWrapper from "components/layout/LoggedInUserWrapper";
import { SCREEN_HEIGHT } from "constants/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { cleanPhoneNumber, validatePhoneNumber } from "helper/number";
import { useColorScheme } from "hooks/useColorScheme";
import { useLocalizationContext } from "locales/locales";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";
import typography from "theme/typography";

const phoneInputSize = spacing(9.5);

export default function LoginPhoneForm() {
  const router = useRouter();
  const theme = useColorScheme();
  const { t } = useLocalizationContext();
  const { accountType } = useLocalSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validatePhone = () => {
    const isValidPhone = validatePhoneNumber(phoneNumber);
    if (isValidPhone) {
      setIsValid(true);
      setErrorMessage("");
    } else {
      setIsValid(false);
      setErrorMessage(t("errors.notValidPhoneNumberError"));
    }
  };

  const OTPLoginHandler = () => {
    setIsLoading(true);
    const phoneNumberValue = cleanPhoneNumber(phoneNumber);
    axios
      .post(`/${String(accountType).toLocaleLowerCase()}/login`, {
        phoneNumber: phoneNumberValue,
      })
      .then(({ data }) => {
        setIsValid(true);
        setErrorMessage("");
        router.push({
          pathname: `/login/otp-verification`,
          params: {
            otpData: JSON.stringify({
              phoneNumber: phoneNumberValue,
              accountType,
            }),
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setIsValid(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoggedInUserWrapper>
      <KeyboardSafeScreenContainer>
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
                // keyboardType="phone-pad"
                onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
                textContentType="telephoneNumber"
                autoComplete="tel"
                enterKeyHint="done"
                style={{
                  height: phoneInputSize,
                  ...typography.heading5,
                  lineHeight: 21,
                }}
                fieldStyle={{ marginVertical: 0 }}
                onBlur={validatePhone}
              />
              <TextInput
                testID="login_phone_input"
                placeholder={"كلمة السر"}
                // keyboardType="phone-pad"
                onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
                textContentType="telephoneNumber"
                autoComplete="tel"
                enterKeyHint="done"
                style={{
                  height: phoneInputSize,
                  ...typography.heading5,
                  lineHeight: 21,
                }}
                fieldStyle={{ marginVertical: 0 }}
                onBlur={validatePhone}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Button
                testID="login_phone_continue_btn"
                text={"تسجيل الدخول"}
                onPress={OTPLoginHandler}
                disabled={isLoading || !validatePhoneNumber(phoneNumber)}
                loading={isLoading}
              />
            </View>
          </View>
        </View>
      </KeyboardSafeScreenContainer>
    </LoggedInUserWrapper>
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
