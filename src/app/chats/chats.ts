import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  constructor(public navCtrl: NavController) {
    // we need to push the concret chat to the nav

  }

}
