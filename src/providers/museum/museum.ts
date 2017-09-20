import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MuseumProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MuseumProvider {

  public mList:any;
  public isEmpty:boolean=false;

  constructor(public http: Http) {

  }

  getNear(){
    let url = '/api/museum/nearBy';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        if(res.json().data.length){
          this.mList = res.json().data;
        }
        else{
          this.isEmpty = true;
        }
      }
      else{
        this.isEmpty = true;
      }
    })
  }

}
