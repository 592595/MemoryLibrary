import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { PasswordPage } from "../password/password";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  time:number;
  userMail:'';
  userVcode:'';
  nextValid:boolean;
  codeValid:boolean;
  waitCode(){
    if(this.time==0){
      document.getElementById("getVcode").removeAttribute('disabled');
      this.time=10;
    }
    else{
      document.getElementById("getVcode").setAttribute('disabled','true');
      this.time--;
      setTimeout(function () {
        this.waitCode();
      },1000)
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl:AlertController, public toastCtrl: ToastController, public storage: Storage) {
    this.time=10;
    this.nextValid = false;
    this.codeValid = true;
  }


  getVcode(){
    if(!this.userMail){
      let toast = this.toastCtrl.create({
        message: "小伙子，认真填邮箱！",
        duration: 2000
      });
      toast.present();
      return;
    }
    let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(re.test(this.userMail)){
      let url = '/api/users/getVcode';
      this.http.post(url,{ mailTo: this.userMail}).subscribe((res)=>{
        let toast = this.toastCtrl.create({
          message: res.json().msg,
          duration: 2000
        });
        toast.present();
        if(res.json().status==true || res.json().status==1){
          this.nextValid = true;
        }
      });
    }
    else{
      let toast = this.toastCtrl.create({
        message: "大胸弟，邮箱格式错啦！",
        duration: 2000
      });
      toast.present();
    }
  }

  nextStep(){
    let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(re.test(this.userMail)){
      if(this.userVcode){
        localStorage.setItem('tempEmail', this.userMail);
        localStorage.setItem('tempVcode', this.userVcode);
        this.navCtrl.push( PasswordPage );
      }
      else{
        let toast = this.toastCtrl.create({
          message: "大胸弟，仔细检查一下！",
          duration: 2000
        });
        toast.present();
        return;
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: "大胸弟，仔细检查一下！",
        duration: 2000
      });
      toast.present();
      return;
    }
  }
}
