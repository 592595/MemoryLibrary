import {Component, SimpleChanges} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";

/**
 * Generated class for the ForgetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})


export class ForgetPage {
  Pwd:'';
  PwdConfirm:'';
  Vcode:'';
  userMail:'';
  nextValid:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl:ToastController) {
    this.nextValid = false;
  }


  OnChanges(changes: SimpleChanges){

  }

  ngOnChanges(){

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
      let url = '/api/users/getVcode2';
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

  submitReset(){
    if(this.Pwd!=this.PwdConfirm){
      let toast = this.toastCtrl.create({
        message: "两次输入的密码不同~",
        duration: 2000
      });
      toast.present();
      return;
    }
    if(!this.Pwd||!this.PwdConfirm||!this.Vcode||!this.userMail){
      let toast = this.toastCtrl.create({
        message: "信息不完整呦~",
        duration: 2000
      });
      toast.present();
      return;
    }
    let url = '/api/users/resetPassword';
    this.http.post(url,{
      password: this.Pwd,
      vcode: this.Vcode
    }).subscribe((res)=>{
      if(res.json().status){
        let toast = this.toastCtrl.create({
          message: "修改成功！快去登陆吧",
          duration: 2000
        });
        toast.present();
        this.navCtrl.pop();
      }
      else{
        let toast = this.toastCtrl.create({
          message: "出现点小问题，再试一次吧",
          duration: 2000
        });
        toast.present();
      }
    })
  }
}
