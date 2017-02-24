import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {UserService} from './user.service';
import {Contact, ContactUserData, ContactUser, mergeUserAndContact} from './contact.type';
import {TranslateService} from 'ng2-translate';
import {User} from './user.type';

@Injectable()
export class ContactsService {

  constructor(private fire: AngularFire, private userService: UserService, private translate: TranslateService) {
  }

  private loadContactUserRef(uid): FirebaseObjectObservable<ContactUser> {
    return this.fire.database.object('/contacts/' + uid);
  }

  private loadContactsRef(uid): FirebaseListObservable<Contact[]> {
    return this.fire.database.list('/contacts/' + uid + '/contacts');
  }

  /* public pickContact(): Observable<Contact> {
   return Observable.fromPromise(Contacts.pickContact().catch(() => {}));
   }*/
  //[key:string]:Contact;
  public getContacts$(): Observable<(Contact & User)[]> {
    return this.userService.getUser$()
    //try to load the contacts
      .switchMap((user) => this.loadContactsRef(user.uid))
      // create contacts user if not availalbe
      .switchMap(
        (contacts: Contact[]) =>
          contacts.length > 0 ? Observable.of(contacts) : this.createContactsUser())

      // load user for contact and merge data.
      .switchMap(
        (contacts: Contact[]) => this.userService.getUserForContacts$(contacts),
        (contacts: Contact[], users: User[]) =>
          [].map.call(users, (user, index) => mergeUserAndContact(user, contacts[index])));
  }

  private  createContactsUser(): Observable < Contact[] > {

    return this.userService.getUser$()
      .combineLatest(this.translate.get('contacts.yourselfLocalName'))
      .switchMap(([user, yourselfTranslation]) => {
        const contactUser: ContactUserData = {
          contacts: [
            {
              uid: user.uid,
              localDisplayName: yourselfTranslation
            }
          ]
        };
        const userCreation: any = this.loadContactUserRef(user.uid)
          .update(contactUser)
          .then(() => {
            console.log('ContactUser created', user);
            return contactUser.contacts;
          }, (error) => console.log('Could not save user:', user));

        return Observable.fromPromise(userCreation)
      });
  }
}
