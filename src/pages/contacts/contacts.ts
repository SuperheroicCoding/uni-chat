import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import 'rxjs/add/operator/do';
import {ContactsService} from '../../providers/contacts-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage implements AfterViewInit {

  private contacts$: Observable<any[]>;

  ngAfterViewInit(): void {
    this.contacts$ = this.contactsService.getContacts$();
  }
  constructor(private navCtrl: NavController, private contactsService: ContactsService) {
  }

}
