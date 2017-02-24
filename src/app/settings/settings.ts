import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private auth: AuthService) {
  }

  logout() {
    this.auth.logoutUser();
  }


}
