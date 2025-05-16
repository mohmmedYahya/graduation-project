import { userSessionAtom } from "atoms/userSession";
import { getRecoil } from "recoil-nexus";

export default function useAuth() {
  const { user } = getRecoil(userSessionAtom) || {};

  const isUserLoggedIn = !!user;
  return {
    user,
    isUserLoggedIn,
  };
}
