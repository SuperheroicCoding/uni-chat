import {OnInit, Component, OnDestroy} from '@angular/core';
import {TranslateService, LangChangeEvent} from 'ng2-translate';
import {Subscription} from 'rxjs';

interface LanguageOption {
  value: string,
}

export const languageOptions : LanguageOption[]= [{value: 'de'}, {value: 'en'}];

@Component({
  selector: 'uni-language-select',
  templateUrl: 'language-select.html'
})
export class LanguageSelectComponent implements OnInit, OnDestroy {

  languageOptions: LanguageOption[];
  selectedLanguage: string;
  private langChangeSubscription: Subscription;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translate.currentLang;
    this.languageOptions = languageOptions;
    this.langChangeSubscription = this.translate.onLangChange.asObservable().subscribe((lang: LangChangeEvent) =>
      this.selectedLanguage = lang.lang
    );
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage);
  }

  ngOnDestroy(): void {
   this.langChangeSubscription.unsubscribe();
  }
}
