import { IUserSession, userSessionAtom } from "atoms/userSession";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { setRecoil } from "recoil-nexus";

export const SESSION_KEY = "SESSION_STORE_KEY";

export interface ILoginResponse {
  data: IUserSession;
}

export const getSession = async () => {
  try {
    const userSessionEncoded = await SecureStore.getItemAsync(SESSION_KEY);

    const parsedSession = userSessionEncoded
      ? (JSON.parse(userSessionEncoded) as IUserSession)
      : null;
    if (parsedSession && Object.keys(parsedSession).length === 0) return null;
    return parsedSession;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const setUserSession = useSetRecoilState(userSessionAtom);

  useEffect(() => {
    const loadSessionData = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUserSession(session);
          axios.defaults.headers.common["Authorization"] = session?.token || "";
          return;
        }
        router.push("/login");
      } catch (error) {
        console.error("Error loading session:", error);
        router.push("/login");
      }
    };

    loadSessionData();
  }, [router, setUserSession]);

  return <>{children}</>;
};

export const storeSession = async (data: IUserSession) => {
  axios.defaults.headers.common["Authorization"] = data.token;
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(data));
};

export const updateSessionData = async (data: IUserSession) => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(data));
  setRecoil(userSessionAtom, data);
};

export const logOut = async () => {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    axios.defaults.headers.common.Authorization = "";
    setRecoil(userSessionAtom, null);
  } catch (err) {
    console.error(err);
  }
};

export default AuthProvider;
