import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PublishServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PublishServiceProvider {

  mid:'';
  display:'';

  constructor(public http: Http) {
    this.initData();
  }

  initData(){
    this.mid='';
    this.display='';
  }

}
