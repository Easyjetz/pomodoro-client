import React, {useState, useEffect, useReducer, ReactNode} from 'react'
import { runInContext } from 'vm';
import { useAuth } from '../../hooks/useAuth';
import { ISettings, useSettings } from '../../hooks/useSettings';
import { Timer } from './components/Timer';
import { ITimerPage, ITimerSettings } from './types';





export const TimerPage: React.FC = () => {
  
  const [timerSettings, setTimerSettings] = useState<ISettings | null>(null);
  const { token } = useAuth();
  const { getSettings, settings, ready } = useSettings();


  useEffect(() => {
    if (!ready) {
      getSettings(token);
    } else {
      setTimerSettings(settings);
    }

  }, [ready]);
 




  return (
    <>
      {timerSettings && <div>
        <Timer settings={timerSettings} />
      </div>}
    </>
  )
}