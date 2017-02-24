import {Injectable} from '@angular/core';
import {TabsPage} from './tabs/tabs';
import {LoginPage} from './login/login';
import {AuthService} from './shared/auth.service';
import {Epic} from 'redux-observable';
import {InitActions} from './init-actions.service';
import {Action} from '@types/flux-standard-action';
import {InitState} from './init-reducer';
import {UniState} from './store';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class InitEpics {

  constructor(private authService: AuthService) {
  }

  determineRootPage: Epic<Action<InitState>, UniState> = (action$, store) =>
    action$
      .ofType(InitActions.DETERMINE_ROOT_PAGE_ACTION)
      .switchMap(
        () =>
          this.authService.auth$
            .map(user => user ? TabsPage : LoginPage)
            .distinctUntilChanged()
            .map((rootPage) => {
              return {
                type: InitActions.SET_ROOT_PAGE_ACTION,
                payload: {
                  rootPage: rootPage
                }
              };
            })
      );
}
