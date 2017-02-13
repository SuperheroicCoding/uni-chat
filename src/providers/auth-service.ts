import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import firebase from 'firebase';
import {Observable} from 'rxjs';

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthService {

  auth$: Observable<FirebaseAuthState>;
  authUser$: Observable<firebase.User>;

  constructor(private angularFire: AngularFire) {
    this.auth$ = angularFire.auth.asObservable();
    this.authUser$ = this.auth$.map((authState) => authState.auth);
  }

  loginUser(email: string, password: string): firebase.Promise<FirebaseAuthState>  {
    // push the authState to the auth$;
    return this.angularFire.auth.login({email, password});
  }

  resetPassword(email: string): firebase.Promise<FirebaseAuthState> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.angularFire.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.createUser({ email: newEmail, password: newPassword });
  }

}
