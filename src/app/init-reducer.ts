import {Action} from '@types/flux-standard-action';
import {tassign} from 'tassign';
import {Reducer} from 'redux';

import {InitActions} from './init-actions.service';
import {LoginPage} from './login/login';
import {TabsPage} from './tabs/tabs';

export interface InitState {
  rootPage?: typeof LoginPage | typeof TabsPage;
}

export const initReducer: Reducer<InitState> = (state: InitState, action: Action<InitState>): InitState => {
  switch (action.type) {
    case InitActions.SET_ROOT_PAGE_ACTION : {
      return tassign(state, <InitState>{rootPage: action.payload.rootPage});
    }
    default:
      return state || {rootPage: null};
  }

};
