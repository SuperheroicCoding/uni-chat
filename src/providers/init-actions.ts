import {Injectable, Component} from '@angular/core';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {AuthService} from './auth-service';
import {UniState, IPayloadAction} from '../app/store';
import {Subscription} from 'rxjs';
import {NgRedux} from '@angular-redux/store';

export const SET_ROOT_PAGE_ACTION = 'SET_ROOT_PAGE';

@Injectable()
export class InitActions {

  constructor(private authService: AuthService, private ngRedux: NgRedux<UniState>) {
  }

  setRootPage(rootPage: Component) {

    const action: IPayloadAction = {type: SET_ROOT_PAGE_ACTION, payload: {rootPage : rootPage}};
    this.ngRedux.dispatch(action);
  }

  dispatchDetermineRootPage(): Subscription {
    return this.authService.auth$
      .do(console.log)
      .map(user => user ? TabsPage : LoginPage)
      .distinctUntilChanged()
      .subscribe((rootPage) => this.setRootPage(rootPage), console.error.bind(this));
  }
}
