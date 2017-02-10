import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import {AngularFire, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import {ReplaySubject, Subject, Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/fromPromise'


@Injectable()
export class UserService {
  private auth$: Subject<FirebaseAuthState>;

  constructor(private fire: AngularFire) {
    this.auth$ = fire.auth;
  }

  login() {
    // push the authState to the auth$;
    this.fire.auth.login();
  }

  getUser$(): Observable<any> {
    let user$ = this.auth$
      .map((authState) => authState.auth)
      .switchMap((userInfo) => this.fire.database.object('/' + userInfo.uid))
      .switchMap((userObject) => !userObject.$exists() ? Observable.from(this.createUser()) : Observable.empty(), (userObject, creationResult) => userObject);
    return user$;
}

  private createUser(): Observable<void> {
    return this.auth$.switchMap((authState) => {
        let auth = authState.auth;
        let user = {
          displayName: auth.displayName,
          email: auth.email,
          photoUrl: auth.photoURL,
          uid: auth.uid,
          contacts: []
        };
      let userCreation = this.fire.database.object('/' + authState.auth.uid).set(user);
      return Observable.fromPromise(userCreation);
      }
    );
  }

}
