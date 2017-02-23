import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {select} from '@angular-redux/store';
import {InitActions} from '../providers/init-actions';
import {Observable} from 'rxjs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @select() rootPage$: Observable<Component>;

  constructor(platform: Platform, translate: TranslateService, initActions: InitActions) {

    initActions.dispatchDetermineRootPage();

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
}
