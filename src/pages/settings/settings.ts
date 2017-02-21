import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {TranslateService, LangChangeEvent} from 'ng2-translate';

interface LanguageOption {
  value: string,
}

const languageOptions = [{  value: 'de'}, {  value: 'en'}];

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  languageOptions: LanguageOption[];
  selectedLanguage: string;

  constructor(public navCtrl: NavController, private auth: AuthService, private translate: TranslateService) {
    this.languageOptions = languageOptions;
    this.translate.onLangChange.subscribe((lang: LangChangeEvent) =>
      this.selectedLanguage = lang.lang
    )
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translate.currentLang;
  }

  logout() {
    this.auth.logoutUser();
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage);
  }

}
