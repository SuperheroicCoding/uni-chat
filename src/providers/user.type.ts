import {Uid} from './uid.type';
import {Exists} from './exists.type';

export interface UserData extends Uid {
  email: string,
  displayName?: string,
  photoURL?: string,
  status?: string
}

export interface User extends Exists, UserData {
}

export function copyUser(userToCopy: UserData): UserData {
  return {
    uid: userToCopy.uid,
    displayName: userToCopy.displayName ? userToCopy.displayName : userToCopy.email,
    email: userToCopy.email,
    photoURL: userToCopy.photoURL ? userToCopy.photoURL : 'assets/img/default-avatar.png',
    status: 'Hi UniChat'
  }
}

