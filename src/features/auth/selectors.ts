import { RootStore } from '../store';


export const auth = (state: RootStore) => state.authReducer;
export const loginResponse = (state: RootStore) => auth(state).loginResponse;