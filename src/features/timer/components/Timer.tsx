import React, { useEffect, useReducer, useState } from 'react'
import { ISettings, useSettings } from '../../../hooks/useSettings'
import { VscDebugStart } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import { GiPauseButton } from 'react-icons/gi';
import { IconContext } from 'react-icons';
type Props = {
  settings: ISettings;
}

type timerState = {
  seconds: number;
  minutes: number;
  rounds: number;
  status: string;
}

type timerAction =
  | { type: 'start' }
  | { type: 'reset' }

const generateTimerString = (min: number, sec: number): string => {
  if (sec === 60) {
    return `${min}:00`;
  } else if (sec < 10) {
    return `${min}:0${sec}`;
  }
  return `${min}:${sec}`;
}

const songUrl = require('../../../sounds/timer-bell_end.mp3');

export const Timer: React.FC<Props> = ({ settings }) => {

  const audio = new Audio(songUrl.default);
  
  const { work, longBreak, shortBreak, rounds } = settings;

  const [initialState, setInitialState] = useState({
    seconds: 60,
    minutes: work,
    rounds: rounds - 1,
    status: 'work'
  });

  function reducer(state: timerState, action: timerAction): timerState {
    switch (action.type) {
      case 'start':
        if (state.seconds === 0 && state.minutes === 0) {
          audio.play();
          setIsRunning(false);
          if (state.rounds === 0) {
            return { ...state, status: 'break', rounds: rounds, minutes: longBreak, seconds: 60 };
          }
          switch (state.status) {
            case 'work':
              return { ...state, status: 'break', minutes: shortBreak, seconds: 60 };
            
            case 'break':
              return { ...state, status: 'work', rounds: state.rounds - 1, minutes: work, seconds: 60 };

          }
          return { ...state, status: 'work', minutes: work, seconds: 60}
        } else if (state.seconds === 60) {
          return {...state, minutes: state.minutes - 1, seconds: state.seconds - 1}
        } else if (state.seconds === 0) {
          return { ...state, minutes: state.minutes - 1, seconds: 59 }
        }
        return { ...state, seconds: state.seconds - 1 }
      
      case 'reset':
        setIsRunning(false);
        return {...state, seconds: work, minutes: 60, rounds: rounds - 1, status: 'work'}
      
      default:
        return state;
    }

  }
  const [isRunning, setIsRunning] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        dispatch({ type: 'start' });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [dispatch, isRunning]);



  const result = generateTimerString(state.minutes, state.seconds);




  return (
    <div className={state.status === 'break' ? 'timer-wrapper timer-break' : 'timer-wrapper'}>
      <div className="timer-result">{result}</div>
      <div>
        <IconContext.Provider value={{ size: '42px'}}>
          {isRunning ? <GiPauseButton className='timer-button' onClick={() => setIsRunning(!isRunning)} /> : <VscDebugStart className='timer-button' onClick={() => setIsRunning(!isRunning)} />}
          <GrPowerReset className="timer-reset timer-button" onClick={() => dispatch({type: 'reset'})}/>
        </IconContext.Provider>
      </div>
      
    </div>
  )
}