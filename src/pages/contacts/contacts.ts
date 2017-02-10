import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contact } from 'ionic-native';
import { Observable } from 'rxjs';
import { FirebaseListObservable } from 'angularfire2';

import {ContactsService} from '../../providers/contacts-service';


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage implements AfterViewInit{

  private contacts$: Observable<Contact[]>;

  constructor(private navCtrl: NavController, private contactsService: ContactsService) {
  }

  ngAfterViewInit(): void {
    this.contacts$ = this.contactsService.getContacts();
  }



}
