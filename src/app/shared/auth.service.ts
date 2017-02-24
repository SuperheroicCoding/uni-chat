import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  auth$: Observable<FirebaseAuthState>;
  authUser$: Observable<firebase.User>;

  constructor(private angularFire: AngularFire) {
    this.auth$ = angularFire.auth;
    this.authUser$ = this.auth$
      .switchMap((authState) => authState ? Observable.of(authState.auth) : Observable.empty());
  }

  loginUser(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    // pushes indiredctly the authState to the auth$;
    return this.angularFire.auth.login({email, password});
  }

  resetPassword(email: string): firebase.Promise<FirebaseAuthState> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.angularFire.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.createUser({email: newEmail, password: newPassword});
  }

}
