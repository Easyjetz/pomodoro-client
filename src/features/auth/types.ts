import * as constants from './constants';


export type LoginResponseType = {
  token: string;
  userId: string;
}

export interface AuthState {
  registLoading: boolean;
  loginLoading: boolean;
  registResponse: string | null;
  loginResponse: LoginResponseType | null;
  loginError: null | string;
  registError: null | string;
}

export interface IUserRegisterLoading {
  type: typeof constants.USER_REGISTER_LOADING;
}

export interface IUserRegisterFail {
  type: typeof constants.USER_REGISTER_FAIL;
  payload: string;
}

export interface IUserRegisterSuccess {
  type: typeof constants.USER_REGISTER_SUCCESS;
  payload: string;
}

export interface IUserLoginLoading {
  type: typeof constants.USER_LOGIN_LOADING;
}

export interface IUserLoginFail {
  type: typeof constants.USER_LOGIN_FAIL;
  payload: string;
}

export interface IUserLoginSuccess {
  type: typeof constants.USER_LOGIN_SUCCESS;
  payload: LoginResponseType;
}

export type AuthType = AuthState;
export type RegisterDispatchTypes = IUserRegisterLoading | IUserRegisterFail | IUserRegisterSuccess;
export type LoginDispatchTypes = IUserLoginLoading | IUserLoginFail | IUserLoginSuccess;