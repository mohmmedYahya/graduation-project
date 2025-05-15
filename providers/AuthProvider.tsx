import { IUserSession, userSessionAtom } from "atoms/userSession";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
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
  }
};

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const setUserSession = useSetRecoilState(userSessionAtom);

  React.useEffect(() => {
    const loadSessionData = async () => {
      const session = await getSession();
      if (session) {
        setUserSession(session || null);
        axios.defaults.headers.common["Authorization"] = session?.token;
      }
    };
    loadSessionData();
  }, []);

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
