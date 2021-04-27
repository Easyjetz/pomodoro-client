import React, { useEffect, useState } from 'react'
import { settingsActions, settingsSelectors } from '..';
import { useActions } from '../../../hooks/useActions';
import { useAuth } from '../../../hooks/useAuth';
import { RangeInput } from './RangeInput';
import { SettingsItem, SettingsTitle, SettingsWrap } from '../../../ui/SettingsPage';
import { useSettings } from '../../../hooks/useSettings';
import { Message } from '../../message/Message';
import {  useSelector } from 'react-redux';


export const SettingsPage = () => {
  const { token } = useAuth();
  const { settings, getSettings } = useSettings();
  
  const { saveTimerSettingsFetch } = useActions(settingsActions);
  const timerResponse = useSelector(settingsSelectors.setTimerResponse)

  const [message, setMessage] = useState('');

  const [work, setWork] = useState(settings?.work || 25);
  const [shortBreak, setShortBreak] = useState(settings?.shortBreak || 5);
  const [longBreak, setLongBreak] = useState(settings?.longBreak || 25);
  const [rounds, setRounds] = useState(settings?.rounds || 4);


  useEffect(() => {
    if (timerResponse) {
      setMessage(timerResponse);
    }
  }, [timerResponse])




  useEffect(() => {
    if (settings) {
      setWork(settings.work);
      setShortBreak(settings.shortBreak);
      setLongBreak(settings.longBreak);
      setRounds(settings.rounds);
    } else {
      getSettings(token);
    }
  }, [settings])


  const saveTSettingsHandle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const settings = { work, shortBreak, longBreak, rounds };
    saveTimerSettingsFetch(settings, token);
  }

  return (
    <>
      {settings && <SettingsWrap>
        {timerResponse && <Message success={true} message={message} />}
      <SettingsItem>
        <SettingsTitle>Work</SettingsTitle>
        <RangeInput value={[work]} min={1} max={120} step={1} onChange={([value]) => setWork(value)}  />
      </SettingsItem>
      <SettingsItem>
        <SettingsTitle>Short Break</SettingsTitle>
        <RangeInput value={[shortBreak]} min={1} max={45} step={1} onChange={([value]) => setShortBreak(value)}  />
      </SettingsItem>
      <SettingsItem>
        <SettingsTitle>Long Break</SettingsTitle>
        <RangeInput value={[longBreak]} min={1} max={90} step={1} onChange={([value]) => setLongBreak(value)}  />
      </SettingsItem>
      <SettingsItem>
        <SettingsTitle>Rounds</SettingsTitle>
        <RangeInput value={[rounds]} min={1} max={14} step={1} onChange={([value]) => setRounds(value)} rounds />
      </SettingsItem>
      <SettingsItem>
        <a className="waves-effect waves-light  red lighten-1 btn-large" onClick={saveTSettingsHandle}>Сохранить</a>
      </SettingsItem>
    </SettingsWrap>}
    </>
  )
}