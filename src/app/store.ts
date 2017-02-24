import {combineReducers, Reducer} from 'redux';
import {InitState, initReducer} from './init-reducer';
import {languageReducer, LanguageState} from './shared/language-reducer';

export interface UniState {
  initState?: InitState,
  languageState?: LanguageState
}

export const rootReducer: Reducer<UniState> = combineReducers({
  initState: initReducer,
  languageState: languageReducer
});

