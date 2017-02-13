import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/onErrorResumeNext';
import {AngularFire} from 'angularfire2';
import {UserService} from './user-service';

@Injectable()
export class ContactsService {

  constructor(private fire: AngularFire, private userService: UserService) {

  }

  /* public pickContact(): Observable<Contact> {
   return Observable.fromPromise(Contacts.pickContact().catch(() => {}));
   }*/

  public getContacts$(): Observable<any[]> {
    return this.userService.getUser$().switchMap((user) =>
      this.fire.database.list(`/contacts/${user.uid}/`)
    )
  }
}
