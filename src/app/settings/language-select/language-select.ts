import {OnInit, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {select} from '@angular-redux/store';
import {UniState} from '../../store';
import {LanguageOption} from '../../shared/language-reducer';
import {LanguageActions} from '../../shared/language-actions.service';


@Component({
  selector: 'uni-language-select',
  templateUrl: 'language-select.html'
})
export class LanguageSelectComponent implements OnInit {

  @select((s: UniState) => s.languageState.languageOptions) languageOptions$: Observable<LanguageOption[]>;
  @select((s: UniState) => s.languageState.userLanguage) selectedLanguage$: Observable<string>;
  selectedLanguage: string;

  constructor(private languageActions: LanguageActions) {
  }

  ngOnInit(): void {
    this.selectedLanguage$.subscribe((lang: string) => this.selectedLanguage = lang);
  }

  changeLanguage(selectedLanguage: string) {
    this.languageActions.trySetLanguage(selectedLanguage);
  }

}
