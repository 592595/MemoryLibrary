import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { LoginPage } from "../login/login";
import { SettingfilePage } from "../settingfile/settingfile";
import { ProfilePage } from "../profile/profile";

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  user:any={
    avatar:'',
    nickname:'',
    location:{
      city:'',
      province:''
    }
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public UserServiceProvider: UserServiceProvider) {
    this.init();
  }
  ionViewDidEnter() {
    this.init();
  }
  init(){
    this.user.avatar = this.UserServiceProvider._user.avatar;
    this.user.nickname = this.UserServiceProvider._user.nickname;
    this.user.location.province = this.UserServiceProvider._user.location.province;
    this.user.location.city = this.UserServiceProvider._user.location.city;
  }
  checkLogin(page){
    if(this.UserServiceProvider._user._id){
      this.navCtrl.push(page);
    }
    else{
      this.navCtrl.push(LoginPage);
    }
  }
  pushSettingFile(){
    this.checkLogin(SettingfilePage);
  }
  pushProfile(){
    this.checkLogin(ProfilePage);
  }
}
