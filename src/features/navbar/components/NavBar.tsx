import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { resetTimerResponse } from '../../settings/actions';

export const NavBar = () => {

  const dispatch = useDispatch();


  const { logOut } = useAuth();

  const logoutHandler = () => {
    logOut();
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo left">Pomodoro</a>
          <ul className="right">
            <li><NavLink to={'/timer'} onClick={() => dispatch(resetTimerResponse())}>Timer</NavLink></li>
            <li><NavLink to={'/settings'}>Settings</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}