import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {User, UserData} from './user.type';
import {AuthService} from './auth-service';


@Injectable()
export class UserService {

  private loadUserRef(uid): FirebaseObjectObservable<User> {
    return this.fire.database.object('/users/' + uid)
  }

  constructor(private authService: AuthService, private fire: AngularFire) {
  }

  getUser$(): Observable<User> {
    let user$ = this.authService.authUser$
      .switchMap((authUser) => this.loadUserRef(authUser.uid))
      .switchMap((userObject: User) => userObject.$exists() ? Observable.of(userObject) : Observable.from(this.createUser()))
    return user$;
  }

  private createUser(): Observable<User> {
    return this.authService.authUser$.switchMap((authUser) => {

        let user: UserData = {
          displayName: authUser.displayName,
          email: authUser.email,
          photoUrl: authUser.photoURL,
          uid: authUser.uid,
          contacts: [{
            displayName: authUser.displayName,
            email: authUser.email,
            photoUrl: authUser.photoURL,
            uid: authUser.uid
          }]
        };
        let userCreation: any = this.loadUserRef(authUser.uid).set(user).then(() => {
          console.log('user saved', user);
          return user;
        }, (error) => console.log('Could not save user:', user));
        return Observable.fromPromise(userCreation);
      }
    );
  }

}
