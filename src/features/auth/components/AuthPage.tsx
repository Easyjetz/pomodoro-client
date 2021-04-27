import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authActions, authSelectors } from '..';
import { useActions } from '../../../hooks/useActions';
import { useAuth } from '../../../hooks/useAuth';
import { Message } from '../../message/Message';

export const AuthPage: React.FC = () => {

    const { loginError, registError, registResponse} = useSelector(authSelectors.auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registMessage, setRegistMessage] = useState<null | string>(null);
    const [loginMessage, setLoginMessage] = useState<null | string>(null);

    useEffect(() => {
        if (registResponse) {
            setRegistMessage(registResponse);
        } else if (registError){
            setRegistMessage(registError);
        }
        
    }, [registError, registResponse]);

    useEffect(() => {
        if (loginError) {
            setLoginMessage(loginError);
        }
    }, [loginError])


    const { userRegisterFetch, userLoginFetch } = useActions(authActions);

    const { login } = useAuth();




    const emailChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const userRegisterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        userRegisterFetch(email, password);
    }

    const userLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setRegistMessage(null);
        const responseData = await userLoginFetch(email, password);
        if (responseData && responseData.token) {
            login(responseData.token, responseData.userId);

        }
    }

    return (
        <div className="row auth-wrapper">
            <div className="">
                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title auth-card-title">Войдите или зарегистрируйтесь</span>
                        {registMessage && <Message success={registResponse ? true : false} message={registMessage} />}
                        {loginMessage && <Message success={false} message={loginMessage} />}
                        <div className="input-field">
                            <input placeholder="Введите email" value={email} type="text" onChange={emailChangeHandler} className="validate auth-input" />
                            <label className="auth-active" >Email</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Введите пароль" value={password} type="password" onChange={passwordChangeHandler} className="validate auth-input" />
                            <label className="auth-active">Password</label>
                        </div>

                    </div>
                    <div className="card-action">
                        <button className="bth-auth btn" onClick={userLoginHandler}>Войти</button>
                        <button className="btn-auth btn" onClick={userRegisterHandler}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}