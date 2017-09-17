import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { RegisterPage } from "../register/register"
import { ForgetPage } from "../forget/forget";
import { Storage } from "@ionic/storage";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userEmail:'';
  userPwd:'';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http,public toastCtrl: ToastController, public storage:Storage, public UserServiceProvider: UserServiceProvider) {

  }
  getData(){
    let url = '/api/users/getProfile';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        this.UserServiceProvider.setUser(res.json().data);
      }
    })
  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  goForget(){
    this.navCtrl.push(ForgetPage);
  }
  login(){
    if(!this.userEmail || !this.userPwd){
      let toast = this.toastCtrl.create({
        message: "信息不完整哟",
        duration: 2000
      });
      toast.present();
      return;
    }
    let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(!re.test(this.userEmail)){
      let toast = this.toastCtrl.create({
        message: "邮箱格式错啦~检查一下吧",
        duration: 2000
      });
      toast.present();
      return;
    }
    let url = '/api/users/login';
    this.http.post(url, {
      email: this.userEmail,
      password: this.userPwd
    }).subscribe((res)=>{
      if(res.json().status==true){
        let toast = this.toastCtrl.create({
          message: "验证成功！",
          duration: 2000
        });
        toast.present();
        this.getData();
        this.navCtrl.pop();
      }
      else{
        let toast = this.toastCtrl.create({
          message: res.json().msg,
          duration: 2000
        });
        toast.present();
      }
      });

  }
}
