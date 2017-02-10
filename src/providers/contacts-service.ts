import {Injectable} from '@angular/core';
import {Contacts, Contact} from 'ionic-native';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/onErrorResumeNext';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {UserService} from './user-service';

@Injectable()
export class ContactsService {
  private contacts: FirebaseListObservable<any[]>;

  constructor(private fire: AngularFire, private userService: UserService) {
  }

  /* public pickContact(): Observable<Contact> {
   return Observable.fromPromise(Contacts.pickContact().catch(() => {}));
   }*/

  public getContacts(): Observable<any[]> {
    return this.userService.getUser$().switchMap((user) => {
      return this.fire.database.list(`/${user.uid}/contacts`)
        .do((contacts) => console.log(contacts))
  });
  }

}
