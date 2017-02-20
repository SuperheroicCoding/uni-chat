import {NgModule, ErrorHandler} from '@angular/core';
import {Http} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import {MyApp} from './app.component';
import {ChatsPage} from '../pages/chats/chats';
import {SettingsPage} from '../pages/settings/settings';
import {ContactsPage} from '../pages/contacts/contacts';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {TabsPage} from '../pages/tabs/tabs';
import {ContactsService} from '../providers/contacts-service';
import {UserService} from '../providers/user-service';
import {AuthService} from '../providers/auth-service';

export const firebaseConfig = {
  apiKey: "AIzaSyCBDFvc0B6E8udknmgLCqOyuAhHijGXANM",
  authDomain: "uni-chat-70834.firebaseapp.com",
  databaseURL: "https://uni-chat-70834.firebaseio.com",
  storageBucket: "uni-chat-70834.appspot.com",
  messagingSenderId: "923422917794"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }), AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ChatsPage,
    SettingsPage,
    ContactsPage,
    TabsPage
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ChatsPage,
    SettingsPage,
    ContactsPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    ContactsService
  ]
})
export class AppModule {
}
