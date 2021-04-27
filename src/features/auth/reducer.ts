import { AuthType, LoginDispatchTypes, RegisterDispatchTypes } from './types';
import * as constants from './constants';


const initialState: AuthType = {
    registLoading: false,
    loginLoading: false,
    registResponse: null,
    loginError: null,
    registError: null,
    loginResponse: null,
}

export function reducer(state: AuthType = initialState, action: RegisterDispatchTypes | LoginDispatchTypes): AuthType {
    switch (action.type) {

        case constants.USER_REGISTER_LOADING:
            return { ...state, registLoading: true };
        case constants.USER_REGISTER_SUCCESS:
            return { ...state, registResponse: action.payload, registLoading: false };
        
        case constants.USER_REGISTER_FAIL:
            return { ...state, registLoading: false, registError: action.payload };
        case constants.USER_LOGIN_LOADING:
            return { ...state, loginLoading: true };
        
        case constants.USER_LOGIN_SUCCESS:
            return { ...state, loginResponse: action.payload, loginLoading: false };
        
        case constants.USER_LOGIN_FAIL:
            return { ...state, loginLoading: false, loginError: action.payload };

        default:
            return state;
    }

}
