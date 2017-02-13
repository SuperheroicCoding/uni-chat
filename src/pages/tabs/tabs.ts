import {Component} from '@angular/core';
import {ContactsPage} from '../contacts/contacts';
import {ChatsPage} from '../chats/chats';
import {SettingsPage} from '../settings/settings';
import {TranslateService} from 'ng2-translate';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Contacts: any = ContactsPage;
  tab2Chats: any = ChatsPage;
  tab3Settings: any = SettingsPage;

  constructor(translate: TranslateService) {
  }
}
