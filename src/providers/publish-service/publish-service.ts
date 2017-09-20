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

  public mus:any;

  constructor(public http: Http) {
    this.getNear();
  }
  getNear(){
    let url = '/api/museum/nearBy';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        if(res.json.length){
          this.mus = res.json().mus;
        }
      }
    })
  }

}
