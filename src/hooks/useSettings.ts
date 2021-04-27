import { useCallback, useEffect, useState } from "react"
import { settingsActions} from "../features/settings";
import { useActions } from "./useActions";
import { useAuth } from "./useAuth";

export interface ISettings {
    work: number,
    shortBreak: number,
    longBreak: number,
    rounds: number
  }

export const useSettings  = () => {

    const [settings, setSettings] = useState<ISettings | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const { getTimerSettingsFetch, saveTimerSettingsFetch } = useActions(settingsActions);
    const { token } = useAuth();


    const getSettings = useCallback(async (token) => {
        const data = await getTimerSettingsFetch(token);
        if (!data) {
            await setDefaultSettings(token);
            const newData = await getTimerSettingsFetch(token);
            setSettings(newData);

        } else {
            setSettings(data);
        }
        setReady(true);
    }, []);

    const setDefaultSettings = useCallback(async (token) => {
        const defaultSettings = { work: 25, shortBreak: 5, longBreak: 25, rounds: 4 };
        await saveTimerSettingsFetch(defaultSettings, token);
    }, []);
    
    return { getSettings, ready, settings };
}