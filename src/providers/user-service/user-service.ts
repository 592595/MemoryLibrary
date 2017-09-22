import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  public status:boolean;
  public _user: any;
  public _init:any ={
    desc:'',
    nickname: "登陆/注册",
    avatar: "https://avatars2.githubusercontent.com/u/11835988?v=3&u=2a181779eb2164666606366a1df31f9c17cf7a20&s=100",
    location: {
      province:'',
      city:''
    }
  };

  public checkLogin(): boolean{
    if(this._user._id){
      return true;
    }
    else{
      return false;
    }
  }

  constructor(public http: Http, public storage:Storage) {
    this._user = this._init;
    this.status = false;
  }
  setUser(obj) {
    this._user=obj;
    this.status=true;
    this.storage.set('user', this._user);
    this.storage.set('status',true);
  }
  initUser(){
    this._user = this._init;
    this.storage.set('status',false);
  }
}
