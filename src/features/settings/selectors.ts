import { RootStore } from "../store";

export const settingsReducer = (state: RootStore) => state.settingsReducer;
export const settings = (state: RootStore) => settingsReducer(state).timerSettings;
export const isSettings = (state: RootStore) => settingsReducer(state).isSettings;

export const setTimerResponse = (state: RootStore) => settingsReducer(state).setTimerResponse;

