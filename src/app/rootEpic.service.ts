import {Injectable} from '@angular/core';

import {combineEpics} from 'redux-observable';
import {Action} from '@types/flux-standard-action';

import {UniState} from './store';
import {InitEpics} from './init-epics.service';
import {LanguageEpics} from './shared/language-epics.service';

@Injectable()
export class RootEpicCombiner {

  constructor(private initEpics: InitEpics, private languageEpics: LanguageEpics) {
  }

  public rootEpic() {
    return combineEpics<Action<any>, UniState>(this.initEpics.determineRootPage, this.languageEpics.trySetLanguage);
  }
}

