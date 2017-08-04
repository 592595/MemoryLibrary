import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  public _user: any;

  constructor(public http: Http, public storage:Storage, public headers:Headers) {
    console.log('Hello UserServiceProvider Provider');
  }
  setUser(obj) {
    this._user=obj;
    this.storage.set('user', this._user);
  }

}
