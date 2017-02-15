import {Uid} from './uid.type';
import firebase from 'firebase';
import {Exists} from './exists.type';
import {copyUser, UserData} from './user.type';

export interface ContactData extends Uid {
  localDisplayName?: string;
}

export interface Contact extends ContactData {
}

export interface ContactUserData {
  contacts: ContactData[];
}

export interface ContactUser extends Exists, ContactUserData, firebase.database.DataSnapshot {
}

export function mergeUserAndContact(user: UserData, contact: ContactData): UserData & ContactData {
  let userData: UserData & ContactData = copyUser(user);
  userData.localDisplayName = contact.localDisplayName;
  return userData;
}
