import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TranslateService} from 'ng2-translate';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login2/login';
import {AuthService} from '../providers/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: Component;

  constructor(platform: Platform, translate: TranslateService, authService: AuthService) {

    const authObserver = authService.auth$.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

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
