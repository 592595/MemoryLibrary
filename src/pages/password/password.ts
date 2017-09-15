import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the PasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  userPwd:'';
  userPwdConfirm:'';
  userNickName:'';
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public storage: Storage,public toastCtrl: ToastController) {
  }
  register(){
    let re = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
    if(!re.test(this.userNickName)){
      let toast = this.toastCtrl.create({
      message: "昵称格式错啦~检查一下",
        duration: 2000
      });
      toast.present();
      return;
    }
    if (this.userNickName.length<6){
      let toast = this.toastCtrl.create({
        message: "昵称太短啦~再长一点吧",
        duration: 2000
      });
      toast.present();
      return;
    }
    if (this.userPwd!=this.userPwdConfirm){
      let toast = this.toastCtrl.create({
        message: "两次密码输入不相同",
        duration: 2000
      });
      toast.present();
      return;
    }
    let url = '/api/users/register';
    this.http.post(url, {
      nickname: this.userNickName,
      password: this.userPwd,
      email: localStorage.getItem("tempEmail"),
      vcode: localStorage.getItem("tempVcode")
    }).subscribe((res)=>{
      let toast = this.toastCtrl.create({
        message: res.json().msg,
        duration: 2000
      });
      toast.present();
      if(res.json().status){
        this.navCtrl.popToRoot();
      }
      else return;
    })
  }

}
