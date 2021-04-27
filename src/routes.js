import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthPage } from './features/auth/components/AuthPage';
import { SettingsPage } from './features/settings/components/SettingsPage';
import { TimerPage } from './features/timer';


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/settings'>
                    <SettingsPage />
                </Route>
                <Route path='/timer'>
                    <TimerPage />
                </Route>
                <Redirect to='/timer' />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )

}