import { userSessionAtom } from "atoms/userSession";
import { useRecoilValue } from "recoil";

export default function useAuth() {
  const { user } = useRecoilValue(userSessionAtom) || {};

  const isUserLoggedIn = !!user;
  return {
    user,
    isUserLoggedIn,
  };
}
