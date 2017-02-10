import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {TranslateService} from 'ng2-translate';

import { TabsPage } from '../pages/tabs/tabs';
import {UserService} from '../providers/user-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, translate: TranslateService, userService: UserService) {

    platform.ready().then(() => {


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      userService.login();
    });

    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
}
