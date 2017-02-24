import {NgModule, ErrorHandler} from '@angular/core';
import {Http} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService} from 'ng2-translate';
import {NgRedux, NgReduxModule, DevToolsExtension} from '@angular-redux/store';
import {MyApp} from './app.component';
import {ChatsPage} from './chats/chats';
import {SettingsPage} from './settings/settings';
import {ContactsPage} from './contacts/contacts';
import {LoginPage} from './login/login';
import {SignupPage} from './signup/signup';
import {ResetPasswordPage} from './reset-password/reset-password';
import {TabsPage} from './tabs/tabs';
import {ContactsService} from './shared/contacts.service';
import {UserService} from './shared/user.service';
import {AuthService} from './shared/auth.service';
import {UniChatHeaderComponent} from './shared/uni-chat-header/uni-chat-header';
import {LanguageSelectComponent} from './settings/language-select/language-select';
import {UniState, rootReducer} from './store';
import {createEpicMiddleware} from 'redux-observable';
import {InitActions} from './init-actions.service';
import {RootEpicCombiner} from './rootEpic.service';
import {InitEpics} from './init-epics.service';
import {LanguageEpics} from './shared/language-epics.service';
import {LanguageActions} from './shared/language-actions.service';


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
    }), AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    NgReduxModule
  ],
  declarations: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ChatsPage,
    SettingsPage,
    ContactsPage,
    TabsPage,
    UniChatHeaderComponent,
    LanguageSelectComponent
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
    TabsPage,
    UniChatHeaderComponent,
    LanguageSelectComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    ContactsService,
    DevToolsExtension,
    InitActions,
    InitEpics,
    LanguageActions,
    LanguageEpics,
    RootEpicCombiner
  ]
})

export class AppModule {
  constructor(ngRedux: NgRedux<UniState>, devTools: DevToolsExtension, rootEpics: RootEpicCombiner, translate: TranslateService) {

    translate.setDefaultLang('en');

    const middleware = [createEpicMiddleware(rootEpics.rootEpic())];

    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] :
      [];

    ngRedux.configureStore(rootReducer, {initState: {rootPage: null}, languageState: {}}, middleware,
      storeEnhancers);
  }
}
