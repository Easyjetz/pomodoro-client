export interface ITimerSettings {
  work: number;
  rounds: number;
  longBreak: number;
  shortBreak: number;
}



export interface ITimerPage {
  settings: ITimerSettings;
}