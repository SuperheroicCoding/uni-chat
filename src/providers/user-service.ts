import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import {User, UserData, copyUser} from './user.type';
import {AuthService} from './auth-service';
import {Contact} from './contact.type';


@Injectable()
export class UserService {

  private loadUserRef(uid): FirebaseObjectObservable<User> {
    return this.fire.database.object('/users/' + uid)
  }

  constructor(private authService: AuthService, private fire: AngularFire) {
  }

  getUserForContacts$(contacts: Contact[]): Observable<User[]> {
    const userRefs: FirebaseObjectObservable<User>[] = [].map.call(contacts, (contact) => this.loadUserRef(contact.uid));
    return Observable.zip(...userRefs);
  }

  getUser$(): Observable<User> {
    return this.authService.authUser$
      .switchMap((authUser) => authUser? this.loadUserRef(authUser.uid) : Observable.empty())
      .switchMap((userObject: User) => userObject.$exists() ? Observable.of(userObject) : Observable.from(this.createUser()))
  }

  private createUser(): Observable<User> {
    return this.authService.authUser$.switchMap((authUser) => {
        const user: UserData = copyUser(authUser);
        let userCreation: any = this.loadUserRef(user.uid).update(user).then(() => {
          console.log('user saved', user);
          return user;
        }, (error) => console.log('Could not save user:', user));
        return Observable.fromPromise(userCreation);
      }
    );
  }

}
