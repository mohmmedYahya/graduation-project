import { atom } from "recoil";

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IUserSession {
  user: IUser;
  token: string;
}
export const userSessionAtom = atom<IUserSession | null>({
  key: "userSession",
  default: null,
});
