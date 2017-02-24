import {LanguageActions} from './language-actions.service';
import {TranslateService, LangChangeEvent} from 'ng2-translate';
import {Epic} from 'redux-observable';
import {Action} from '@types/flux-standard-action';
import {Injectable} from '@angular/core';
import {UniState} from '../store';
import {LanguageState} from './language-reducer';


@Injectable()
export class LanguageEpics {

  constructor(private translate: TranslateService) {
  }

  trySetLanguage: Epic<Action<LanguageState>, UniState> =
    (action$, state) =>
      action$
        .ofType(LanguageActions.TRY_SET_LANGUAGE)
        .switchMap(({payload}) => {
            const langObserver$ = this.translate.onLangChange.asObservable()
              .map(
                (lang: LangChangeEvent) =>
                  LanguageActions.createSetLanguageAction(lang.lang));
            this.translate.use(payload.userLanguage);
            return langObserver$;
          }
        );
}
