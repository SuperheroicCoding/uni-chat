import {Injectable} from '@angular/core';
import {Action} from '@types/flux-standard-action';
import {NgRedux} from '@angular-redux/store';

import {LanguageState} from './language-reducer';
import {UniState} from '../store';

@Injectable()
export class LanguageActions {

  static SET_LANGUAGE = 'SET_LANGUAGE';
  static TRY_SET_LANGUAGE = 'TRY_SET_LANGUAGE';

  static createSetLanguageAction(userLanguage: string): Action<LanguageState> {
    return {type: LanguageActions.SET_LANGUAGE, payload: {userLanguage}};
  }

  static trySetLanguageAction(userLanguage: string): Action<LanguageState> {
    return {type: LanguageActions.TRY_SET_LANGUAGE, payload: {userLanguage}};
  }

  constructor(private ngRedux: NgRedux<UniState>) {
  }

  trySetLanguage(userLanguage: string) {
    this.ngRedux.dispatch(LanguageActions.trySetLanguageAction(userLanguage));
  }

}
