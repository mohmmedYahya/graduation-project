import AppPolicyIcon from "assets/icons/AppPolicyIcon";
import LogoutIcon from "assets/icons/auth/LogoutIcon";
import LogoutSheet from "assets/icons/auth/LogoutSheet";
import ContactUsIcon from "assets/icons/ContactUsIcon";
import { Typography } from "components/common";
import ProfileBanner from "components/profile/ProfileBanner";
import ProfileMenuItem from "components/profile/ProfileMenuItem";
import {
  MOBILE_BUNDLE_VERSION,
  TERMS_AND_CONDITIONS_URL,
} from "constants/common";
import { useColorScheme } from "hooks/useColorScheme";
import React, { ReactElement } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import palette from "theme/palette";
import { DEFAULT_SPACING, spacing } from "theme/spacing";

export interface IProfileMenuItem {
  text: string;
  href?: string;
  icon: ReactElement;
  onPress?: () => void;
  showLeftArrowIcon?: boolean;
  value?: string;
  isVisible?: boolean;
}
export default function Profile() {
  const theme = useColorScheme();
  const [openLogoutConfirmationModal, setOpenLogoutConfirmationModal] =
    React.useState<boolean>(false);

  const handleOpenLogoutModal = async () =>
    setOpenLogoutConfirmationModal(true);
  const handleCloseLogoutModal = async () =>
    setOpenLogoutConfirmationModal(false);

  const profileItems = [
    {
      text: "الشروط والاحكام",
      href: TERMS_AND_CONDITIONS_URL,
      icon: <AppPolicyIcon />,
    },
    {
      text: "تواصل معنا",
      href: "/profile/contact-us",
      icon: <ContactUsIcon />,
    },
    {
      text: "تسجيل الخروج",
      onPress: handleOpenLogoutModal,
      icon: <LogoutIcon />,
    },
  ];

  const contentContainerStyle = {
    ...styles.container,
    backgroundColor: palette[theme].background.paper,
    paddingBottom: DEFAULT_SPACING / 2,
  };

  return (
    <>
      <View style={contentContainerStyle}>
        <ProfileBanner />
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            ...styles.profileMenu,
          }}
        >
          {profileItems.map((item: IProfileMenuItem, index) => (
            <ProfileMenuItem {...item} key={`${index}_${item.text}`} />
          ))}
        </ScrollView>
        <View style={styles.appInfo}>
          <Typography
            variant="label"
            style={{ color: palette[theme].text.light }}
          >{`V: ${MOBILE_BUNDLE_VERSION}`}</Typography>
        </View>
      </View>
      <LogoutSheet
        visible={openLogoutConfirmationModal}
        handleCloseSheet={handleCloseLogoutModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  profileMenu: {
    width: "100%",
    gap: spacing(3),
    padding: DEFAULT_SPACING,
    marginTop: spacing(4),
    flex: 1,
  },
  appInfo: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: DEFAULT_SPACING,
  },
});
