import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "../features/auth";
import { useActions } from "./useActions";

export const useAuth = () => {

    const { userLoginSuccess } = useActions(authActions);
    const loginResponse = useSelector(authSelectors.loginResponse);
    const token = loginResponse?.token;
    const login = useCallback((jwtToken: string, id: string) => {
        localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwtToken }));
    }, []);

    const logOut = useCallback(() => {
        localStorage.removeItem('userData');
    }, []);


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData') || "{}");

        if (userData && userData.token) {
            userLoginSuccess({ token: userData.token, userId: userData.userId });
        }
    }, []);

    return { login, logOut, loginResponse, token };
}