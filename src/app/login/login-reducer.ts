

import {Reducer} from 'redux';
import {Action} from '@types/flux-standard-action';
export interface LoginState {
  loggedIn?: boolean;

}

export const loginReducer: Reducer<LoginState> = (state: LoginState, action: Action<LoginState>): LoginState => {
  return state;
};
