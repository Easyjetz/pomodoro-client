import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./auth";
import { settingsReducer } from "./settings";


const rootReducer = combineReducers({ authReducer: authReducer, settingsReducer: settingsReducer });

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export type RootStore = ReturnType<typeof rootReducer>