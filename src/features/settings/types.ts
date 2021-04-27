import * as constants from './constants';


export interface ITimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  rounds: number;
}

export interface ITimerSettingsState {
  timerSettings?: ITimerSettings | null;
  setTimerResponse: string | null;
  loading: boolean;
  isSettings: boolean;
}


export interface ITimerSettingsLoading {
  type: typeof constants.TIMER_SETTINGS_LOADING;
}

export interface ITimerSettingsFail {
  type: typeof constants.TIMER_SETTINGS_FAIL;
}

export interface ITimerSettingsSuccess {
  type: typeof constants.TIMER_SETTINGS_SUCCESS;
  payload: string;
}

export interface IGetSettingsLoading {
  type: typeof constants.GET_SETTINGS_LOADING;
}

export interface IGetSettingsFail {
  type: typeof constants.GET_SETTINGS_FAIL;
}

export interface IGetSettingsSuccess {
  type: typeof constants.GET_SETTINGS_SUCCESS;
  payload: ITimerSettings;
}

export interface ITimerSettingsReset {
  type: typeof constants.TIMER_SETTINGS_RESET;
}

export type timerSettingStateType = ITimerSettingsState;
export type saveSettingsDispatchTypes = ITimerSettingsLoading | ITimerSettingsFail | ITimerSettingsSuccess | ITimerSettingsReset;
export type getSettingsDispatchTypes = IGetSettingsLoading | IGetSettingsFail | IGetSettingsSuccess;