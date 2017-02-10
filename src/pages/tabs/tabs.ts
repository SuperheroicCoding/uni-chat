import { Component } from '@angular/core';

import { ContactsPage } from '../contacts/contacts';
import { ChatsPage } from '../chats/chats';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Contacts: any = ContactsPage;
  tab2Chats: any = ChatsPage;
  tab3Settings: any = SettingsPage;

  constructor() {

  }
}
