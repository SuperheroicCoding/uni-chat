import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import 'rxjs/add/operator/do';
import {LanguageActions} from './shared/language-actions.service';
import {UniState} from './store';

@Injectable()
export class InitActions {
  static SET_ROOT_PAGE_ACTION = 'SET_ROOT_PAGE';
  static DETERMINE_ROOT_PAGE_ACTION = 'DETERMINE_ROOT_PAGE';

  constructor(private ngRedux: NgRedux<UniState>) {
  }

  determineRootPage() {
    this.ngRedux.dispatch({type: InitActions.DETERMINE_ROOT_PAGE_ACTION});
  }

  initLanguage() {
    let userLanguage = navigator.language.split('-')[0]; // use navigator lang if available
    userLanguage = /(en|de)/gi.test(userLanguage) ? userLanguage : 'en';
    this.ngRedux.dispatch(LanguageActions.trySetLanguageAction(userLanguage));
  }


}
