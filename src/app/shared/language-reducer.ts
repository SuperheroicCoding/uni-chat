import {Action} from '@types/flux-standard-action';
import {tassign} from 'tassign';
import {Reducer} from 'redux';
import {LanguageActions} from './language-actions.service';

export interface LanguageState {
  userLanguage?: string;
  languageOptions?: LanguageOption[];
}

export interface LanguageOption {
  value: string,
  selected: boolean;
}

const languageOptions: LanguageOption[] = [{value: 'de', selected: true}, {value: 'en', selected: false}];
const setSelectState = (payload: LanguageState, langOpt: LanguageOption) =>
  tassign(langOpt, {selected: langOpt.value == payload.userLanguage});

export const languageReducer: Reducer<LanguageState> = (state: LanguageState, action: Action<LanguageState>): LanguageState => {
  switch (action.type) {
    case LanguageActions.SET_LANGUAGE: {
      return state.userLanguage == action.payload.userLanguage ? state :
        tassign(state, <LanguageState>{
          userLanguage: action.payload.userLanguage,
          languageOptions: languageOptions.map((langOpt) => setSelectState(action.payload, langOpt))
        });
    }
    default:
      return state || {userLanguage: 'de', languageOptions: languageOptions};
  }
};


