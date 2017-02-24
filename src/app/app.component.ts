import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {InitActions} from './init-actions.service';
import {UniState} from './store';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @select((s: UniState) => s.initState.rootPage) rootPage$: Observable<Component>;

  constructor(platform: Platform, initActions: InitActions) {

    initActions.determineRootPage();
    initActions.initLanguage();

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });



  }
}
