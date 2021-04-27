import * as constants from './constants';
import { timerSettingStateType, saveSettingsDispatchTypes, getSettingsDispatchTypes } from './types';

const initialState: timerSettingStateType  = {
  setTimerResponse: null,
  timerSettings: null,
  loading: false,
  isSettings: false,
}

export const reducer = (state = initialState, action: saveSettingsDispatchTypes | getSettingsDispatchTypes): timerSettingStateType  => {
  switch (action.type) {

    case constants.TIMER_SETTINGS_LOADING:
      return { ...state, loading: true };
    
    case constants.TIMER_SETTINGS_SUCCESS:
      console.log(action.payload);
      return { ...state, setTimerResponse: action.payload, loading: false };
    
    case constants.TIMER_SETTINGS_RESET:
      return { ...state, setTimerResponse: null };
    
    case constants.GET_SETTINGS_SUCCESS:
      return { ...state, loading: false, timerSettings: action.payload, isSettings: true };
    
    default:
      return state;
  }
}