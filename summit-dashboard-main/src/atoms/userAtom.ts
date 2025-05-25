import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const UserState = atom({
  key: "user",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
