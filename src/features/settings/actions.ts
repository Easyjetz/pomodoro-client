import { Dispatch } from 'redux';
import * as constants from './constants';
import { ITimerSettingsLoading, ITimerSettingsFail, ITimerSettingsSuccess, ITimerSettings, saveSettingsDispatchTypes, IGetSettingsSuccess, IGetSettingsLoading, getSettingsDispatchTypes } from './types';

export const saveTSettingsLoading = (): ITimerSettingsLoading => ({ type: constants.TIMER_SETTINGS_LOADING });
export const saveTSettingsFail = (): ITimerSettingsFail => ({ type: constants.TIMER_SETTINGS_FAIL });
export const saveTSettingsSuccess = (data: string): ITimerSettingsSuccess => ({ type: constants.TIMER_SETTINGS_SUCCESS, payload: data });


export const saveTimerSettingsFetch = (timerSettings: ITimerSettings, token: string) => async (dispatch: Dispatch<saveSettingsDispatchTypes>) => {
  try {

    dispatch(saveTSettingsLoading());
    const res = await fetch('/api/timer/default', {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'  }, body: JSON.stringify(timerSettings)
    });
    const data = await res.json();
    dispatch(saveTSettingsSuccess(data.message));
    return data;

  } catch (e) {
    console.log('Ошибка при отправке дефолтных настроек');
  }
}


export const resetTimerResponse = () => (dispatch: Dispatch<saveSettingsDispatchTypes>) => {
  dispatch({ type: constants.TIMER_SETTINGS_RESET });
}


export const getTSettingsLoading = (): IGetSettingsLoading => ({ type: constants.GET_SETTINGS_LOADING });
export const getTSettingsSuccess = (settings: ITimerSettings): IGetSettingsSuccess => ({ type: constants.GET_SETTINGS_SUCCESS, payload: settings });

export const getTimerSettingsFetch = (token: string) => async (dispatch: Dispatch<getSettingsDispatchTypes>) => {
  try {
    dispatch(getTSettingsLoading());

    const res = await fetch('/api/timer/settings', { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, method: 'GET' });
    const data = await res.json();

    dispatch(getTSettingsSuccess(data));

    return data;
  } catch (e) {
    console.log('Ошибка при получении настроек таймера');
  }
}