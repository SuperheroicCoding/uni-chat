import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import {AngularFire, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import {Subject, Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/share';
import {User, UserData} from './user.type';


@Injectable()
export class UserService {
  private auth$: Subject<FirebaseAuthState>;

  private loadUserRef(uid): FirebaseObjectObservable<User>{
    return this.fire.database.object('/' + uid)
  }

  constructor(private fire: AngularFire) {
    this.auth$ = fire.auth;
  }

  login() {
    // push the authState to the auth$;
    this.fire.auth.login();
  }


  getUser$(): Observable<User> {
    let user$ = this.auth$
      .switchMap((authInfo) => this.loadUserRef(authInfo.auth.uid))
      .switchMap((userObject: User) => userObject.$exists() ? Observable.of(userObject) : Observable.from(this.createUser()))
    return user$;
  }

  private createUser(): Observable<User> {
    return this.auth$.switchMap((authState) => {
        let auth = authState.auth;
        let user: UserData = {
          displayName: auth.displayName,
          email: auth.email,
          photoUrl: auth.photoURL,
          uid: auth.uid,
          contacts: [{
            displayName: auth.displayName,
            email: auth.email,
            photoUrl: auth.photoURL,
            uid: auth.uid
          }]
        };
        let userCreation: any = this.loadUserRef(auth.uid).set(user).then(() => {
          console.log('user saved', user);
          return user;
        }, (error) => console.log('Could not save user:', user));
        return Observable.fromPromise(userCreation);
      }
    );
  }

}
