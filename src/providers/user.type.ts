import {Contact} from './contact.type';

export interface UserData extends Contact {
  contacts: Contact[];
}

export interface User extends UserData {
  $exists():boolean;
}
