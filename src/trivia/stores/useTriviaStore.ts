import { create } from "zustand";

type Screen = "home" | "category";

interface TriviaState {
  screen: Screen;
  userName: string;

  setScreen: (screen: Screen) => void;
  setUserName: (data: { playerName: string }) => void;
  changeUser: () => void;
}

const useTriviaStore = create<TriviaState>((set) => ({
  screen: "home",
  userName: "",

  setScreen: (screen) => set({ screen }),
  setUserName: (data) => set({ userName: data.playerName, screen: "category" }),

  changeUser: () =>
    set({
      userName: "",
      screen: "home",
    }),
}));

export default useTriviaStore;
