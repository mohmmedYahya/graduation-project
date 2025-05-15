import { useNavigation, useRouter } from "expo-router";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";

export default function LoggedInUserWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const navigation = useNavigation();
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    const checkUserSession = () => {
      // if user is logged in and to redirect him to home page
      if (isUserLoggedIn) {
        router.replace("/");
      }
    };

    const focusSubscription = navigation.addListener("focus", () => {
      checkUserSession();
    });
    return () => {
      focusSubscription();
    };
  }, [isUserLoggedIn]);

  return <>{children}</>;
}
