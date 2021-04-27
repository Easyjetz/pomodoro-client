import * as constants from './constants';
import {
  RegisterDispatchTypes,
  IUserRegisterSuccess,
  IUserRegisterLoading,
  IUserRegisterFail,
  IUserLoginFail,
  IUserLoginLoading,
  IUserLoginSuccess,
  LoginResponseType,
  LoginDispatchTypes
} from './types';
import { Dispatch } from 'redux'
import axios from 'axios';



export const userRegisterLoading = (): IUserRegisterLoading => ({ type: constants.USER_REGISTER_LOADING });
export const userRegisterSuccess = (message: string): IUserRegisterSuccess => ({ type: constants.USER_REGISTER_SUCCESS, payload: message });

export const userLoginLoading = (): IUserLoginLoading => ({ type: constants.USER_LOGIN_LOADING });
export const userLoginSuccess = (data: LoginResponseType): IUserLoginSuccess => ({type: constants.USER_LOGIN_SUCCESS, payload: data})



export const userRegisterFetch = (email: string, password: string) => async (dispatch: Dispatch<RegisterDispatchTypes>) => {
  try {
    dispatch(userRegisterLoading());

    const res = await axios.post('/api/auth/register', { email, password });

    dispatch(userRegisterSuccess(res.data.message));


  } catch (e) {
    dispatch({ type: constants.USER_REGISTER_FAIL, payload: e.response.data.message });
  }
}

export const userLoginFetch = (email: string, password: string) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
  try {
    dispatch(userLoginLoading());
    const res = await axios.post('/api/auth/login', {email, password});
    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: { token: res.data.token, userId: res.data.userId }});
    return res.data;
  } catch (e) {
    dispatch({ type: constants.USER_LOGIN_FAIL, payload: e.response.data.message });
  }
}
