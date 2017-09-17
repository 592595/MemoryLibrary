import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http} from "@angular/http";
import { UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  mList=[];
  isEmpty:boolean;
  selectedLoc:'';


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public toastCtrl: ToastController,
              public UserServiceProvider:UserServiceProvider) {
    this.isEmpty = false;
    if(this.selectedLoc){
      if(this.selectedLoc!=this.UserServiceProvider._user.location.province){
        this.getNearLoc();
      }
      else{
        this.getNear();
      }
    }else{
      this.getNear();
    }

  }

  getNear(){
    let url = '/api/museum/nearBy';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        if(res.json.length){
          this.mList = res.json().mus;
        }
        else{
          this.isEmpty = true;
        }
      }
      else{
        this.isEmpty = true;
        let toast = this.toastCtrl.create({
          message: '出错了~稍后再试试',
          duration: 2000
        });
        toast.present();
      }
    })
  }

  getNearLoc(){
    let url = '/api/users/nearByMuseum';
    this.http.post(url,{
      loc: this.selectedLoc
    }).subscribe((res)=>{
      if (res.json().status) {
        if(res.json().mus){
          this.mList = res.json().mus;
        }
        else{
          this.isEmpty = true;
        }
      }
      else{
        this.isEmpty = true;
        let toast = this.toastCtrl.create({
          message: '出错了~稍后再试试',
          duration: 2000
        });
        toast.present();
      }

    })
  }

  ionViewDidEnter(){
    if(this.selectedLoc){
      if(this.selectedLoc!=this.UserServiceProvider._user.location.province){
        this.getNearLoc();
      }
      else{
        this.getNear();
      }
    }else{
      this.getNear();
    }
  }

}
