import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl:ToastController, public UserServiceProvider:UserServiceProvider) {
  }

  logOut(){
    let url = '/api/users/logout';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        this.navCtrl.pop();
        this.UserServiceProvider.initUser();
      }
      else{
        let toast = this.toastCtrl.create({
          message: "出现了一些问题，再试一次吧",
          duration: 2000
        });
        toast.present();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
