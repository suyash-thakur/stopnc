import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public configObservable = new Subject<User>();

  User: User;
  emitConfig(User) {
    this.User = User;
    this.configObservable.next(User);
  }
  constructor() { }
}
