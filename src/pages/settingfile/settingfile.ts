import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Http } from "@angular/http";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/**
 * Generated class for the SettingfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingfile',
  templateUrl: 'settingfile.html',
})
export class SettingfilePage {

  userInfo:any={
    nickname:'',
    desc:'',
    sex:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl:ToastController, public UserServiceProvider:UserServiceProvider) {
  }

  getData(){
    let url = '/api/users/getProfile';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        this.UserServiceProvider.setUser(res.json().data);
        this.UserServiceProvider.status = true;
      }
    })
  }

  saveProfile(){
    let url = '/api/users/resetProfile';
    this.http.post(url,{
      nickname:this.userInfo.nickname,
      desc:this.userInfo.desc,
      sex:this.userInfo.sex
    }).subscribe((res)=>{
      let toast = this.toastCtrl.create({
        message: res.json().msg,
        duration: 2000
      });
      toast.present();
      if(res.json().status){
        this.getData();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingfilePage');
  }

}
