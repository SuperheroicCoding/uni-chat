import { NgModule, ErrorHandler} from '@angular/core';
import { Http } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {TranslateModule, TranslateService, TranslateStaticLoader, TranslateLoader, TranslatePipe} from 'ng2-translate';

import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { SettingsPage } from '../pages/settings/settings';
import { ContactsPage } from '../pages/contacts/contacts';
import { TabsPage } from '../pages/tabs/tabs';
import {Contacts} from 'ionic-native';


import {ContactsService} from '../providers/contacts-service';
import {UserService} from '../providers/user-service';

export const firebaseConfig = {
  apiKey: "AIzaSyCBDFvc0B6E8udknmgLCqOyuAhHijGXANM",
  authDomain: "uni-chat-70834.firebaseapp.com",
  databaseURL: "https://uni-chat-70834.firebaseio.com",
  storageBucket: "uni-chat-70834.appspot.com",
  messagingSenderId: "923422917794"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp), TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }), AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [
    MyApp,
    ChatsPage,
    SettingsPage,
    ContactsPage,
    TabsPage
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    SettingsPage,
    ContactsPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactsService,
    UserService
  ]
})
export class AppModule {
}
